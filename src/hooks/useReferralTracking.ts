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

      // Extract job_id from path if on apply page
      const pathMatch = location.pathname.match(/\/apply\/([^/]+)/);
      const jobId = pathMatch ? pathMatch[1] : 'unknown';
      
      // Extract city from search params
      const city = searchParams.get('city') || 'unknown';

      try {
        // Store referral data in sessionStorage for attribution
        const referralData = {
          referral_code: ref,
          job_id: jobId,
          city: city,
          clicked_at: new Date().toISOString()
        };
        sessionStorage.setItem('referral_data', JSON.stringify(referralData));
        
        // Track the click in Supabase
        await supabase.from('referral_clicks').insert({
          referral_code: ref,
          job_id: jobId,
          city: city,
          ip_address: null, // Could be captured server-side if needed
          user_agent: navigator.userAgent
        });

        console.log('Referral click tracked:', ref, 'for job:', jobId, 'in city:', city);
      } catch (error) {
        console.error('Error tracking referral click:', error);
      }
    };

    trackReferral();
  }, [searchParams, location.pathname]);

  const getReferralData = () => {
    const stored = sessionStorage.getItem('referral_data');
    return stored ? JSON.parse(stored) : null;
  };

  const trackAttribution = async (applicationId: string) => {
    const referralData = getReferralData();
    if (!referralData) return null;

    try {
      const attribution = await supabase.from('referral_attributions').insert({
        referral_code: referralData.referral_code,
        application_id: applicationId,
        job_id: referralData.job_id,
        city: referralData.city
      }).select().single();

      // Clear referral data after successful attribution
      sessionStorage.removeItem('referral_data');
      
      console.log('Referral attribution tracked:', attribution.data);
      return attribution.data;
    } catch (error) {
      console.error('Error tracking referral attribution:', error);
      return null;
    }
  };

  return {
    getReferralCode: () => {
      const data = getReferralData();
      return data?.referral_code || null;
    },
    getReferralData,
    trackAttribution
  };
};