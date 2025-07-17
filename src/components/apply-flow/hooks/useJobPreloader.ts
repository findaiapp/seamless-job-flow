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

        // Handle dev test job case
        if (jobId === 'dev-test-job') {
          const testJob: Job = {
            id: 'dev-test-job',
            title: 'Test Job - Application Flow',
            company: 'Hireloop',
            location: 'New York, NY',
            description: 'This is a test job to debug the 5-step application flow. Use this to test all features including form validation, resume upload, and final submission.',
            pay_range: '$20-25/hr',
            job_type: 'Full-time',
            requirements: 'No real requirements - this is just for testing the application flow.',
            benefits: 'Testing benefits: Health insurance, Remote work, Flexible schedule'
          };
          
          setJob(testJob);
          console.log('✅ Dev test job loaded:', testJob);
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
          setError('Job not found');
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