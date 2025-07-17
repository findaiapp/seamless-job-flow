import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!
    )

    const { job_id, user_id, referrer } = await req.json()
    
    // Get IP address and user agent from headers
    const ip_address = req.headers.get('x-forwarded-for') || 
                      req.headers.get('x-real-ip') || 
                      'unknown'
    const user_agent = req.headers.get('user-agent') || 'unknown'

    console.log('Tracking job click:', { job_id, user_id, ip_address })

    // Insert click tracking
    const { error } = await supabase
      .from('job_apply_clicks')
      .insert([{
        job_id,
        user_id,
        ip_address,
        user_agent,
        referrer: referrer || null
      }])

    if (error) {
      console.error('Click tracking error:', error)
      throw error
    }

    return new Response(JSON.stringify({ 
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Track job click error:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})