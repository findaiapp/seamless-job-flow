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

    console.log('Saving application step:', { application_id, step_number, job_id })

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

    let jobApplicationData: any = {
      application_status: 'in_progress'
    }
    
    // Build update data based on step for job_applications table
    if (step_number === 1 && (full_name || phone_number || location)) {
      jobApplicationData = { 
        ...jobApplicationData,
        first_name: full_name || undefined,
        phone_number: phone_number || undefined,
        job_id: job_id || undefined,
        job_title: jobTitle || undefined,
        job_type: jobType || undefined,
        location: jobLocation || undefined
      }
    }
    
    if (step_number === 2 && (skills || availability)) {
      jobApplicationData = { 
        ...jobApplicationData,
        resume_text: skills || undefined // Store skills as resume text
      }
    }
    
    if (step_number === 3 && resume_url) {
      // Resume URL handling - could extract text here in the future
      jobApplicationData = { 
        ...jobApplicationData
      }
    }
    
    if (step_number === 4 && (ref_code || email)) {
      jobApplicationData = { 
        ...jobApplicationData,
        email: email || undefined
      }
    }

    let result
    
    if (application_id) {
      // Try to update existing job application
      const { data: existing } = await supabase
        .from('job_applications')
        .select('id')
        .eq('id', application_id)
        .single()
      
      if (existing) {
        // Update existing job application
        const { data, error } = await supabase
          .from('job_applications')
          .update(jobApplicationData)
          .eq('id', application_id)
          .select()
          .single()
        
        if (error) throw error
        result = data
      } else {
        // Create new job application
        const { data, error } = await supabase
          .from('job_applications')
          .insert([{
            ...jobApplicationData,
            first_name: full_name || 'Incomplete',
            phone_number: phone_number || '',
            job_id: job_id || '',
            job_title: jobTitle,
            job_type: jobType,
            location: jobLocation
          }])
          .select()
          .single()
        
        if (error) throw error
        result = data
      }
    } else {
      // Create new job application
      const { data, error } = await supabase
        .from('job_applications')
        .insert([{
          ...jobApplicationData,
          first_name: full_name || 'Incomplete',
          phone_number: phone_number || '',
          job_id: job_id || '',
          job_title: jobTitle,
          job_type: jobType,
          location: jobLocation
        }])
        .select()
        .single()
      
      if (error) throw error
      result = data
    }

    // Also save to legacy applications table for backwards compatibility
    let legacyApplicationData: any = {}
    
    if (step_number === 1 && (full_name || phone_number || location)) {
      legacyApplicationData = { 
        full_name: full_name || undefined,
        phone_number: phone_number || undefined, 
        location: location || undefined
      }
    }
    
    if (step_number === 2 && (skills || availability)) {
      legacyApplicationData = { 
        skills: skills || undefined,
        availability: availability || undefined
      }
    }
    
    if (step_number === 3 && resume_url) {
      legacyApplicationData = { 
        resume_url
      }
    }
    
    if (step_number === 4 && (ref_code || email)) {
      legacyApplicationData = { 
        ref_code: ref_code || undefined,
        email: email || undefined
      }
    }

    if (job_id) {
      legacyApplicationData.job_id = job_id
    }

    // Try to save to legacy table - don't fail if it doesn't work
    try {
      if (Object.keys(legacyApplicationData).length > 0) {
        await supabase
          .from('applications')
          .upsert([{
            id: application_id,
            ...legacyApplicationData,
            full_name: full_name || 'Incomplete'
          }])
      }
    } catch (legacyError) {
      console.error('Legacy save error (non-critical):', legacyError)
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