// Updated fake pagination logic hook - no database calls
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

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
      pay_range: `$${15 + index}/hr`,
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

  const fetchFakeJobsByPage = useCallback(async (pageNumber: number) => {
    setLoading(true);
    
    try {
      // For now, just use generated jobs
      const newJobs = generateFallbackJobs(pageNumber);
      
      // Add "Just Posted" tags to 1-2 random jobs
      const jobsWithTags = newJobs.map((job, index) => ({
        ...job,
        is_hot: Math.random() > 0.8 && index < 2,
        jobTags: Math.random() > 0.8 && index < 2 ? ['🆕 Just Posted'] : job.jobTags || []
      }));
      
      setJobs(jobsWithTags);
      
    } catch (error) {
      console.error('Error fetching fake jobs:', error);
      setJobs(generateFallbackJobs(pageNumber));
    } finally {
      setLoading(false);
    }
  }, []);

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