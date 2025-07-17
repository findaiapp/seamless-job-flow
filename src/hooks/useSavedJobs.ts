import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';

export const useSavedJobs = (user: User | null) => {
  const [savedJobs, setSavedJobs] = useState<Set<string>>(new Set());
  const [localSavedJobs, setLocalSavedJobs] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load from localStorage for all users (mock implementation)
    const saved = localStorage.getItem('saved_jobs');
    if (saved) {
      setLocalSavedJobs(new Set(JSON.parse(saved)));
      setSavedJobs(new Set(JSON.parse(saved)));
    }
  }, [user]);

  const toggleSavedJob = async (jobId: string) => {
    // Mock implementation using localStorage only - no database calls
    const currentSet = user ? savedJobs : localSavedJobs;
    const newSet = new Set(currentSet);
    
    if (newSet.has(jobId)) {
      newSet.delete(jobId);
    } else {
      newSet.add(jobId);
    }
    
    if (user) {
      setSavedJobs(newSet);
    } else {
      setLocalSavedJobs(newSet);
    }
    
    localStorage.setItem('saved_jobs', JSON.stringify([...newSet]));
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