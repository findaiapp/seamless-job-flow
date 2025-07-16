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
        
        // Track the referral event - using correct schema from referral_tracking table
        await supabase.from('referral_tracking').insert({
          referral_code: ref,
          referral_type: 'page_visit',
          referrer_id: '00000000-0000-0000-0000-000000000000', // placeholder for anonymous
          referred_id: '00000000-0000-0000-0000-000000000000' // placeholder for anonymous
        });

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