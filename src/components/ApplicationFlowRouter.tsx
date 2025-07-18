import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { useApplicationForm } from '@/components/apply-flow/context/ApplicationFormContext';
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
  const { setJobContext } = useApplicationForm();
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
      // First try the jobs table
      let { data: job, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', jobId)
        .single();

      // If not found in jobs table, handle gracefully
      if (error && error.code === 'PGRST116') {
        console.log('Job not found in jobs table:', jobId);
        setJobData(null);
        return;
      }

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching job:', error);
        setJobData(null);
        return;
      }

      if (job) {
        setJobData(job);
        // Set job context in the application form
        setJobContext(job);
      } else {
        setJobData(null);
      }
    } catch (error) {
      console.error('Error fetching job:', error);
      setJobData(null);
    } finally {
      setLoading(false);
    }
  };

  // Show custom error for missing job
  if (!loading && job_id && !jobData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Job No Longer Available</h2>
            <p className="text-muted-foreground">
              This job posting has been removed or filled. Don't worry - there are plenty of other opportunities waiting for you!
            </p>
          </div>
          <div className="space-y-3">
            <Button 
              onClick={() => navigate('/search-jobs')} 
              className="w-full"
            >
              Browse All Jobs →
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="w-full"
            >
              Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
        path="step-1" 
        element={
          <ApplicationStepGuard step={1}>
            <StepOnePersonalInfo />
          </ApplicationStepGuard>
        } 
      />
      
      {/* Step 2: Skills & Availability */}
      <Route 
        path="step-2" 
        element={
          <ApplicationStepGuard step={2}>
            <StepTwoPreferences />
          </ApplicationStepGuard>
        } 
      />
      
      {/* Step 3: Resume & Experience */}
      <Route 
        path="step-3" 
        element={
          <ApplicationStepGuard step={3}>
            <StepThreeResumeUpload />
          </ApplicationStepGuard>
        } 
      />
      
      {/* Step 4: Referral Info */}
      <Route 
        path="step-4" 
        element={
          <ApplicationStepGuard step={4}>
            <StepFourReferral />
          </ApplicationStepGuard>
        } 
      />
      
      {/* Step 5: Review Application */}
      <Route 
        path="step-5" 
        element={
          <ApplicationStepGuard step={5}>
            <StepFiveReview />
          </ApplicationStepGuard>
        } 
      />
      
      {/* Success Page */}
      <Route 
        path="success" 
        element={<StepSixSuccess />} 
      />
      
      {/* Fallback redirects */}
      <Route path="*" element={<Navigate to="step-1" replace />} />
    </Routes>
  );
};

export default ApplicationFlowRouter;