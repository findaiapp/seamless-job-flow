import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ApplicationFormData {
  // Step 1: Personal Info
  fullName: string;
  email: string;
  phone: string;
  
  // Step 2: Preferences
  jobType: string;
  schedule: string;
  availability: string;
  
  // Step 3: Location
  city: string;
  neighborhood: string;
  
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
  email: '',
  phone: '',
  jobType: '',
  schedule: '',
  availability: '',
  city: '',
  neighborhood: '',
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
        .eq('status', 'in_progress')
        .order('created_at', { ascending: false })
        .limit(1);

      if (!error && applications && applications.length > 0) {
        const app = applications[0];
        setFormData({
          fullName: app.name || '',
          email: app.email || '',
          phone: app.phone || '',
          jobType: app.role || '',
          schedule: app.availability?.split(' - ')[0] || '',
          availability: app.availability?.split(' - ')[1] || '',
          city: app.location?.split(', ')[0] || '',
          neighborhood: app.location?.split(', ')[1] || '',
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
    if (!app.name || !app.email || !app.phone) return 1;
    if (!app.role || !app.availability) return 2;
    if (!app.location) return 3;
    return 4;
  };

  const updateFormData = (data: Partial<ApplicationFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const saveToSupabase = async (): Promise<{ success: boolean; id?: string }> => {
    setIsLoading(true);
    try {
      const applicationData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: formData.jobType,
        availability: formData.schedule && formData.availability ? 
          `${formData.schedule} - ${formData.availability}` : '',
        location: formData.neighborhood ? 
          `${formData.city}, ${formData.neighborhood}` : formData.city,
        status: 'in_progress',
        company_name: 'TBD',
        job_title: 'TBD',
        job_id: formData.applicationId ? undefined : 'temp-' + Date.now(),
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
      if (!formData.applicationId) {
        const saveResult = await saveToSupabase();
        if (!saveResult.success) return { success: false };
      }

      const { error } = await supabase
        .from('applications')
        .update({
          status: 'submitted',
          submitted_at: new Date().toISOString(),
        })
        .eq('id', formData.applicationId);

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
    const { fullName, email, phone, jobType, schedule, availability, city } = formData;
    
    switch (step) {
      case 1:
        return true;
      case 2:
        return !!(fullName && email && phone);
      case 3:
        return !!(fullName && email && phone && jobType && schedule && availability);
      case 4:
        return !!(fullName && email && phone && jobType && schedule && availability && city);
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