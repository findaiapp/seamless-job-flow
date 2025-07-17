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

    const url = new URL(req.url)
    const job_id = url.searchParams.get('job_id')

    if (!job_id) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'job_id parameter is required' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      })
    }

    console.log('Getting job by ID:', job_id)

    // Try jobs table first
    let { data: job, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', job_id)
      .single()

    // If not found in jobs, try job_listings
    if (error && error.code === 'PGRST116') {
      const { data: jobListing, error: listingError } = await supabase
        .from('job_listings')
        .select('*')
        .eq('id', job_id)
        .eq('is_active', true)
        .single()

      if (listingError) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Job not found' 
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 404,
        })
      }

      job = jobListing
    } else if (error) {
      throw error
    }

    return new Response(JSON.stringify({ 
      success: true, 
      job 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    console.error('Get job by ID error:', error)
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})