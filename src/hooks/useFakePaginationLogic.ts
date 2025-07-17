import { useState, useEffect, useCallback } from 'react';

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary_min: number | null;
  salary_max: number | null;
  pay_range: string;
  description: string;
  job_type: string | null;
  category: string | null;
  is_verified: boolean | null;
  is_hot: boolean | null;
  is_featured: boolean | null;
  brand_name: string | null;
  contact_email?: string | null;
  employer_email?: string | null;
  job_tags?: string[] | null;
  created_at: string;
  matchScore?: number;
  matchReasons?: string[];
  urgencyScore?: number;
}

interface UseFakePaginationLogicReturn {
  jobs: Job[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  currentPage: number;
  totalJobs: number;
  loadNextPage: () => Promise<void>;
  resetPagination: () => void;
  trackPaginationActivity: (action: string, metadata?: any) => Promise<void>;
}

const JOBS_PER_BATCH = 12;

export function useFakePaginationLogic(): UseFakePaginationLogicReturn {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  const generateMockJobs = (page: number): Job[] => {
    const mockJobs: Job[] = [];
    const jobTitles = ['Delivery Driver', 'Warehouse Associate', 'Security Guard', 'Kitchen Helper', 'Cashier', 'Customer Service'];
    const companies = ['QuickDelivery Inc', 'StorageCorp', 'SecureGuard LLC', 'FoodService Co', 'RetailMax', 'ServicePro'];
    const locations = ['Brooklyn, NY', 'Queens, NY', 'Manhattan, NY', 'Bronx, NY', 'Newark, NJ', 'Jersey City, NJ'];

    for (let i = 0; i < JOBS_PER_BATCH; i++) {
      const jobIndex = (page - 1) * JOBS_PER_BATCH + i;
      const titleIndex = jobIndex % jobTitles.length;
      const companyIndex = jobIndex % companies.length;
      const locationIndex = jobIndex % locations.length;

      mockJobs.push({
        id: `job-${jobIndex + 1}`,
        title: jobTitles[titleIndex],
        company: companies[companyIndex],
        location: locations[locationIndex],
        salary_min: 15 + Math.floor(Math.random() * 10),
        salary_max: 20 + Math.floor(Math.random() * 15),
        pay_range: `$${15 + Math.floor(Math.random() * 5)}-${20 + Math.floor(Math.random() * 10)}/hr`,
        description: `Exciting opportunity for a ${jobTitles[titleIndex]} position with competitive pay and benefits.`,
        job_type: 'Full-time',
        category: 'General',
        is_verified: Math.random() > 0.3,
        is_hot: Math.random() > 0.7,
        is_featured: Math.random() > 0.8,
        brand_name: null,
        contact_email: `hr@${companies[companyIndex].toLowerCase().replace(/\s+/g, '')}.com`,
        employer_email: `hr@${companies[companyIndex].toLowerCase().replace(/\s+/g, '')}.com`,
        job_tags: ['Entry Level', 'Benefits', 'Flexible Schedule'].slice(0, Math.floor(Math.random() * 3) + 1),
        created_at: new Date().toISOString(),
        matchScore: Math.floor(Math.random() * 40) + 60,
        matchReasons: ['Experience Match', 'Location Preference', 'Salary Range'].slice(0, Math.floor(Math.random() * 3) + 1),
        urgencyScore: Math.floor(Math.random() * 10) + 1
      });
    }

    return mockJobs;
  };

  const loadJobs = useCallback(async (page: number, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockJobs = generateMockJobs(page);
      const totalCount = 100; // Mock total count

      setTotalJobs(totalCount);

      if (append) {
        setJobs(prev => [...prev, ...mockJobs]);
      } else {
        setJobs(mockJobs);
      }
      
      setHasMore(totalCount > page * JOBS_PER_BATCH);
      
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  const loadNextPage = useCallback(async () => {
    if (!hasMore || loadingMore) return;
    
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    await loadJobs(nextPage, true);
  }, [currentPage, hasMore, loadingMore, loadJobs]);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
    setJobs([]);
    setHasMore(true);
    loadJobs(1, false);
  }, [loadJobs]);

  const trackPaginationActivity = useCallback(async (action: string, metadata?: any) => {
    // Mock tracking function - no Supabase dependency
    console.log('Tracking pagination activity:', action, metadata);
  }, [currentPage]);

  // Load initial jobs
  useEffect(() => {
    loadJobs(1, false);
  }, []);

  return {
    jobs,
    loading,
    loadingMore,
    hasMore,
    currentPage,
    totalJobs,
    loadNextPage,
    resetPagination,
    trackPaginationActivity
  };
}