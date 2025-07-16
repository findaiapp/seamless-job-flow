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
    const { title, body } = await req.json();

    const prompt = `Analyze this Craigslist childcare job post and provide a detailed conversion score.

Title: "${title}"
Body: "${body}"

Rate each category from 0-100 and provide specific feedback:

1. **Urgency & Action**: Does it create urgency and encourage immediate action?
2. **Trust & Safety**: Does it build trust and seem legitimate/family-oriented?
3. **Clear Benefits**: Are the benefits and compensation clearly stated?
4. **Professional Tone**: Is it professional but warm and approachable?
5. **Call-to-Action**: Is the CTA clear, compelling, and easy to follow?
6. **Flag Safety**: How likely is this to avoid Craigslist spam detection?

Also analyze:
- What makes this post unique vs generic job posts?
- What could be improved for better conversion?
- How does this compare to high-performing childcare posts?

Return as JSON with:
{
  "overallScore": 85,
  "urgencyScore": 80,
  "trustScore": 90,
  "benefitsScore": 75,
  "toneScore": 85,
  "ctaScore": 90,
  "flagSafetyScore": 95,
  "uniquenessScore": 70,
  "feedback": "Detailed analysis here...",
  "improvements": ["suggestion 1", "suggestion 2"],
  "flagRisks": ["risk 1", "risk 2"] or [],
  "strengths": ["strength 1", "strength 2"]
}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert at analyzing job post performance for conversion and safety. Provide detailed, actionable analysis in JSON format.' 
          },
          { role: 'user', content: prompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.3
      }),
    });

    const data = await response.json();
    const analysis = JSON.parse(data.choices[0].message.content);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in score-post-conversion function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      overallScore: 0,
      feedback: "Error analyzing post"
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});