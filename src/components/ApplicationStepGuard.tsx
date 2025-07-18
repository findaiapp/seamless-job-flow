import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplicationForm } from '@/components/apply-flow/context/ApplicationFormContext';
import { useToast } from '@/hooks/use-toast';

interface ApplicationStepGuardProps {
  step: number;
  children: React.ReactNode;
}

const ApplicationStepGuard: React.FC<ApplicationStepGuardProps> = ({ step, children }) => {
  const navigate = useNavigate();
  const { canAccessStep } = useApplicationForm();
  const { toast } = useToast();

  useEffect(() => {
    // Auto-scroll to top on step change
    window.scrollTo(0, 0);

    // Check if user can access this step
    if (!canAccessStep(step)) {
      // Find the correct step to redirect to
      let redirectStep = 1;
      for (let i = 1; i <= 5; i++) {
        if (canAccessStep(i)) {
          redirectStep = i;
        } else {
          break;
        }
      }

      // Show appropriate message
      const stepNames = {
        1: 'Basic Info',
        2: 'Skills & Availability', 
        3: 'Resume & Experience',
        4: 'Review Application',
        5: 'Success'
      };

      toast({
        title: `⚠️ Please complete ${stepNames[redirectStep as keyof typeof stepNames]} first`,
        description: 'You need to complete the previous steps before continuing.',
        variant: 'destructive',
      });

      // Redirect to the correct step  
      navigate(`step-${redirectStep}`);
      return;
    }

    // Track progress analytics
    const stepNames = {
      1: 'Basic Info',
      2: 'Skills & Availability', 
      3: 'Resume & Experience',
      4: 'Review Application',
      5: 'Success'
    };
    console.log(`📊 User accessed Step ${step}:`, stepNames[step as keyof typeof stepNames]);
  }, [step, canAccessStep, navigate, toast]);

  // Only render children if user can access this step
  if (!canAccessStep(step)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-foreground">Redirecting...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ApplicationStepGuard;