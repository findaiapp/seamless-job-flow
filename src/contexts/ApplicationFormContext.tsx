import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ApplicationFormData {
  // Job context
  jobId?: string;
  jobTitle?: string;
  jobCompany?: string;
  
  // Step 1: Personal Info
  fullName: string;
  phone: string;
  email: string;
  location: string;

  // Step 2: Skills & Availability
  skills: string;
  availability: string;
  
  // Step 3: Resume Upload
  resumeUrl: string;

  // Step 4: Referral Info
  referralCode: string;
  source: string;

  // Meta
  applicationId?: string;
  currentStep: number;
  isSubmitted: boolean;
}

interface ApplicationFormContextType {
  formData: ApplicationFormData;
  updateFormData: (data: Partial<ApplicationFormData>) => void;
  setJobContext: (jobId: string, jobTitle?: string, jobCompany?: string) => void;
  saveToSupabase: () => Promise<{ success: boolean; id?: string }>;
  submitApplication: () => Promise<{ success: boolean }>;
  canAccessStep: (step: number) => boolean;
  resetForm: () => void;
  isLoading: boolean;
}

const initialFormData: ApplicationFormData = {
  jobId: '',
  jobTitle: '',
  jobCompany: '',
  fullName: '',
  phone: '',
  email: '',
  location: '',
  skills: '',
  availability: '',
  resumeUrl: '',
  referralCode: '',
  source: '',
  currentStep: 1,
  isSubmitted: false,
};

const ApplicationFormContext = createContext<ApplicationFormContextType | undefined>(undefined);

export const ApplicationFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  // Load existing form data on mount
  useEffect(() => {
    loadExistingApplication();
  }, []);

  const loadExistingApplication = async () => {
    try {
      const { data: applications, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (!error && applications && applications.length > 0) {
        const app = applications[0];
        setFormData({
          fullName: app.full_name || '',
          phone: app.phone || '',
          email: '',
          location: app.location || '',
          skills: app.skills || '',
          availability: app.availability || '',
          resumeUrl: app.resume_url || '',
          referralCode: app.referral_code || '',
          source: app.source || '',
          applicationId: app.id,
          currentStep: determineCurrentStep(app),
          isSubmitted: false,
        });
      }
    } catch (error) {
      console.error('Error loading existing application:', error);
    }
  };

  const determineCurrentStep = (app: any): number => {
    if (!app.full_name || !app.phone || !app.location) return 1;
    if (!app.skills || !app.availability) return 2;
    // Step 3 is resume upload (optional)
    if (!app.source) return 4;
    return 5;
  };

  const updateFormData = (data: Partial<ApplicationFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const setJobContext = (jobId: string, jobTitle?: string, jobCompany?: string) => {
    setFormData(prev => ({
      ...prev,
      jobId,
      jobTitle: jobTitle || '',
      jobCompany: jobCompany || ''
    }));
  };

  const saveToSupabase = async (): Promise<{ success: boolean; id?: string }> => {
    setIsLoading(true);
    try {
      // Use edge function for saving application steps
      const response = await supabase.functions.invoke('save-application-step', {
        body: {
          application_id: formData.applicationId,
          step_number: formData.currentStep,
          full_name: formData.fullName,
          phone_number: formData.phone,
          email: formData.email,
          location: formData.location,
          skills: formData.skills,
          availability: formData.availability,
          resume_url: formData.resumeUrl,
          ref_code: formData.referralCode,
          job_id: formData.jobId,
        }
      });

      if (response.error) throw response.error;
      
      const result = response.data;
      if (!result.success) throw new Error(result.error);

      setFormData(prev => ({ ...prev, applicationId: result.application_id }));
      return { success: true, id: result.application_id };
    } catch (error) {
      console.error('Error saving to Supabase:', error);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const submitApplication = async (): Promise<{ success: boolean }> => {
    setIsLoading(true);
    try {
      // Use edge function for final submission
      const response = await supabase.functions.invoke('submit-application', {
        body: {
          full_name: formData.fullName,
          phone_number: formData.phone,
          email: formData.email,
          location: formData.location,
          skills: formData.skills,
          availability: formData.availability,
          resume_url: formData.resumeUrl,
          ref_code: formData.referralCode,
          job_id: formData.jobId,
          source: formData.source || 'direct'
        }
      });

      if (response.error) throw response.error;
      
      const result = response.data;
      if (!result.success) throw new Error(result.error);

      // Log referral if exists
      if (formData.referralCode && formData.jobId) {
        await supabase.functions.invoke('log-referral', {
          body: {
            referral_code: formData.referralCode,
            job_id: formData.jobId,
            application_id: result.application_id
          }
        });
      }

      setFormData(prev => ({ ...prev, isSubmitted: true, applicationId: result.application_id }));
      return { success: true };
    } catch (error) {
      console.error('Error submitting application:', error);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const canAccessStep = (step: number): boolean => {
    if (step === 1) return true;
    if (step === 2) return !!formData.fullName && !!formData.phone && !!formData.location;
    if (step === 3) return !!formData.skills && !!formData.availability;
    if (step === 4) return true; // Resume step is optional, anyone who completed step 2 can access
    if (step === 5) return !!formData.fullName && !!formData.phone; // Review requires basic info
    return false;
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <ApplicationFormContext.Provider value={{
    formData,
    updateFormData,
    setJobContext,
    saveToSupabase,
    submitApplication,
    canAccessStep,
    resetForm,
    isLoading,
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