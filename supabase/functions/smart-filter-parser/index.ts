import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ParsedFilters {
  searchTerm: string;
  location: string;
  category: string;
  payMin: number;
  payMax: number;
  startDate: string;
  jobType: string;
  urgency: string;
  experience: string;
  confidence: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, userLocation = "New York" } = await req.json();
    
    console.log('Parsing query:', query, 'User location:', userLocation);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `You are a job search filter parser. Parse natural language job queries into structured filters.

Return ONLY a valid JSON object with these exact fields:
{
  "searchTerm": "main job keywords",
  "location": "specific location or borough (default: ${userLocation})",
  "category": "job category (childcare, delivery, warehouse, cleaning, retail, etc.)",
  "payMin": number (minimum hourly rate, default: 15),
  "payMax": number (maximum hourly rate, default: 50),
  "startDate": "ASAP|this_week|next_week|flexible",
  "jobType": "full_time|part_time|temporary|contract|any",
  "urgency": "immediate|soon|flexible",
  "experience": "none|some|experienced|any",
  "confidence": number (0-100, how confident you are in parsing)
}

Examples:
"childcare jobs near Flatbush under $20/hr" → {"searchTerm":"childcare","location":"Flatbush","category":"childcare","payMin":15,"payMax":20,"startDate":"flexible","jobType":"any","urgency":"flexible","experience":"any","confidence":95}

"ASAP cleaning gigs with no experience" → {"searchTerm":"cleaning","location":"${userLocation}","category":"cleaning","payMin":15,"payMax":50,"startDate":"ASAP","jobType":"any","urgency":"immediate","experience":"none","confidence":90}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        temperature: 0.1,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0].message.content.trim();
    
    console.log('GPT response:', generatedText);
    
    // Parse the JSON response
    let parsedFilters: ParsedFilters;
    try {
      parsedFilters = JSON.parse(generatedText);
    } catch (e) {
      console.error('Failed to parse GPT response as JSON:', generatedText);
      // Fallback parsing
      parsedFilters = {
        searchTerm: query,
        location: userLocation,
        category: "any",
        payMin: 15,
        payMax: 50,
        startDate: "flexible",
        jobType: "any",
        urgency: "flexible",
        experience: "any",
        confidence: 30
      };
    }

    return new Response(JSON.stringify({ 
      filters: parsedFilters,
      originalQuery: query,
      seoTitle: generateSEOTitle(parsedFilters),
      seoDescription: generateSEODescription(parsedFilters)
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in smart-filter-parser:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      filters: null 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateSEOTitle(filters: ParsedFilters): string {
  const { category, location, startDate, payMin } = filters;
  
  if (startDate === "ASAP") {
    return `${category} Jobs in ${location} - Start Immediately | Apply Today`;
  }
  
  if (payMin > 20) {
    return `High-Paying ${category} Jobs in ${location} - $${payMin}+/hr | Hiring Now`;
  }
  
  return `${category} Jobs in ${location} You Can Start This Week | Apply Now`;
}

function generateSEODescription(filters: ParsedFilters): string {
  const { category, location, startDate, payMin, experience } = filters;
  
  let desc = `Find ${category} jobs in ${location}`;
  
  if (startDate === "ASAP") {
    desc += " starting immediately";
  }
  
  if (payMin > 15) {
    desc += ` paying $${payMin}+/hr`;
  }
  
  if (experience === "none") {
    desc += " with no experience required";
  }
  
  desc += ". Apply online and get hired fast. New listings daily.";
  
  return desc;
}