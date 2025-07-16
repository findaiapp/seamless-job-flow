import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Borough and job type combinations for daily rotation
const combinations = [
  { borough: 'Brooklyn', jobType: 'Nanny' },
  { borough: 'Manhattan', jobType: 'Babysitter' },
  { borough: 'Queens', jobType: 'Nanny' },
  { borough: 'Bronx', jobType: 'Babysitter' },
  { borough: 'Staten Island', jobType: 'Preschool Assistant' },
  { borough: 'Brooklyn', jobType: 'Home Daycare' },
  { borough: 'Manhattan', jobType: 'Nanny' },
  { borough: 'Queens', jobType: 'Babysitter' },
];

const toneVariations = [
  "warm and family-focused",
  "professional but friendly", 
  "urgent and opportunity-driven",
  "community-oriented and trusting",
  "supportive and growth-minded"
];

const ctaVariations = [
  "Apply here → https://hireloop.ai/apply?job=childcare&ref=craigslist_daily",
  "Start your childcare journey → https://hireloop.ai/apply?job=childcare&ref=craigslist_daily", 
  "Join our family today → https://hireloop.ai/apply?job=childcare&ref=craigslist_daily",
  "Quick apply now → https://hireloop.ai/apply?job=childcare&ref=craigslist_daily"
];

async function validateForFlags(title: string, body: string) {
  const warnings: string[] = [];
  let riskScore = 0;
  
  // Check for too many emojis in title
  const emojiCount = (title.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu) || []).length;
  if (emojiCount > 2) {
    warnings.push("Too many emojis in title");
    riskScore += 20;
  }

  // Check for capitalized brand names
  const flaggedBrands = ['AMAZON', 'NYC GOV', 'UBER', 'LYFT', 'DOORDASH'];
  const hasCapsBrands = flaggedBrands.some(brand => title.toUpperCase().includes(brand) || body.toUpperCase().includes(brand));
  if (hasCapsBrands) {
    warnings.push("Contains capitalized brand names");
    riskScore += 30;
  }

  // Check for multiple links
  const linkCount = (body.match(/https?:\/\/[^\s]+/g) || []).length;
  if (linkCount > 1) {
    warnings.push("Multiple links detected");
    riskScore += 25;
  }

  return { warnings, riskScore };
}

async function scorePostForConversion(title: string, body: string) {
  let conversionScore = 0;
  
  // Check for urgency language
  const urgencyWords = ['now', 'today', 'immediately', 'urgent', 'asap', 'quick'];
  const hasUrgency = urgencyWords.some(word => body.toLowerCase().includes(word));
  if (hasUrgency) conversionScore += 25;
  
  // Check for trust and friendliness
  const trustWords = ['family', 'loving', 'caring', 'supportive', 'flexible', 'training'];
  const trustCount = trustWords.filter(word => body.toLowerCase().includes(word)).length;
  conversionScore += Math.min(trustCount * 10, 30);
  
  // Check for clear CTA
  const hasCTA = body.includes('Apply') || body.includes('apply');
  if (hasCTA) conversionScore += 20;
  
  // Check for specific benefits
  const benefitWords = ['competitive', 'flexible hours', 'benefits', 'paid', 'training provided'];
  const benefitCount = benefitWords.filter(word => body.toLowerCase().includes(word)).length;
  conversionScore += Math.min(benefitCount * 5, 25);
  
  return Math.min(conversionScore, 100);
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting daily Craigslist post generation...');
    
    // Get today's combination (rotate based on day of year)
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const combo = combinations[dayOfYear % combinations.length];
    const tone = toneVariations[dayOfYear % toneVariations.length];
    const cta = ctaVariations[dayOfYear % ctaVariations.length];
    
    const today = new Date().toISOString().split('T')[0];
    const dailyVariantId = `daily_${today}_${combo.borough.toLowerCase()}_${combo.jobType.toLowerCase().replace(' ', '_')}`;
    
    // Check if we already generated today's post
    const { data: existingPost } = await supabase
      .from('craigslist_posts')
      .select('*')
      .eq('daily_variant_id', dailyVariantId)
      .single();
      
    if (existingPost) {
      console.log('Post already generated for today');
      return new Response(JSON.stringify({ 
        message: 'Post already generated for today',
        post: existingPost 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Enhanced prompt for daily variation
    const prompt = `Write a Craigslist post for a childcare job in ${combo.borough} looking for a ${combo.jobType}. 

Use a ${tone} tone and make this post unique from yesterday's content.

Requirements:
- Title: Under 70 characters, 1-2 emojis max, highly engaging
- Make it completely flag-safe (no spam words, no ALL CAPS brands)
- Include trust-building language like "loving family," "flexible hours," "training provided"
- Add urgency but keep it natural
- Body: 300-500 words, conversational but professional
- End with exactly: "${cta}_${today}"
- Focus on benefits: flexible schedule, competitive pay, supportive environment
- Mention specific needs for ${combo.jobType} work in ${combo.borough}

Create a post that feels personal and authentic, not automated.

Return as JSON with "title" and "body" fields.`;

    console.log(`Generating post for ${combo.borough} ${combo.jobType} with ${tone} tone`);

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
            content: 'You are an expert at creating high-converting, flag-safe Craigslist posts for childcare jobs. Always respond with valid JSON containing "title" and "body" fields. Make each post unique and authentic.' 
          },
          { role: 'user', content: prompt }
        ],
        response_format: { type: "json_object" },
        temperature: 0.8 // Add creativity for daily variation
      }),
    });

    const data = await response.json();
    const generatedContent = JSON.parse(data.choices[0].message.content);
    
    // Validate and score the generated post
    const flagValidation = await validateForFlags(generatedContent.title, generatedContent.body);
    const conversionScore = await scorePostForConversion(generatedContent.title, generatedContent.body);
    
    console.log(`Generated post with conversion score: ${conversionScore}, flag risk: ${flagValidation.riskScore}`);
    
    // Save to database
    const { data: savedPost, error } = await supabase
      .from('craigslist_posts')
      .insert({
        variant: 'daily_auto',
        title: generatedContent.title,
        body: generatedContent.body,
        borough: combo.borough,
        job_type: combo.jobType,
        used: false,
        utm_link: `${cta}_${today}`,
        auto_generated: true,
        posted_date: today,
        daily_variant_id: dailyVariantId,
        conversion_score: conversionScore,
        flag_risk_score: flagValidation.riskScore,
        variant_score: conversionScore - flagValidation.riskScore
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    console.log('Daily post generated and saved successfully');

    return new Response(JSON.stringify({
      success: true,
      post: savedPost,
      validation: {
        conversionScore,
        flagRisk: flagValidation.riskScore,
        warnings: flagValidation.warnings
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-daily-craigslist-post function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});