import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobId, title, description, company, location } = await req.json();

    console.log(`Enhancing job: ${jobId} - ${title}`);

    // Get real applicant count from database
    const { data: applicants, error: applicantError } = await supabase
      .from('applications')
      .select('id, created_at')
      .eq('job_id', jobId);

    let applicantCount = 0;
    let todayApplicants = 0;

    if (!applicantError && applicants) {
      applicantCount = applicants.length;
      const today = new Date().toISOString().split('T')[0];
      todayApplicants = applicants.filter(app => 
        app.created_at.startsWith(today)
      ).length;
    }

    // If no real data, generate realistic numbers with GPT
    let generatedApplicantInfo = null;
    if (applicantCount === 0) {
      const applicantPrompt = `Generate realistic applicant count data for this job posting:
Title: ${title}
Company: ${company}
Location: ${location}
Description: ${description.substring(0, 200)}...

Return ONLY a JSON object with:
{
  "totalApplicants": number (realistic total, 1-50),
  "todayApplicants": number (realistic daily, 0-15),
  "applicantText": "descriptive text like '12 people applied today' or '3 new applicants today'"
}`;

      const applicantResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a job analytics expert. Generate realistic applicant numbers based on job details. Return valid JSON only.' },
            { role: 'user', content: applicantPrompt }
          ],
          temperature: 0.7,
          max_tokens: 200,
        }),
      });

      const applicantData = await applicantResponse.json();
      try {
        generatedApplicantInfo = JSON.parse(applicantData.choices[0].message.content);
      } catch (e) {
        console.log('Failed to parse applicant JSON, using defaults');
        generatedApplicantInfo = {
          totalApplicants: Math.floor(Math.random() * 20) + 5,
          todayApplicants: Math.floor(Math.random() * 8) + 1,
          applicantText: `${Math.floor(Math.random() * 8) + 1} people applied today`
        };
      }
    }

    // Generate smart tags with GPT
    const tagsPrompt = `Analyze this job posting and generate 2-4 smart tags that would help job seekers quickly understand key benefits:

Title: ${title}
Company: ${company}
Location: ${location}
Description: ${description}

Generate tags that highlight:
- Work schedule (Evening Shifts, Weekend Work, Flexible Hours)
- Experience level (No Experience Needed, Entry Level, Experienced)
- Application process (No Interview, Quick Start, Apply Today)
- Job perks (Weekly Pay, Benefits, Tips, Bonus)
- Work type (Remote, Driver Role, Customer Service, Physical Work)

Return ONLY a JSON array of 2-4 short, catchy tags like:
["No Interview", "Quick Start", "Evening Shifts", "Weekly Pay"]`;

    const tagsResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a job posting analyzer. Generate concise, helpful tags that job seekers care about. Return valid JSON array only.' },
          { role: 'user', content: tagsPrompt }
        ],
        temperature: 0.3,
        max_tokens: 150,
      }),
    });

    const tagsData = await tagsResponse.json();
    let smartTags = [];
    try {
      smartTags = JSON.parse(tagsData.choices[0].message.content);
    } catch (e) {
      console.log('Failed to parse tags JSON, using defaults');
      smartTags = ["Quick Apply", "Good Pay"];
    }

    // Return enhanced job data
    const result = {
      jobId,
      applicantCount: applicantCount || generatedApplicantInfo?.totalApplicants || 0,
      todayApplicants: todayApplicants || generatedApplicantInfo?.todayApplicants || 0,
      applicantText: applicantCount > 0 
        ? `${todayApplicants} applied today`
        : generatedApplicantInfo?.applicantText || `${generatedApplicantInfo?.todayApplicants || 1} people applied today`,
      smartTags: smartTags.slice(0, 4), // Limit to 4 tags
      timestamp: new Date().toISOString()
    };

    console.log(`Job enhanced successfully:`, result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in enhance-job-cards function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      jobId: 'unknown'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});