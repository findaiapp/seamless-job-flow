import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ApplicationFormData {
  // Job context
  jobId: string;
  jobTitle?: string;
  jobCompany?: string;
  
  // Personal Info (Step 1)
  fullName: string;
  phoneNumber: string;
  location: string;
  email?: string;
  
  // Skills & Availability (Step 2)
  skills?: string[];
  experience?: string;
  availability: string;
  
  // Resume (Step 3)
  resumeUrl?: string;
  
  // Referral (Step 4)
  referralCode?: string;
  
  // Current state
  step: number;
  isSubmitted: boolean;
  applicationId?: string;
}

interface ApplicationFormContextType {
  formData: ApplicationFormData;
  isLoading: boolean;
  updateField: (field: string, value: any) => void;
  goToStep: (step: number) => boolean;
  canAccessStep: (step: number) => boolean;
  saveCurrentStep: () => Promise<boolean>;
  submitApplication: () => Promise<boolean>;
  setJobContext: (jobId: string, jobTitle?: string, jobCompany?: string) => void;
  resetForm: () => void;
}

const initialFormData: ApplicationFormData = {
  jobId: '',
  jobTitle: '',
  jobCompany: '',
  fullName: '',
  phoneNumber: '',
  location: '',
  email: '',
  skills: [],
  experience: '',
  availability: '',
  resumeUrl: '',
  referralCode: '',
  step: 1,
  isSubmitted: false,
};

const ApplicationFormContext = createContext<ApplicationFormContextType | undefined>(undefined);

export const ApplicationFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('applicationFormData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Failed to load saved form data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem('applicationFormData', JSON.stringify(formData));
  }, [formData]);

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const setJobContext = (jobId: string, jobTitle?: string, jobCompany?: string) => {
    setFormData(prev => ({
      ...prev,
      jobId,
      jobTitle: jobTitle || '',
      jobCompany: jobCompany || ''
    }));
  };

  const canAccessStep = (step: number): boolean => {
    if (step === 1) return true;
    if (step === 2) return !!(formData.fullName && formData.phoneNumber && formData.location);
    if (step === 3) return !!(formData.experience && formData.availability);
    if (step === 4) return true; // Resume is optional
    if (step === 5) return !!(formData.fullName && formData.phoneNumber); // Review requires basic info
    return false;
  };

  const goToStep = (step: number): boolean => {
    if (canAccessStep(step)) {
      setFormData(prev => ({ ...prev, step }));
      return true;
    }
    
    toast({
      title: "Complete Previous Steps",
      description: "Please fill in all required fields before proceeding",
      variant: "destructive",
    });
    return false;
  };

  const saveCurrentStep = async (): Promise<boolean> => {
    if (!formData.jobId) {
      toast({
        title: "Missing Job Information",
        description: "No job selected for this application",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const response = await supabase.functions.invoke('save-application-step', {
        body: {
          application_id: formData.applicationId,
          step_number: formData.step,
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          email: formData.email,
          location: formData.location,
          skills: Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.experience,
          availability: formData.availability,
          resume_url: formData.resumeUrl,
          job_id: formData.jobId,
          step_data: {
            step: formData.step,
            timestamp: new Date().toISOString()
          }
        }
      });

      if (response.error) {
        console.error('Save error:', response.error);
        toast({
          title: "Save Failed",
          description: "Failed to save your progress. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      const result = response.data;
      if (!result.success) {
        console.error('Save failed:', result.error);
        toast({
          title: "Save Failed",
          description: result.error || "Failed to save your progress",
          variant: "destructive",
        });
        return false;
      }

      // Update application ID if this was the first save
      if (result.application_id && !formData.applicationId) {
        setFormData(prev => ({ ...prev, applicationId: result.application_id }));
      }

      return true;
    } catch (error) {
      console.error('Error saving step:', error);
      toast({
        title: "Save Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const submitApplication = async (): Promise<boolean> => {
    if (!formData.jobId) {
      toast({
        title: "Missing Job Information",
        description: "No job selected for this application",
        variant: "destructive",
      });
      return false;
    }

    // Validate required fields
    if (!formData.fullName || !formData.phoneNumber || !formData.location) {
      toast({
        title: "Missing Required Information",
        description: "Please complete all required fields",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      // Extract UTM parameters from URL
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      const utmCampaign = urlParams.get('utm_campaign');
      const utmMedium = urlParams.get('utm_medium');

      const response = await supabase.functions.invoke('submit-application', {
        body: {
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          email: formData.email || formData.phoneNumber,
          location: formData.location,
          skills: Array.isArray(formData.skills) ? formData.skills.join(', ') : formData.experience,
          availability: formData.availability,
          resume_url: formData.resumeUrl,
          ref_code: formData.referralCode,
          job_id: formData.jobId,
          source: 'application_flow',
          utm_source: utmSource,
          utm_campaign: utmCampaign,
          utm_medium: utmMedium
        }
      });

      console.log('✅ Application submission response:', response);

      if (response.error) {
        console.error('Submit error:', response.error);
        toast({
          title: "Submission Failed",
          description: "Failed to submit your application. Please try again.",
          variant: "destructive",
        });
        return false;
      }

      const result = response.data;
      if (!result.success) {
        console.error('Submit failed:', result.error);
        toast({
          title: "Submission Failed",
          description: result.error || "Failed to submit your application",
          variant: "destructive",
        });
        return false;
      }

      // Mark as submitted
      setFormData(prev => ({
        ...prev,
        isSubmitted: true,
        applicationId: result.job_application_id || result.application_id
      }));

      toast({
        title: "Application Submitted! 🎉",
        description: "Your application has been successfully submitted",
      });

      return true;
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Submission Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    localStorage.removeItem('applicationFormData');
  };

  return (
    <ApplicationFormContext.Provider value={{
      formData,
      isLoading,
      updateField,
      goToStep,
      canAccessStep,
      saveCurrentStep,
      submitApplication,
      setJobContext,
      resetForm,
    }}>
      {children}
    </ApplicationFormContext.Provider>
  );
};

export const useApplicationForm = () => {
  const context = useContext(ApplicationFormContext);
  if (context === undefined) {
    throw new Error('useApplicationForm must be used within an ApplicationFormProvider');
  }
  return context;
};