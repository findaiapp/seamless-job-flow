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

    const { 
      full_name, 
      phone_number, 
      email, 
      location, 
      skills, 
      availability, 
      resume_url, 
      ref_code, 
      job_id, 
      source = 'direct' 
    } = await req.json()

    console.log('Submitting application:', { full_name, job_id, email })

    // Insert application
    const { data: application, error: appError } = await supabase
      .from('applications')
      .insert([{
        full_name,
        phone_number,
        email,
        location,
        skills,
        availability,
        resume_url,
        ref_code,
        job_id,
        step_status: 5,
        completed_at: new Date().toISOString(),
        source
      }])
      .select()
      .single()

    if (appError) {
      console.error('Application error:', appError)
      throw appError
    }

    // Create job application link
    if (job_id) {
      const { error: jobAppError } = await supabase
        .from('job_applications')
        .insert([{
          job_id,
          application_id: application.id,
          status: 'pending'
        }])

      if (jobAppError) {
        console.error('Job application link error:', jobAppError)
      }
    }

    // Log completion
    const { error: logError } = await supabase
      .from('application_log')
      .insert([{
        application_id: application.id,
        step_number: 5,
        step_data: { submitted: true, completed_at: new Date().toISOString() }
      }])

    if (logError) {
      console.error('Log error:', logError)
    }

    return new Response(JSON.stringify({ 
      success: true, 
      application_id: application.id 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Submit application error:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})