import React, { useEffect } from 'react';
import { Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom';
import { ApplicationFormProvider, useApplicationForm } from './context/ApplicationFormContext';
import { useJobPreloader } from './hooks/useJobPreloader';
import StepOne from './pages/StepOne';
import StepTwo from './pages/StepTwo';
import StepThree from './pages/StepThree';
import StepFour from './pages/StepFour';
import StepFive from './pages/StepFive';
import SuccessPage from './pages/SuccessPage';
import JobNotFound from './pages/JobNotFound';

// Inner component that has access to the context
const ApplyFlowContent: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  // Auto-redirect from /apply to /apply/test123
  useEffect(() => {
    if (!jobId) {
      navigate('/apply/test123', { replace: true });
    }
  }, [jobId, navigate]);
  const { job, isLoading, error } = useJobPreloader(jobId || '');
  const { setJobContext } = useApplicationForm();

  // Set job context when job is loaded
  useEffect(() => {
    if (job) {
      setJobContext(job.id, job.title, job.company);
      console.log('✅ Job context set:', { id: job.id, title: job.title, company: job.company });
    }
  }, [job, setJobContext]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-foreground">Loading job details...</span>
        </div>
      </div>
    );
  }

  // Handle error or job not found
  if (error || !job) {
    return <JobNotFound />;
  }

  return (
    <Routes>
      <Route index element={<Navigate to="step-1" replace />} />
      <Route path="step-1" element={<StepOne />} />
      <Route path="step-2" element={<StepTwo />} />
      <Route path="step-3" element={<StepThree />} />
      <Route path="step-4" element={<StepFour />} />
      <Route path="step-5" element={<StepFive />} />
      <Route path="success" element={<SuccessPage />} />
      <Route path="*" element={<Navigate to="step-1" replace />} />
    </Routes>
  );
};

// Main router that provides the context
const ApplyFlowRouter: React.FC = () => {
  return (
    <ApplicationFormProvider>
      <ApplyFlowContent />
    </ApplicationFormProvider>
  );
};

export default ApplyFlowRouter;