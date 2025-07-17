import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ApplicationFormData {
  // Step 1: Personal Info
  fullName: string;
  phone: string;
  location: string;

  // Step 2: Skills & Availability
  skills: string;
  availability: string;
  resumeUrl: string;

  // Step 3: Referral Info
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
  saveToSupabase: () => Promise<{ success: boolean; id?: string }>;
  submitApplication: () => Promise<{ success: boolean }>;
  canAccessStep: (step: number) => boolean;
  resetForm: () => void;
  isLoading: boolean;
}

const initialFormData: ApplicationFormData = {
  fullName: '',
  phone: '',
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
    if (!app.source) return 3;
    return 4;
  };

  const updateFormData = (data: Partial<ApplicationFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const saveToSupabase = async (): Promise<{ success: boolean; id?: string }> => {
    setIsLoading(true);
    try {
      const applicationData = {
        full_name: formData.fullName,
        phone: formData.phone,
        location: formData.location,
        skills: formData.skills,
        availability: formData.availability,
        resume_url: formData.resumeUrl,
        referral_code: formData.referralCode,
        source: formData.source,
        updated_at: new Date().toISOString(),
      };

      if (formData.applicationId) {
        // Update existing application
        const { data, error } = await supabase
          .from('applications')
          .update(applicationData)
          .eq('id', formData.applicationId)
          .select()
          .single();

        if (error) throw error;
        return { success: true, id: data.id };
      } else {
        // Create new application
        const { data, error } = await supabase
          .from('applications')
          .insert([applicationData])
          .select()
          .single();

        if (error) throw error;
        
        setFormData(prev => ({ ...prev, applicationId: data.id }));
        return { success: true, id: data.id };
      }
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
      // First save all current data
      const saveResult = await saveToSupabase();
      if (!saveResult.success) return { success: false };

      // Mark as submitted
      const { error } = await supabase
        .from('applications')
        .update({
          submitted_at: new Date().toISOString(),
        })
        .eq('id', formData.applicationId || saveResult.id);

      if (error) throw error;

      setFormData(prev => ({ ...prev, isSubmitted: true }));
      return { success: true };
    } catch (error) {
      console.error('Error submitting application:', error);
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  const canAccessStep = (step: number): boolean => {
    const { fullName, phone, location, skills, availability, source } = formData;
    
    switch (step) {
      case 1:
        return true;
      case 2:
        return !!(fullName && phone && location);
      case 3:
        return !!(fullName && phone && location && skills && availability);
      case 4:
        return !!(fullName && phone && location && skills && availability && source);
      case 5:
        return formData.isSubmitted;
      default:
        return false;
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <ApplicationFormContext.Provider value={{
      formData,
      updateFormData,
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