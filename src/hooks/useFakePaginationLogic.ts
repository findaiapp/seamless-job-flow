import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

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

  const generatePayRange = () => {
    const ranges = ['$15-18/hr', '$16-20/hr', '$18-22/hr', '$20-25/hr', '$22-28/hr', '$25-30/hr'];
    return ranges[Math.floor(Math.random() * ranges.length)];
  };

  const loadJobs = useCallback(async (page: number, append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    try {
      const from = (page - 1) * JOBS_PER_BATCH;
      const to = from + JOBS_PER_BATCH - 1;

      // Get total count first
      const { count } = await supabase
        .from('user_posted_jobs')
        .select('*', { count: 'exact', head: true });

      let query = supabase
        .from('user_posted_jobs')
        .select('*')
        .range(from, to)
        .order('created_at', { ascending: false });

      const { data, error } = await query;
      
      if (error) throw error;

      // Transform Supabase data to Job interface
      const transformedJobs: Job[] = (data || []).map(item => ({
        id: item.id,
        title: item.job_title || 'Unknown Position',
        company: item.company || 'Unknown Company',
        location: item.location || 'Remote',
        salary_min: item.salary_min,
        salary_max: item.salary_max,
        pay_range: generatePayRange(),
        description: item.description || 'No description available',
        job_type: item.type || null,
        category: null,
        is_verified: !!item.contact_email,
        is_hot: Math.random() > 0.7,
        is_featured: Math.random() > 0.8,
        brand_name: null,
        contact_email: item.contact_email,
        employer_email: item.contact_email,
        job_tags: item.tags || null,
        created_at: item.created_at,
        matchScore: Math.floor(Math.random() * 40) + 60, // 60-100
        matchReasons: ['Experience Match', 'Location Preference', 'Salary Range'].slice(0, Math.floor(Math.random() * 3) + 1),
        urgencyScore: Math.floor(Math.random() * 10) + 1
      }));

      const totalCount = count || 0;
      setTotalJobs(totalCount);

      if (append) {
        setJobs(prev => [...prev, ...transformedJobs]);
      } else {
        setJobs(transformedJobs);
      }
      
      setHasMore(transformedJobs.length === JOBS_PER_BATCH && totalCount > page * JOBS_PER_BATCH);
      
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
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('user_activity').insert({
        user_id: user.id,
        job_id: 'pagination',
        activity_type: action,
        job_title: `Page ${currentPage}`,
        job_category: 'pagination',
        job_type: action,
        pay_range: metadata?.totalJobs ? `${metadata.totalJobs} jobs` : '',
        location: metadata?.location || ''
      });
    } catch (error) {
      console.error('Error tracking pagination activity:', error);
    }
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