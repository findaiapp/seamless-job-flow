import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export const useSavedJobs = (user: User | null) => {
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [localSavedJobs, setLocalSavedJobs] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load from localStorage for non-authenticated users
    const saved = localStorage.getItem('saved_jobs');
    if (saved) {
      setLocalSavedJobs(new Set(JSON.parse(saved)));
    }

    // Load from Supabase for authenticated users
    if (user) {
      fetchSavedJobs();
    }
  }, [user]);

  const fetchSavedJobs = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('saved_jobs')
        .select('job_id')
        .eq('user_id', user.id);

      if (error) throw error;

      const jobIds = data?.map(item => item.job_id) || [];
      setSavedJobs(new Set(jobIds));
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
    }
  };

  const toggleSavedJob = async (jobId: string) => {
    if (user) {
      // Authenticated user - save to Supabase
      const isCurrentlySaved = savedJobs.has(jobId);
      
      try {
        if (isCurrentlySaved) {
          await supabase
            .from('saved_jobs')
            .delete()
            .eq('user_id', user.id)
            .eq('job_id', jobId);
          
          setSavedJobs(prev => {
            const newSet = new Set(prev);
            newSet.delete(jobId);
            return newSet;
          });
        } else {
          await supabase
            .from('saved_jobs')
            .insert({
              user_id: user.id,
              job_id: jobId
            });
          
          setSavedJobs(prev => new Set([...prev, jobId]));
        }
      } catch (error) {
        console.error('Error toggling saved job:', error);
      }
    } else {
      // Non-authenticated user - save to localStorage
      const newSet = new Set(localSavedJobs);
      if (newSet.has(jobId)) {
        newSet.delete(jobId);
      } else {
        newSet.add(jobId);
      }
      setLocalSavedJobs(newSet);
      localStorage.setItem('saved_jobs', JSON.stringify([...newSet]));
    }
  };

  const isJobSaved = (jobId: string) => {
    return user ? savedJobs.has(jobId) : localSavedJobs.has(jobId);
  };

  const getSavedJobsCount = () => {
    return user ? savedJobs.size : localSavedJobs.size;
  };

  return {
    isJobSaved,
    toggleSavedJob,
    getSavedJobsCount,
    savedJobs: user ? savedJobs : localSavedJobs
  };
};