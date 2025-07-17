import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface CraigslistTrackingData {
  job_id?: string;
  city?: string;
  variant?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  ip_address?: string;
  user_agent?: string;
}

interface UseCraigslistTrackerReturn {
  trackingData: CraigslistTrackingData | null;
  isCraigslistUser: boolean;
  trackApplication: (job_id: string) => Promise<boolean>;
  clearTrackingData: () => void;
  isTracking: boolean;
}

const STORAGE_KEY = 'craigslist_tracking_data';

export const useCraigslistTracker = (): UseCraigslistTrackerReturn => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { toast } = useToast();
  
  const [trackingData, setTrackingData] = useState<CraigslistTrackingData | null>(null);
  const [isCraigslistUser, setIsCraigslistUser] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  // Load tracking data from sessionStorage on mount
  useEffect(() => {
    const loadStoredData = () => {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const data = JSON.parse(stored);
          setTrackingData(data);
          setIsCraigslistUser(true);
        }
      } catch (error) {
        console.error('Error loading stored tracking data:', error);
      }
    };

    loadStoredData();
  }, []);

  // Parse and store UTM parameters when URL changes
  useEffect(() => {
    const parseAndStoreParams = () => {
      const utmSource = searchParams.get('utm_source');
      const utmMedium = searchParams.get('utm_medium');
      const utmCampaign = searchParams.get('utm_campaign');
      const city = searchParams.get('city');
      const variant = searchParams.get('variant');
      const ref = searchParams.get('ref');

      // Check if this looks like a Craigslist referral
      const isCraigslistSource = utmSource === 'craigslist' || 
                                utmCampaign === 'craigslist' ||
                                ref === 'craigslist' ||
                                (city && variant); // Craigslist often passes city and variant

      if (isCraigslistSource) {
        const newTrackingData: CraigslistTrackingData = {
          city: city || undefined,
          variant: variant || undefined,
          utm_source: utmSource || 'craigslist',
          utm_medium: utmMedium || undefined,
          utm_campaign: utmCampaign || 'craigslist',
          user_agent: navigator.userAgent,
        };

        // Store in sessionStorage
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newTrackingData));
          setTrackingData(newTrackingData);
          setIsCraigslistUser(true);
          
          console.log('📊 Craigslist tracking initialized:', newTrackingData);
        } catch (error) {
          console.error('Error storing tracking data:', error);
        }
      }
    };

    parseAndStoreParams();
  }, [searchParams, location.pathname]);

  // Track application submission
  const trackApplication = useCallback(async (job_id: string): Promise<boolean> => {
    if (!isCraigslistUser || !trackingData) {
      console.log('📊 Not a Craigslist user, skipping tracking');
      return false;
    }

    setIsTracking(true);
    
    try {
      const applicationData = {
        ...trackingData,
        job_id,
        submitted_at: new Date().toISOString(),
      };

      console.log('📊 Tracking Craigslist application:', applicationData);

      const { data, error } = await supabase
        .from('craigslist_applications')
        .insert([applicationData])
        .select()
        .single();

      if (error) {
        console.error('❌ Error tracking Craigslist application:', error);
        toast({
          title: "Tracking Error",
          description: "Failed to log application data (non-critical)",
          variant: "destructive",
        });
        return false;
      }

      console.log('✅ Craigslist application tracked successfully:', data);
      
      // Clear tracking data after successful submission
      clearTrackingData();
      
      return true;
    } catch (error) {
      console.error('❌ Unexpected error tracking application:', error);
      return false;
    } finally {
      setIsTracking(false);
    }
  }, [trackingData, isCraigslistUser, toast]);

  // Clear tracking data
  const clearTrackingData = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
      setTrackingData(null);
      setIsCraigslistUser(false);
      console.log('📊 Tracking data cleared');
    } catch (error) {
      console.error('Error clearing tracking data:', error);
    }
  }, []);

  return {
    trackingData,
    isCraigslistUser,
    trackApplication,
    clearTrackingData,
    isTracking,
  };
};