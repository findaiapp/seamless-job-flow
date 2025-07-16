import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { borough, jobType } = await req.json();

    const prompt = `Write a Craigslist post in the "resume/job wanted" section for someone offering a childcare job in ${borough}. Focus on attracting ${jobType} workers. Make it informal but safe, honest, and inspiring. Add urgency and flexibility. 

Requirements:
- Keep title under 70 characters with 1-2 emojis max
- Make it flag-safe (no capitalized brand names, no spam keywords)
- Include terms like "flexible hours," "family-owned," or "training provided"
- Keep body under 500 words
- End with: "Apply here → https://hireloop.ai/apply?job=childcare&ref=craigslist"

Return as JSON with "title" and "body" fields.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that generates flag-proof Craigslist posts for childcare jobs. Always respond with valid JSON containing "title" and "body" fields.' },
          { role: 'user', content: prompt }
        ],
        response_format: { type: "json_object" }
      }),
    });

    const data = await response.json();
    const generatedContent = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify(generatedContent), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-craigslist-post function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});