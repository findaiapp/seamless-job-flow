import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.51.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const clickId = url.pathname.split('/').pop();

  if (!clickId) {
    return new Response('Invalid click ID', { status: 400 });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Find the original blast log by click_id
    const { data: blastLog, error: blastError } = await supabase
      .from('sms_blast_logs')
      .select('*')
      .eq('click_id', clickId)
      .single();

    if (blastError || !blastLog) {
      console.error('Blast log not found:', blastError);
      return new Response('Link not found', { status: 404 });
    }

    // Extract user info from request
    const userAgent = req.headers.get('user-agent') || '';
    const forwardedFor = req.headers.get('x-forwarded-for') || '';
    const realIP = req.headers.get('x-real-ip') || '';
    const ipAddress = forwardedFor.split(',')[0] || realIP || 'unknown';

    // Log the click
    const { error: clickError } = await supabase
      .from('sms_clicks')
      .insert({
        phone_number: blastLog.phone_number,
        message_id: blastLog.id,
        utm_source: 'sms-blast',
        utm_campaign: blastLog.utm_campaign,
        redirect_url: blastLog.redirect_url,
        user_agent: userAgent,
        ip_address: ipAddress
      });

    if (clickError) {
      console.error('Error logging click:', clickError);
    }

    // Build redirect URL with UTM parameters
    const redirectUrl = new URL(blastLog.redirect_url);
    redirectUrl.searchParams.set('utm_source', 'sms-blast');
    redirectUrl.searchParams.set('utm_medium', 'sms');
    if (blastLog.utm_campaign) {
      redirectUrl.searchParams.set('utm_campaign', blastLog.utm_campaign);
    }
    redirectUrl.searchParams.set('click_id', clickId);

    console.log(`Click tracked: ${clickId} -> ${redirectUrl.toString()}`);

    // Redirect to the destination
    return new Response(null, {
      status: 302,
      headers: {
        'Location': redirectUrl.toString(),
        ...corsHeaders
      }
    });

  } catch (error: any) {
    console.error('Error in track-click function:', error);
    
    return new Response(
      `Error processing click: ${error.message}`,
      { 
        status: 500, 
        headers: { 'Content-Type': 'text/plain', ...corsHeaders } 
      }
    );
  }
};

serve(handler);