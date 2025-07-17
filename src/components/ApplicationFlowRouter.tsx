import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ApplicationStepGuard from './ApplicationStepGuard';
import StepOnePersonalInfo from '@/pages/StepOnePersonalInfo';
import StepTwoPreferences from '@/pages/StepTwoPreferences';
import StepThreeResumeUpload from '@/pages/StepThreeResumeUpload';
import StepFourReferral from '@/pages/StepFourReferral';
import StepFiveReview from '@/pages/StepFiveReview';
import StepSixSuccess from '@/pages/StepSixSuccess';

const ApplicationFlowRouter: React.FC = () => {
  const { job_id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobData, setJobData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (job_id) {
      fetchJobData(job_id);
    } else {
      setLoading(false);
    }
  }, [job_id]);

  const fetchJobData = async (jobId: string) => {
    try {
      const { data: job, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching job:', error);
        toast({
          title: "Job not found",
          description: "Redirecting to job search...",
          variant: "destructive",
        });
        navigate('/search-jobs');
        return;
      }

      setJobData(job);
    } catch (error) {
      console.error('Error fetching job:', error);
      toast({
        title: "Error loading job",
        description: "Redirecting to job search...",
        variant: "destructive",
      });
      navigate('/search-jobs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-foreground">Loading application...</span>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Redirect to step 1 */}
      <Route path="/" element={<Navigate to="step-1" replace />} />
      
      {/* Step 1: Basic Info */}
      <Route 
        path="/step-1" 
        element={
          <ApplicationStepGuard step={1}>
            <StepOnePersonalInfo />
          </ApplicationStepGuard>
        } 
      />
      
      {/* Step 2: Skills & Availability */}
      <Route 
        path="/step-2" 
        element={
          <ApplicationStepGuard step={2}>
            <StepTwoPreferences />
          </ApplicationStepGuard>
        } 
      />
      
      {/* Step 3: Resume & Experience */}
      <Route 
        path="/step-3" 
        element={
          <ApplicationStepGuard step={3}>
            <StepThreeResumeUpload />
          </ApplicationStepGuard>
        } 
      />
      
      {/* Step 4: Referral Info */}
      <Route 
        path="/step-4" 
        element={
          <ApplicationStepGuard step={4}>
            <StepFourReferral />
          </ApplicationStepGuard>
        } 
      />
      
      {/* Step 5: Review Application */}
      <Route 
        path="/step-5" 
        element={
          <ApplicationStepGuard step={5}>
            <StepFiveReview />
          </ApplicationStepGuard>
        } 
      />
      
      {/* Success Page */}
      <Route 
        path="/success" 
        element={<StepSixSuccess />} 
      />
      
      {/* Fallback redirects */}
      <Route path="*" element={<Navigate to="step-1" replace />} />
    </Routes>
  );
};

export default ApplicationFlowRouter;