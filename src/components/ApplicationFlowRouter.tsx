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
      {/* Redirect /apply to step 1 */}
      <Route path="/" element={<Navigate to="/apply/step-1" replace />} />
      
      {/* Protected Step Routes */}
      <Route 
        path="/step-1" 
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
        path="/step-3" 
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
        path="/step-5" 
        element={
          <ApplicationStepGuard step={5}>
            <StepFiveSuccess />
          </ApplicationStepGuard>
        } 
      />
      
      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/apply/step-1" replace />} />
    </Routes>
  );
};

export default ApplicationFlowRouter;