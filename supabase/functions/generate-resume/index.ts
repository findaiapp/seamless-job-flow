import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fullName, phoneNumber, location, email, experience, availability, jobTitle, jobCompany } = await req.json();

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `Create a professional resume for ${fullName} applying for ${jobTitle} at ${jobCompany}.

Personal Information:
- Name: ${fullName}
- Phone: ${phoneNumber}
- Location: ${location}
- Email: ${email || 'Available upon request'}

Experience & Skills:
${experience}

Availability: ${availability}

Generate a well-formatted, professional resume that highlights relevant skills and experience for this position. Make it compelling and industry-appropriate. Format it as clean, readable text that could be converted to PDF.

Include these sections:
1. Professional Summary (2-3 sentences)
2. Core Skills (bullet points)
3. Professional Experience (if any mentioned)
4. Education (make reasonable assumptions if not provided)
5. Additional Information

Keep it concise but impactful, around 300-400 words total.`;

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
            content: 'You are a professional resume writer. Create compelling, well-formatted resumes that highlight candidates\' strengths and match job requirements.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenAI API error: ${error}`);
    }

    const data = await response.json();
    const resumeContent = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ resumeContent }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in generate-resume function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});