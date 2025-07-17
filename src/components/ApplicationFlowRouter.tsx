import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ApplicationStepGuard from './ApplicationStepGuard';
import StepOnePersonalInfo from '@/pages/StepOnePersonalInfo';
import StepTwoPreferences from '@/pages/StepTwoPreferences';
import StepThreeLocation from '@/pages/StepThreeLocation';
import StepFourReview from '@/pages/StepFourReview';
import StepFiveSuccess from '@/pages/StepFiveSuccess';

const ApplicationFlowRouter: React.FC = () => {
  return (
    <Routes>
      {/* Redirect /apply/:job_id to step 1 with job_id preserved */}
      <Route path="/:job_id" element={<Navigate to="step-1" replace />} />
      <Route path="/" element={<Navigate to="step-1" replace />} />
      
      {/* Step Routes - handle both /apply/step-X and /apply/:job_id/step-X */}
      <Route 
        path="/step-1" 
        element={
          <ApplicationStepGuard step={1}>
            <StepOnePersonalInfo />
          </ApplicationStepGuard>
        } 
      />
      <Route 
        path="/:job_id/step-1" 
        element={
          <ApplicationStepGuard step={1}>
            <StepOnePersonalInfo />
          </ApplicationStepGuard>
        } 
      />
      
      <Route 
        path="/step-2" 
        element={
          <ApplicationStepGuard step={2}>
            <StepTwoPreferences />
          </ApplicationStepGuard>
        } 
      />
      <Route 
        path="/:job_id/step-2" 
        element={
          <ApplicationStepGuard step={2}>
            <StepTwoPreferences />
          </ApplicationStepGuard>
        } 
      />
      
      <Route 
        path="/step-3" 
        element={
          <ApplicationStepGuard step={3}>
            <StepThreeLocation />
          </ApplicationStepGuard>
        } 
      />
      <Route 
        path="/:job_id/step-3" 
        element={
          <ApplicationStepGuard step={3}>
            <StepThreeLocation />
          </ApplicationStepGuard>
        } 
      />
      
      <Route 
        path="/step-4" 
        element={
          <ApplicationStepGuard step={4}>
            <StepFourReview />
          </ApplicationStepGuard>
        } 
      />
      <Route 
        path="/:job_id/step-4" 
        element={
          <ApplicationStepGuard step={4}>
            <StepFourReview />
          </ApplicationStepGuard>
        } 
      />
      
      <Route 
        path="/step-5" 
        element={
          <ApplicationStepGuard step={5}>
            <StepFiveSuccess />
          </ApplicationStepGuard>
        } 
      />
      <Route 
        path="/:job_id/step-5" 
        element={
          <ApplicationStepGuard step={5}>
            <StepFiveSuccess />
          </ApplicationStepGuard>
        } 
      />
      
      {/* Fallback redirects */}
      <Route path="/:job_id" element={<Navigate to="step-1" replace />} />
      <Route path="*" element={<Navigate to="step-1" replace />} />
    </Routes>
  );
};

export default ApplicationFlowRouter;