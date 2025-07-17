import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.51.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AttributionRequest {
  phone_number?: string;
  utm_campaign?: string;
  utm_source?: string;
  event_type: 'signup' | 'apply' | 'paid';
  converted_url?: string;
  value?: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { phone_number, utm_campaign, utm_source, event_type, converted_url, value }: AttributionRequest = await req.json();

    if (!event_type) {
      return new Response(
        JSON.stringify({ error: 'Event type is required' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    // Find the most recent SMS blast for this phone number or UTM
    let messageId = null;

    if (phone_number) {
      const { data: blastData } = await supabase
        .from('sms_blast_logs')
        .select('id')
        .eq('phone_number', phone_number)
        .order('sent_at', { ascending: false })
        .limit(1)
        .single();
      
      messageId = blastData?.id;
    } else if (utm_campaign && utm_source === 'sms-blast') {
      const { data: blastData } = await supabase
        .from('sms_blast_logs')
        .select('id')
        .eq('utm_campaign', utm_campaign)
        .eq('utm_source', 'sms_blast')
        .order('sent_at', { ascending: false })
        .limit(1)
        .single();
      
      messageId = blastData?.id;
    }

    if (!messageId) {
      console.log('No matching SMS blast found for attribution');
    }

    // Create attribution record
    const { error: attributionError } = await supabase
      .from('sms_attributions')
      .insert({
        phone_number: phone_number || 'unknown',
        message_id: messageId,
        event_type,
        converted_url: converted_url || req.headers.get('referer'),
        value: value || 0
      });

    if (attributionError) {
      console.error('Error creating attribution:', attributionError);
      throw attributionError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Attribution tracked successfully',
        message_id: messageId
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );

  } catch (error: any) {
    console.error('Error in track-sms-attribution function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to track attribution',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );
  }
};

serve(handler);