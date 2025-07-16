import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface FakeJob {
  id: string;
  title: string;
  company: string;
  location: string;
  pay_range: string;
  description: string;
  job_type: string;
  category: string;
  is_verified: boolean;
  is_hot: boolean;
  is_featured: boolean;
  created_at: string;
  jobTags?: string[];
}

export function useFakePaginationLogic() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(87); // Fixed total to create illusion
  const [jobs, setJobs] = useState<FakeJob[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize page from URL
  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    }
  }, [searchParams, totalPages]);

  const fetchFakeJobsByPage = useCallback(async (pageNumber: number) => {
    setLoading(true);
    
    try {
      // Calculate offset with some randomization to create variety
      const baseOffset = (pageNumber - 1) * 12;
      const randomOffset = Math.floor(Math.random() * 5); // Add 0-4 random offset
      const offset = baseOffset + randomOffset;
      
      const { data, error } = await supabase
        .from('fake_jobs')
        .select('*')
        .range(offset, offset + 11) // Get 12 jobs per page
        .order('created_at', { ascending: false });

      if (error) throw error;

      // If we don't have enough jobs, loop back to start
      if (!data || data.length < 12) {
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('fake_jobs')
          .select('*')
          .range(0, 11)
          .order('created_at', { ascending: false });

        if (fallbackError) throw fallbackError;
        
        const combinedData = [...(data || []), ...(fallbackData || [])].slice(0, 12);
        setJobs(shuffleArray(combinedData) as FakeJob[]);
      } else {
        // Randomize order slightly to create variation
        setJobs(shuffleArray(data) as FakeJob[]);
      }

      // Add "Just Posted" tags to 1-2 random jobs
      setJobs(prev => prev.map((job, index) => ({
        ...job,
        is_hot: Math.random() > 0.8 && index < 2, // Mark first 2 jobs as potentially "just posted"
        jobTags: Math.random() > 0.8 && index < 2 ? ['🆕 Just Posted'] : job.jobTags || []
      })));

      // Track user activity
      trackPaginationActivity(pageNumber);
      
    } catch (error) {
      console.error('Error fetching fake jobs:', error);
      // Fallback to generating some basic jobs
      setJobs(generateFallbackJobs(pageNumber));
    } finally {
      setLoading(false);
    }
  }, []);

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const generateFallbackJobs = (pageNumber: number): FakeJob[] => {
    const jobTitles = [
      'Delivery Driver', 'Warehouse Associate', 'Customer Service Rep',
      'Retail Associate', 'Food Service Worker', 'Administrative Assistant',
      'Cleaning Specialist', 'Security Guard', 'Data Entry Clerk'
    ];
    
    const companies = [
      'QuickHire Solutions', 'Metro Staffing', 'NYC Jobs Plus',
      'Rapid Employment', 'City Workers United', 'Express Hiring'
    ];

    return Array.from({ length: 12 }, (_, index) => ({
      id: `fake_${pageNumber}_${index}`,
      title: jobTitles[index % jobTitles.length],
      company: companies[index % companies.length],
      location: `New York, NY`,
      pay_range: `$${15 + index}/${Math.random() > 0.5 ? 'hr' : 'hr'}`,
      description: `Great opportunity for ${jobTitles[index % jobTitles.length].toLowerCase()}. Immediate start available.`,
      job_type: Math.random() > 0.5 ? 'full-time' : 'part-time',
      category: 'general',
      is_verified: Math.random() > 0.6,
      is_hot: Math.random() > 0.7,
      is_featured: Math.random() > 0.8,
      created_at: new Date().toISOString(),
      jobTags: index < 2 && Math.random() > 0.8 ? ['🆕 Just Posted'] : []
    }));
  };

  const trackPaginationActivity = async (pageNumber: number) => {
    try {
      // Activity tracking will be added later
      console.log('Page navigation to:', pageNumber);
    } catch (error) {
      console.error('Error tracking pagination activity:', error);
    }
  };

  const goToNextPage = useCallback(() => {
    const nextPage = currentPage >= totalPages ? 1 : currentPage + 1;
    setCurrentPage(nextPage);
    setSearchParams({ page: nextPage.toString() });
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    fetchFakeJobsByPage(nextPage);
  }, [currentPage, totalPages, setSearchParams, fetchFakeJobsByPage]);

  const goToPreviousPage = useCallback(() => {
    const prevPage = currentPage <= 1 ? totalPages : currentPage - 1;
    setCurrentPage(prevPage);
    setSearchParams({ page: prevPage.toString() });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchFakeJobsByPage(prevPage);
  }, [currentPage, totalPages, setSearchParams, fetchFakeJobsByPage]);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
    setSearchParams({});
    fetchFakeJobsByPage(1);
  }, [setSearchParams, fetchFakeJobsByPage]);

  // Load initial page
  useEffect(() => {
    fetchFakeJobsByPage(currentPage);
  }, []);

  return {
    currentPage,
    totalPages,
    jobs,
    loading,
    goToNextPage,
    goToPreviousPage,
    resetPagination,
    fetchFakeJobsByPage
  };
}