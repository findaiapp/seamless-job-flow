import { useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const useReferralTracking = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    const trackReferral = async () => {
      const ref = searchParams.get('ref');
      if (!ref) return;

      try {
        // Store referral in localStorage for later use
        localStorage.setItem('referral_code', ref);
        
        // Mock referral tracking
        console.log('Referral tracked:', ref, 'on page:', location.pathname);
      } catch (error) {
        console.error('Error tracking referral:', error);
      }
    };

    trackReferral();
  }, [searchParams, location.pathname]);

  return {
    getReferralCode: () => localStorage.getItem('referral_code')
  };
};