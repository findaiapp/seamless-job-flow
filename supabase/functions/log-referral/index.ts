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

    const { referral_code, job_id, application_id } = await req.json()

    if (!referral_code || !job_id) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'referral_code and job_id are required' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    console.log('Logging referral:', { referral_code, job_id, application_id })

    // Insert referral attribution
    const { error } = await supabase
      .from('referral_attributions')
      .insert([{
        referral_code,
        job_id,
        application_id: application_id || null
      }])

    if (error) {
      console.error('Referral logging error:', error)
      throw error
    }

    return new Response(JSON.stringify({ 
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Log referral error:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})