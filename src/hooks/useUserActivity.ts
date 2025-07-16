import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Job } from './useFakePaginationLogic';

type ActivityType = 'view' | 'apply' | 'save' | 'click';

export function useUserActivity() {
  const trackActivity = useCallback(async (
    job: Job,
    activityType: ActivityType,
    metadata?: Record<string, any>
  ) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('user_activity').insert({
        user_id: user.id,
        activity_type: activityType,
        metadata: {
          job_id: job.id,
          job_title: job.title,
          job_category: job.category,
          job_type: job.job_type,
          pay_range: job.pay_range,
          location: job.location,
          ...metadata
        }
      });
    } catch (error) {
      console.error('Error tracking user activity:', error);
    }
  }, []);

  const getRecentActivity = useCallback(async (limit = 10) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error getting recent activity:', error);
      return [];
    }
  }, []);

  const getJobsYoullLove = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      // Get last 3 viewed or applied jobs
      const { data: recentActivity } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', user.id)
        .in('activity_type', ['view', 'apply'])
        .order('created_at', { ascending: false })
        .limit(3);

      if (!recentActivity || recentActivity.length === 0) return [];

      // For now, use basic matching since the activity table has different structure
      const metadata = recentActivity.map(a => a.metadata as any).filter(Boolean);

      // Find recent jobs from the database
      const { data: matchingJobs, error } = await supabase
        .from('user_posted_jobs')
        .select('*')
        .limit(6)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return matchingJobs || [];
    } catch (error) {
      console.error('Error getting jobs you\'ll love:', error);
      return [];
    }
  }, []);

  return {
    trackActivity,
    getRecentActivity,
    getJobsYoullLove
  };
}