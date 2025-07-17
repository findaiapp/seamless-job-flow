import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.51.0';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

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
    console.log('Auto-repost scheduler started');

    // Get the current time
    const now = new Date();
    
    // Mark expired posts (posts that are past their repost_at time)
    const { error: updateError } = await supabase
      .from('craigslist_posts')
      .update({ status: 'expired' })
      .eq('status', 'posted')
      .lt('repost_at', now.toISOString());

    if (updateError) {
      console.error('Error updating expired posts:', updateError);
      throw updateError;
    }

    // Find unused variants (variants that haven't been posted yet for each city/job_type)
    const { data: variants, error: variantsError } = await supabase
      .from('post_variants')
      .select(`
        id,
        city,
        job_type,
        variant_title,
        variant_body
      `);

    if (variantsError) {
      console.error('Error fetching variants:', variantsError);
      throw variantsError;
    }

    if (!variants || variants.length === 0) {
      console.log('No variants found to process');
      return new Response(JSON.stringify({ 
        message: 'No variants available for posting',
        processed: 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Found ${variants.length} total variants`);

    // Get existing active posts to check which variants are already in use
    const { data: existingPosts, error: postsError } = await supabase
      .from('craigslist_posts')
      .select('variant_id, city, job_type')
      .eq('status', 'posted');

    if (postsError) {
      console.error('Error fetching existing posts:', postsError);
      throw postsError;
    }

    // Create a set of already used variant IDs for quick lookup
    const usedVariantIds = new Set(existingPosts?.map(post => post.variant_id) || []);

    // Find unused variants
    const unusedVariants = variants.filter(variant => !usedVariantIds.has(variant.id));

    console.log(`Found ${unusedVariants.length} unused variants`);

    if (unusedVariants.length === 0) {
      console.log('No unused variants to post');
      return new Response(JSON.stringify({ 
        message: 'All variants are already in use',
        processed: 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Group unused variants by city and job_type to pick one per combination
    const variantGroups = new Map<string, typeof unusedVariants[0][]>();
    
    unusedVariants.forEach(variant => {
      const key = `${variant.city}-${variant.job_type}`;
      if (!variantGroups.has(key)) {
        variantGroups.set(key, []);
      }
      variantGroups.get(key)!.push(variant);
    });

    // Select one variant per city/job_type combination
    const variantsToPost: typeof unusedVariants = [];
    variantGroups.forEach(variants => {
      // Pick the first available variant (could be randomized)
      variantsToPost.push(variants[0]);
    });

    console.log(`Selected ${variantsToPost.length} variants to post`);

    // Create new posts for selected variants
    const newPosts = variantsToPost.map(variant => {
      const repostAt = new Date();
      repostAt.setDate(repostAt.getDate() + 3); // Repost in 3 days

      return {
        variant_id: variant.id,
        city: variant.city,
        job_type: variant.job_type,
        posted_at: now.toISOString(),
        repost_at: repostAt.toISOString(),
        views: Math.floor(Math.random() * 50) + 10, // Mock initial views
        clicks: Math.floor(Math.random() * 5) + 1, // Mock initial clicks
        status: 'posted' as const
      };
    });

    if (newPosts.length > 0) {
      const { error: insertError } = await supabase
        .from('craigslist_posts')
        .insert(newPosts);

      if (insertError) {
        console.error('Error inserting new posts:', insertError);
        throw insertError;
      }

      console.log(`Successfully created ${newPosts.length} new posts`);
    }

    return new Response(JSON.stringify({ 
      message: 'Auto-repost scheduler completed successfully',
      expiredPosts: 'Updated',
      newPosts: newPosts.length,
      processed: variantsToPost.length
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in auto-repost-scheduler function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Auto-repost scheduler failed'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});