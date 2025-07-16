import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useJobActions = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const saveJob = async (jobId: string, userId?: string) => {
    if (!userId) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save jobs",
        variant: "destructive",
      });
      return false;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('saved_jobs')
        .insert({ 
          user_id: userId, 
          job_id: jobId 
        });

      if (error) throw error;

      toast({
        title: "Job saved! 💾",
        description: "Added to your saved jobs list",
      });
      return true;
    } catch (error: any) {
      console.error('Error saving job:', error);
      if (error.code === '23505') {
        toast({
          title: "Already saved",
          description: "This job is already in your saved list",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to save job",
          variant: "destructive",
        });
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const recordApplication = async (jobId: string, userId?: string) => {
    if (!userId) return false;

    try {
      const { error } = await supabase
        .from('applied_jobs')
        .insert({ 
          user_id: userId, 
          job_id: jobId 
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error recording application:', error);
      return false;
    }
  };

  return {
    saveJob,
    recordApplication,
    loading
  };
};