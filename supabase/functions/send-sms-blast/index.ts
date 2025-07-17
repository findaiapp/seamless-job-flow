import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.51.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SMSRequest {
  phone_number: string;
  message: string;
  city?: string;
  job_type?: string;
  utm_campaign?: string;
  redirect_url?: string;
  click_id?: string;
  variant_label?: string;
  ab_test_id?: string;
  is_ab_test?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
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

    const { phone_number, message, city, job_type, utm_campaign, redirect_url, click_id, variant_label, ab_test_id, is_ab_test }: SMSRequest = await req.json();

    if (!phone_number || !message) {
      return new Response(
        JSON.stringify({ error: 'Phone number and message are required' }),
        { 
          status: 400, 
          headers: { 'Content-Type': 'application/json', ...corsHeaders } 
        }
      );
    }

    // TODO: Replace with actual SMS service (Twilio, Resend, etc.)
    // For now, we'll just log the SMS and mark as sent
    console.log(`SMS to ${phone_number}: ${message}`);

    // Log the SMS blast with tracking data
    const { error: logError } = await supabase
      .from('sms_blast_logs')
      .insert({
        phone_number,
        message,
        city: city || null,
        job_type: job_type || null,
        utm_campaign: utm_campaign || null,
        redirect_url: redirect_url || null,
        click_id: click_id || null,
        variant_label: variant_label || null,
        ab_test_id: ab_test_id || null,
        is_ab_test: is_ab_test || false,
        status: 'sent',
        utm_source: 'sms_blast'
      });

    if (logError) {
      console.error('Error logging SMS blast:', logError);
      throw logError;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'SMS sent successfully',
        phone_number: phone_number.replace(/.(?=.{4})/g, '*') // Mask phone number
      }),
      { 
        status: 200, 
        headers: { 'Content-Type': 'application/json', ...corsHeaders } 
      }
    );

  } catch (error: any) {
    console.error('Error in send-sms-blast function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to send SMS',
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