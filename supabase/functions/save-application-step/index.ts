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
      application_id,
      step_number,
      step_data,
      full_name,
      phone_number,
      email,
      location,
      skills,
      availability,
      resume_url,
      ref_code,
      job_id
    } = await req.json()

    console.log('Saving application step:', { application_id, step_number })

    let applicationData: any = {}
    
    // Build update data based on step
    if (step_number === 1 && (full_name || phone_number || location)) {
      applicationData = { 
        full_name: full_name || undefined,
        phone_number: phone_number || undefined, 
        location: location || undefined,
        step_status: Math.max(step_number, applicationData.step_status || 1)
      }
    }
    
    if (step_number === 2 && (skills || availability)) {
      applicationData = { 
        skills: skills || undefined,
        availability: availability || undefined,
        step_status: Math.max(step_number, applicationData.step_status || 1)
      }
    }
    
    if (step_number === 3 && resume_url) {
      applicationData = { 
        resume_url,
        step_status: Math.max(step_number, applicationData.step_status || 1)
      }
    }
    
    if (step_number === 4 && (ref_code || email)) {
      applicationData = { 
        ref_code: ref_code || undefined,
        email: email || undefined,
        step_status: Math.max(step_number, applicationData.step_status || 1)
      }
    }

    // Add job_id if provided
    if (job_id) {
      applicationData.job_id = job_id
    }

    let result
    
    if (application_id) {
      // Update existing application
      const { data, error } = await supabase
        .from('applications')
        .update(applicationData)
        .eq('id', application_id)
        .select()
        .single()
      
      if (error) throw error
      result = data
    } else {
      // Create new application
      const { data, error } = await supabase
        .from('applications')
        .insert([{
          ...applicationData,
          full_name: full_name || 'Incomplete'
        }])
        .select()
        .single()
      
      if (error) throw error
      result = data
    }

    // Log the step
    const { error: logError } = await supabase
      .from('application_log')
      .insert([{
        application_id: result.id,
        step_number,
        step_data: step_data || {}
      }])

    if (logError) {
      console.error('Log error:', logError)
    }

    return new Response(JSON.stringify({ 
      success: true, 
      application_id: result.id,
      application: result
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Save application step error:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})