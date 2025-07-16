import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  pay_range: string;
  created_at: string;
  job_type?: string;
  category?: string;
}

interface RankedJob extends Job {
  matchScore: number;
  matchReasons: string[];
  urgencyScore: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { jobs, userQuery, filters, userLocation = "New York" } = await req.json();
    
    console.log('Ranking jobs for query:', userQuery, 'Jobs count:', jobs.length);

    if (!openAIApiKey) {
      // Fallback to basic scoring without GPT
      const rankedJobs = jobs.map(job => ({
        ...job,
        matchScore: calculateBasicMatchScore(job, userQuery, filters),
        matchReasons: ["Basic keyword match"],
        urgencyScore: calculateUrgencyScore(job)
      }));

      return new Response(JSON.stringify({ 
        rankedJobs: rankedJobs.sort((a, b) => b.matchScore - a.matchScore)
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // GPT-powered ranking for better results
    const rankedJobs = await Promise.all(
      jobs.slice(0, 20).map(async (job: Job) => { // Limit to first 20 for cost efficiency
        const matchData = await calculateGPTMatchScore(job, userQuery, filters);
        return {
          ...job,
          ...matchData,
          urgencyScore: calculateUrgencyScore(job)
        };
      })
    );

    // Add remaining jobs with basic scoring
    const remainingJobs = jobs.slice(20).map(job => ({
      ...job,
      matchScore: calculateBasicMatchScore(job, userQuery, filters),
      matchReasons: ["Basic keyword match"],
      urgencyScore: calculateUrgencyScore(job)
    }));

    const allRankedJobs = [...rankedJobs, ...remainingJobs]
      .sort((a, b) => {
        // Primary sort by match score
        if (Math.abs(a.matchScore - b.matchScore) > 10) {
          return b.matchScore - a.matchScore;
        }
        // Secondary sort by urgency
        return b.urgencyScore - a.urgencyScore;
      });

    return new Response(JSON.stringify({ 
      rankedJobs: allRankedJobs,
      totalAnalyzed: jobs.length,
      gptAnalyzed: Math.min(20, jobs.length)
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in job-match-ranker:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      rankedJobs: jobs // Return original order as fallback
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function calculateGPTMatchScore(job: Job, userQuery: string, filters: any): Promise<{matchScore: number, matchReasons: string[]}> {
  try {
    const prompt = `Rate how well this job matches the user's search query and filters on a scale of 0-100.

User Query: "${userQuery}"
User Filters: ${JSON.stringify(filters)}

Job:
Title: ${job.title}
Company: ${job.company}
Location: ${job.location}
Description: ${job.description.substring(0, 300)}
Pay: ${job.pay_range}
Type: ${job.job_type || 'Not specified'}

Return ONLY a JSON object:
{
  "score": number (0-100),
  "reasons": ["reason1", "reason2", "reason3"]
}

Consider:
- Title/description relevance to query keywords
- Location match
- Pay range alignment
- Job type preferences
- Experience requirements
- Urgency/start date needs`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a job matching expert. Be precise and analytical.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.1,
        max_tokens: 200,
      }),
    });

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content.trim());
    
    return {
      matchScore: result.score || 50,
      matchReasons: result.reasons || ["GPT analysis"]
    };
  } catch (error) {
    console.error('GPT match scoring error:', error);
    return {
      matchScore: calculateBasicMatchScore(job, userQuery, filters),
      matchReasons: ["Fallback scoring"]
    };
  }
}

function calculateBasicMatchScore(job: Job, userQuery: string, filters: any): number {
  let score = 50; // Base score
  
  const query = userQuery.toLowerCase();
  const title = job.title.toLowerCase();
  const description = job.description.toLowerCase();
  
  // Title keyword matches (high weight)
  if (title.includes(query)) score += 30;
  
  // Description keyword matches
  const queryWords = query.split(' ').filter(word => word.length > 2);
  const matchingWords = queryWords.filter(word => 
    title.includes(word) || description.includes(word)
  );
  score += matchingWords.length * 5;
  
  // Location preference
  if (filters?.location && job.location.toLowerCase().includes(filters.location.toLowerCase())) {
    score += 15;
  }
  
  // Pay range matching
  if (filters?.payMin && job.pay_range) {
    const payMatch = job.pay_range.match(/\$(\d+)/);
    if (payMatch && parseInt(payMatch[1]) >= filters.payMin) {
      score += 10;
    }
  }
  
  return Math.min(100, Math.max(0, score));
}

function calculateUrgencyScore(job: Job): number {
  let urgencyScore = 0;
  
  // Recent postings get higher urgency
  const daysSincePosted = (Date.now() - new Date(job.created_at).getTime()) / (1000 * 60 * 60 * 24);
  if (daysSincePosted < 1) urgencyScore += 30;
  else if (daysSincePosted < 3) urgencyScore += 20;
  else if (daysSincePosted < 7) urgencyScore += 10;
  
  // Urgency keywords in title/description
  const urgentKeywords = ['asap', 'immediate', 'urgent', 'start now', 'hire today', 'same day'];
  const text = (job.title + ' ' + job.description).toLowerCase();
  
  urgentKeywords.forEach(keyword => {
    if (text.includes(keyword)) urgencyScore += 15;
  });
  
  return Math.min(100, urgencyScore);
}