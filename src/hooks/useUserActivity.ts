import { useCallback } from 'react';

interface UseUserActivityReturn {
  trackActivity: (job: any, activityType: string, metadata?: any) => Promise<void>;
  getJobsYoullLove: () => Promise<any[]>;
}

export function useUserActivity(): UseUserActivityReturn {
  const trackActivity = useCallback(async (job: any, activityType: string, metadata?: any) => {
    // Mock tracking function
    console.log('Tracking activity:', { job: job.id, activityType, metadata });
  }, []);

  const getJobsYoullLove = useCallback(async (): Promise<any[]> => {
    // Mock recommended jobs
    const mockJobs = [
      {
        id: '1',
        job_title: 'Delivery Driver',
        company: 'QuickDelivery Inc',
        location: 'Brooklyn, NY',
        salary_min: 18,
        salary_max: 22,
        description: 'Fast-paced delivery driver position',
        type: 'Full-time',
        contact_email: 'hr@quickdelivery.com',
        tags: ['Entry Level', 'Benefits'],
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        job_title: 'Warehouse Associate',
        company: 'StorageCorp',
        location: 'Queens, NY',
        salary_min: 16,
        salary_max: 20,
        description: 'Warehouse operations position',
        type: 'Full-time',
        contact_email: 'hr@storagecorp.com',
        tags: ['Physical', 'Benefits'],
        created_at: new Date().toISOString()
      }
    ];
    
    return mockJobs;
  }, []);

  return {
    trackActivity,
    getJobsYoullLove
  };
}