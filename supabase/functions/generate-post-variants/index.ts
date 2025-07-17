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
    const { city, jobType } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    console.log(`Generating variants for ${jobType} in ${city}`);

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
            content: `You are a Craigslist job posting expert. Create 3 different variants of job posts for ${jobType} positions in ${city}. Each variant should have a different tone and approach but target the same job type.

Return ONLY a JSON array with exactly this structure:
[
  {
    "title": "Compelling job title variant 1",
    "body": "Full job description with benefits, requirements, and how to apply"
  },
  {
    "title": "Compelling job title variant 2", 
    "body": "Full job description with benefits, requirements, and how to apply"
  },
  {
    "title": "Compelling job title variant 3",
    "body": "Full job description with benefits, requirements, and how to apply"
  }
]

Guidelines:
- Make each variant unique in tone (professional, casual, urgent)
- Include location: ${city}
- Focus on ${jobType} specific skills and requirements
- Include competitive pay/benefits mentions
- Add clear application instructions
- Keep titles under 50 characters
- Make body 200-400 words each`
          },
          {
            role: 'user',
            content: `Generate 3 variants for ${jobType} jobs in ${city}`
          }
        ],
        temperature: 0.8,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log('Raw OpenAI response:', generatedContent);

    // Parse the JSON response
    let variants;
    try {
      variants = JSON.parse(generatedContent);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      // Fallback: create default variants
      variants = [
        {
          title: `${jobType} - Immediate Start Available`,
          body: `We're looking for motivated ${jobType.toLowerCase()} to join our team in ${city}!\n\nWhat we offer:\n- Competitive pay\n- Flexible scheduling\n- Growth opportunities\n- Supportive team environment\n\nRequirements:\n- Previous experience preferred\n- Reliable transportation\n- Strong work ethic\n- Team player attitude\n\nTo apply, please respond with your resume and availability. We're hiring immediately!`
        },
        {
          title: `Hiring ${jobType} - Great Pay & Benefits`,
          body: `Exciting opportunity for ${jobType.toLowerCase()} in ${city}!\n\nWe provide:\n- Above-average compensation\n- Health benefits available\n- Paid time off\n- Career advancement\n\nWe're seeking:\n- Dedicated professionals\n- Excellent communication skills\n- Ability to work independently\n- Customer service focus\n\nInterested? Send us your resume today and let's talk about your future with our company!`
        },
        {
          title: `${jobType} Needed - Apply Today!`,
          body: `Join our growing team as a ${jobType.toLowerCase()} in ${city}!\n\nWhy choose us?\n- Stable employment\n- Training provided\n- Positive work environment\n- Recognition programs\n\nIdeal candidate:\n- Enthusiastic and reliable\n- Quick learner\n- Professional demeanor\n- Available to start soon\n\nDon't wait - this position won't last long! Apply now with your contact information and we'll get back to you quickly.`
        }
      ];
    }

    // Validate the structure
    if (!Array.isArray(variants) || variants.length !== 3) {
      throw new Error('Invalid variants structure from OpenAI');
    }

    // Ensure each variant has title and body
    variants.forEach((variant, index) => {
      if (!variant.title || !variant.body) {
        throw new Error(`Variant ${index + 1} missing title or body`);
      }
    });

    console.log('Successfully generated variants:', variants.length);

    return new Response(JSON.stringify({ variants }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-post-variants function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Failed to generate post variants'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});