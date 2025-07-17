import { useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const usePostTracker = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const trackPostClick = async () => {
      // Check if this is a Craigslist referral
      const ref = searchParams.get('ref');
      const source = searchParams.get('utm_source');
      const postId = searchParams.get('post_id');
      
      // Only track if coming from Craigslist with a post_id
      if ((ref === 'craigslist' || source === 'craigslist') && postId) {
        try {
          console.log('Tracking Craigslist post click for post_id:', postId);
          
          // First get the current click count
          const { data: currentPost, error: fetchError } = await supabase
            .from('craigslist_posts')
            .select('clicks')
            .eq('id', postId)
            .single();

          if (fetchError) {
            console.error('Error fetching current post data:', fetchError);
            return;
          }

          // Increment the click count
          const { error } = await supabase
            .from('craigslist_posts')
            .update({ 
              clicks: (currentPost?.clicks || 0) + 1
            })
            .eq('id', postId);

          if (error) {
            console.error('Error tracking post click:', error);
          } else {
            console.log('Successfully tracked post click');
          }
        } catch (error) {
          console.error('Error in post click tracking:', error);
        }
      }
    };

    trackPostClick();
  }, [searchParams, location]);

  const simulatePostView = async (postId: string) => {
    try {
      console.log('Simulating post view for post_id:', postId);
      
      // First get the current view count
      const { data: currentPost, error: fetchError } = await supabase
        .from('craigslist_posts')
        .select('views')
        .eq('id', postId)
        .single();

      if (fetchError) {
        console.error('Error fetching current post data:', fetchError);
        return false;
      }

      // Increment the view count
      const { error } = await supabase
        .from('craigslist_posts')
        .update({ 
          views: (currentPost?.views || 0) + 1
        })
        .eq('id', postId);

      if (error) {
        console.error('Error tracking post view:', error);
        return false;
      }
      
      console.log('Successfully tracked post view');
      return true;
    } catch (error) {
      console.error('Error in post view tracking:', error);
      return false;
    }
  };

  const simulatePostClick = async (postId: string) => {
    try {
      console.log('Simulating post click for post_id:', postId);
      
      // First get the current click count
      const { data: currentPost, error: fetchError } = await supabase
        .from('craigslist_posts')
        .select('clicks')
        .eq('id', postId)
        .single();

      if (fetchError) {
        console.error('Error fetching current post data:', fetchError);
        return false;
      }

      // Increment the click count
      const { error } = await supabase
        .from('craigslist_posts')
        .update({ 
          clicks: (currentPost?.clicks || 0) + 1
        })
        .eq('id', postId);

      if (error) {
        console.error('Error tracking post click:', error);
        return false;
      }
      
      console.log('Successfully tracked post click');
      return true;
    } catch (error) {
      console.error('Error in post click tracking:', error);
      return false;
    }
  };

  return {
    simulatePostView,
    simulatePostClick
  };
};