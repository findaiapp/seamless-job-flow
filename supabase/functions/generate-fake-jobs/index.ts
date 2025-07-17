import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { location, jobType, count = 6 } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log(`Generating ${count} fake jobs for ${jobType} in ${location}`);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a job listing generator for ${location}. Create realistic, appealing job listings that feel authentic and local.

Return ONLY a JSON array with exactly this structure:
[
  {
    "id": "fake-job-1",
    "title": "Job Title",
    "company": "Company Name", 
    "location": "${location}",
    "job_type": "${jobType || 'general'}",
    "pay_range": "$15-22/hr",
    "description": "Detailed job description with benefits and what makes this role appealing",
    "requirements": "Required skills and qualifications", 
    "benefits": "Benefits and perks offered",
    "is_verified": true,
    "posted_at": "2024-01-15T10:30:00Z",
    "is_fake": true
  }
]

Guidelines:
- Create exactly ${count} unique jobs
- Use realistic company names (not generic ones)
- Include variety in pay ranges ($15-30/hr range)
- Make descriptions compelling and specific to ${location}
- Include Gen-Z friendly language and benefits
- Some jobs should mention "start immediately", "no experience", "flexible schedule", "$20+/hr"
- Mix of full-time, part-time, and gig opportunities
- Include realistic requirements and benefits
- Vary the job types if no specific type provided`
          },
          {
            role: 'user',
            content: `Generate ${count} realistic job listings for ${jobType || 'various positions'} in ${location}`
          }
        ],
        temperature: 0.8,
        max_tokens: 3000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log('Raw OpenAI response length:', generatedContent.length);

    // Parse the JSON response
    let jobs;
    try {
      jobs = JSON.parse(generatedContent);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      // Fallback: create default jobs
      jobs = Array.from({ length: count }, (_, i) => ({
        id: `fake-job-${i + 1}`,
        title: `${jobType || 'General'} Position`,
        company: `Local Business ${i + 1}`,
        location: location,
        job_type: jobType || 'general',
        pay_range: '$16-20/hr',
        description: `Exciting opportunity in ${location}! Join our team and start immediately. We offer flexible scheduling and great benefits.`,
        requirements: 'Reliable, hardworking, positive attitude',
        benefits: 'Flexible schedule, competitive pay, growth opportunities',
        is_verified: false,
        posted_at: new Date().toISOString(),
        is_fake: true
      }));
    }

    // Validate the structure
    if (!Array.isArray(jobs) || jobs.length === 0) {
      throw new Error('Invalid jobs structure from OpenAI');
    }

    // Ensure each job has required fields and add fake identifier
    jobs = jobs.map((job, index) => ({
      id: job.id || `fake-job-${Date.now()}-${index}`,
      title: job.title || `Position in ${location}`,
      company: job.company || `Local Company ${index + 1}`,
      location: job.location || location,
      job_type: job.job_type || jobType || 'general',
      pay_range: job.pay_range || '$16-20/hr',
      description: job.description || 'Great opportunity available!',
      requirements: job.requirements || 'Reliable and motivated',
      benefits: job.benefits || 'Competitive pay and benefits',
      is_verified: job.is_verified || false,
      posted_at: job.posted_at || new Date().toISOString(),
      is_fake: true
    }));

    console.log('Successfully generated jobs:', jobs.length);

    return new Response(JSON.stringify({ jobs }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-fake-jobs function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Failed to generate fake jobs'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});