import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  pay_range?: string;
  job_type?: string;
  requirements?: string;
  benefits?: string;
}

export const useJobPreloader = (jobId: string) => {
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!jobId) {
      setError('No job ID provided');
      setIsLoading(false);
      return;
    }

    const fetchJob = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Handle dev test job case or fallback
        if (jobId === 'dev-test-job' || jobId === 'test123') {
          const testJob: Job = {
            id: jobId,
            title: 'Test Delivery Job',
            company: 'QuickTest Inc.',
            location: 'Brooklyn, NY',
            description: 'Temporary job used for testing the 5-step application flow. Use this to test all features including form validation, resume upload, and final submission.',
            pay_range: '$20-25/hr',
            job_type: 'Full-time',
            requirements: 'No real requirements - this is just for testing the application flow.',
            benefits: 'Testing benefits: Health insurance, Remote work, Flexible schedule'
          };
          
          setJob(testJob);
          console.log('✅ Test job loaded:', testJob);
          setIsLoading(false);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', jobId)
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching job:', fetchError);
          setError('Failed to load job details');
          return;
        }

        if (!data) {
          // Fallback to test job if real job not found
          const fallbackJob: Job = {
            id: 'fallback-test',
            title: 'Test Delivery Job (Fallback)',
            company: 'QuickTest Inc.',
            location: 'Brooklyn, NY',
            description: '⚠️ This is a test job used for previewing the application process. The original job may have been removed.',
            pay_range: '$20-25/hr',
            job_type: 'Full-time',
            requirements: 'No real requirements - this is just for testing the application flow.',
            benefits: 'Testing benefits: Health insurance, Remote work, Flexible schedule'
          };
          
          setJob(fallbackJob);
          console.log('⚠️ Using fallback test job for:', jobId);
          setIsLoading(false);
          return;
        }

        // Job found successfully
        setJob(data);
        console.log('✅ Job loaded successfully:', data);
      } catch (err) {
        console.error('Unexpected error fetching job:', err);
        setError('An unexpected error occurred');
        toast({
          title: "Unexpected Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchJob();
  }, [jobId, toast]);

  return { job, isLoading, error };
};