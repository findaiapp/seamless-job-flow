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
      source = 'direct',
      utm_source,
      utm_campaign,
      utm_medium
    } = await req.json()

    console.log('Submitting application:', { full_name, job_id, email })

    // Get job details for caching
    let jobTitle = ''
    let jobType = ''
    let jobLocation = ''
    
    if (job_id) {
      const { data: jobData } = await supabase
        .from('jobs')
        .select('title, job_type, location')
        .eq('id', job_id)
        .single()
      
      if (jobData) {
        jobTitle = jobData.title || ''
        jobType = jobData.job_type || ''
        jobLocation = jobData.location || ''
      }
    }

    // Insert into new job_applications table
    const { data: jobApplication, error: jobAppError } = await supabase
      .from('job_applications')
      .insert([{
        job_id,
        job_title: jobTitle,
        job_type: jobType,
        location: jobLocation,
        first_name: full_name,
        phone_number,
        email,
        resume_text: skills, // Store skills/experience as resume text for now
        application_status: 'submitted',
        source: utm_source || source,
        applied_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (jobAppError) {
      console.error('Job application error:', jobAppError)
      throw jobAppError
    }

    // Also insert into legacy applications table for backwards compatibility
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
        source: utm_source || source
      }])
      .select()
      .single()

    if (appError) {
      console.error('Legacy application error:', appError)
      // Don't throw error for legacy table - job_applications is primary
    }

    // Handle attribution if UTM data provided
    if (utm_source && phone_number) {
      const { error: attributionError } = await supabase
        .from('sms_attributions')
        .insert([{
          event_type: 'apply',
          phone_number: phone_number,
          value: 1,
          converted_url: `${Deno.env.get('SUPABASE_URL')}/apply/${job_id}`,
          timestamp: new Date().toISOString()
        }])

      if (attributionError) {
        console.error('Attribution error:', attributionError)
        // Don't throw - attribution is optional
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      application_id: jobApplication.id,
      job_application_id: jobApplication.id,
      legacy_application_id: application?.id
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