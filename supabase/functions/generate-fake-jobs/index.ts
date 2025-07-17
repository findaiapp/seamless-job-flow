import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const JOB_CATEGORIES = [
  'Delivery Driver', 'Warehouse Associate', 'General Labor', 'Childcare/Nanny',
  'House Cleaner', 'Security Guard', 'Customer Service Rep', 'Line Cook / Prep Cook',
  'Moving Helper', 'Event Staff', 'Maintenance Tech', 'Retail Associate'
];

const CITIES = [
  'Brooklyn, NY', 'Bronx, NY', 'Queens, NY', 'Manhattan, NY', 'Staten Island, NY',
  'Newark, NJ', 'Atlanta, GA', 'Miami, FL', 'Houston, TX', 'Los Angeles, CA'
];

const JOB_TYPES = ['Full-Time', 'Part-Time', 'Gig', 'Temp'];
const TAGS = ['No Experience', 'Quick Start', 'Flexible Shifts', 'Weekly Pay', 'Benefits Available', 'Immediate Start'];

function getRandomItem(array: string[]) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomPay() {
  const min = 16;
  const max = 28;
  const pay = Math.floor(Math.random() * (max - min + 1)) + min;
  return `$${pay}/hr`;
}

function getRandomDate() {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
  const randomTime = thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime());
  return new Date(randomTime).toISOString();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { count = 1600 } = await req.json();
    
    if (!openAIApiKey) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    console.log(`Generating ${count} fake jobs...`);
    
    const batchSize = 50; // Generate jobs in batches
    const totalBatches = Math.ceil(count / batchSize);
    let generatedJobs = 0;

    for (let batch = 0; batch < totalBatches; batch++) {
      const currentBatchSize = Math.min(batchSize, count - generatedJobs);
      
      // Generate job descriptions using OpenAI
      const prompt = `Generate ${currentBatchSize} realistic Craigslist-style job listings. Return a JSON array where each job has:
- title: Short, catchy job title (e.g., "Warehouse Worker - $22/hr - Immediate Start")
- description: 2-3 paragraph realistic job description with duties, requirements, and benefits
- employer_name: Realistic company name

Job categories to use: ${JOB_CATEGORIES.join(', ')}
Make descriptions authentic, mention specific duties, and include realistic requirements. Keep descriptions between 150-300 words each.

Return ONLY the JSON array, no other text.`;

      const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a job listing generator. Generate realistic, professional job postings.' },
            { role: 'user', content: prompt }
          ],
          temperature: 0.8,
        }),
      });

      const openAIData = await openAIResponse.json();
      let generatedJobData;
      
      try {
        const content = openAIData.choices[0].message.content;
        generatedJobData = JSON.parse(content);
      } catch (parseError) {
        console.error('Failed to parse OpenAI response, using fallback data');
        // Fallback data if OpenAI parsing fails
        generatedJobData = Array.from({ length: currentBatchSize }, (_, i) => ({
          title: `${getRandomItem(JOB_CATEGORIES)} - ${getRandomPay()} - Now Hiring`,
          description: `We are seeking a reliable ${getRandomItem(JOB_CATEGORIES)} to join our team. This position offers competitive pay and flexible scheduling. Responsibilities include various tasks related to the role. Previous experience preferred but not required. We offer a supportive work environment and opportunities for growth.`,
          employer_name: `${getRandomItem(['Metro', 'City', 'Prime', 'Quality', 'Fast', 'Pro'])} ${getRandomItem(['Services', 'Solutions', 'Group', 'Corp', 'Industries', 'Company'])}`
        }));
      }

      // Prepare jobs for insertion
      const jobsToInsert = generatedJobData.slice(0, currentBatchSize).map((job: any, index: number) => {
        const jobNumber = generatedJobs + index + 1;
        return {
          id: `job-${jobNumber}`,
          title: job.title,
          description: job.description,
          employer_name: job.employer_name,
          job_type: getRandomItem(JOB_TYPES),
          location: getRandomItem(CITIES),
          pay_range: getRandomPay(),
          contact_method: 'Apply online',
          application_link: `/apply/job-${jobNumber}`,
          created_at: getRandomDate(),
          is_approved: true,
          status: 'active',
          utm_source: 'fake-generator'
        };
      });

      // Insert batch into database
      const { error } = await supabase
        .from('jobs')
        .insert(jobsToInsert);

      if (error) {
        console.error('Database insertion error:', error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      generatedJobs += currentBatchSize;
      console.log(`Generated batch ${batch + 1}/${totalBatches} (${generatedJobs}/${count} jobs)`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: `Successfully generated ${generatedJobs} fake jobs`,
      jobsGenerated: generatedJobs
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-fake-jobs function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});