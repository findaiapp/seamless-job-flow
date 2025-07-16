// 🧠 Smart Paginated Jobs Hook - Indeed-inspired with dopamine boosts
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface SmartJob {
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

export function useSmartPaginatedJobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(87); // Fixed total for stable pagination
  const [jobs, setJobs] = useState<SmartJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalJobCount] = useState(1027); // Static total for UI display

  // Initialize page from URL
  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      } else {
        // Reset invalid pages to page 1
        setCurrentPage(1);
        setSearchParams({ page: '1' });
      }
    }
  }, [searchParams, totalPages, setSearchParams]);

  const generateSmartJobs = (pageNumber: number): SmartJob[] => {
    const jobTitles = [
      'Senior Software Engineer', 'Product Manager', 'UX Designer',
      'Data Scientist', 'Marketing Specialist', 'Sales Representative',
      'Customer Success Manager', 'DevOps Engineer', 'Business Analyst',
      'Content Writer', 'Graphic Designer', 'HR Coordinator'
    ];
    
    const companies = [
      'TechCorp Inc', 'InnovateLabs', 'FutureWorks', 'DataDriven Co',
      'CreativeEdge', 'ScaleUp Solutions', 'NextGen Systems', 'CloudFirst',
      'AI Innovations', 'GrowthHackers', 'DesignStudio', 'StartupBoost'
    ];

    const locations = [
      'New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA',
      'Boston, MA', 'Chicago, IL', 'Los Angeles, CA', 'Denver, CO'
    ];

    // Use page number as seed for consistent but varied results per page
    const seed = pageNumber * 12;
    
    return Array.from({ length: 12 }, (_, index) => {
      const jobIndex = (seed + index) % jobTitles.length;
      const companyIndex = (seed + index + 3) % companies.length;
      const locationIndex = (seed + index + 7) % locations.length;
      
      return {
        id: `smart_${pageNumber}_${index}`,
        title: jobTitles[jobIndex],
        company: companies[companyIndex],
        location: locations[locationIndex],
        pay_range: `$${60 + (index * 5) + (pageNumber % 10)}k - $${80 + (index * 8) + (pageNumber % 15)}k`,
        description: `Exciting opportunity for a ${jobTitles[jobIndex].toLowerCase()} at ${companies[companyIndex]}. Join our dynamic team and make an impact!`,
        job_type: index % 3 === 0 ? 'full-time' : index % 3 === 1 ? 'part-time' : 'contract',
        category: 'tech',
        is_verified: (seed + index) % 3 === 0,
        is_hot: (seed + index) % 7 === 0,
        is_featured: (seed + index) % 5 === 0,
        created_at: new Date(Date.now() - (index * 60000)).toISOString(),
        jobTags: []
      };
    });
  };

  const addSmartJobTags = (jobs: SmartJob[]): SmartJob[] => {
    return jobs.map((job, index) => {
      const tags: string[] = [];
      
      // Add 🆕 Just Posted to 1-2 jobs per page (deterministic based on page)
      if (index === 0 || (index === 3 && currentPage % 2 === 0)) {
        tags.push('🆕 Just Posted');
      }
      
      // Add 🔥 Hot Badge to different jobs
      if (index === 1 || (index === 5 && currentPage % 3 === 0)) {
        tags.push('🔥 Hot');
        job.is_hot = true;
      }
      
      // Add occasional featured badge
      if (index === 2 && currentPage % 4 === 0) {
        tags.push('⭐ Featured');
        job.is_featured = true;
      }
      
      return { ...job, jobTags: tags };
    });
  };

  const fetchSmartJobsByPage = useCallback(async (pageNumber: number) => {
    setLoading(true);
    
    try {
      // Simulate API delay for realistic feel
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Generate smart jobs for this page
      const newJobs = generateSmartJobs(pageNumber);
      
      // Add engaging tags to make each page feel special
      const jobsWithTags = addSmartJobTags(newJobs);
      
      setJobs(jobsWithTags);
      
    } catch (error) {
      console.error('Error fetching smart jobs:', error);
      setJobs(generateSmartJobs(pageNumber));
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    const nextPage = currentPage >= totalPages ? 1 : currentPage + 1;
    setCurrentPage(nextPage);
    setSearchParams({ page: nextPage.toString() });
    
    // Smooth scroll to top with dopamine boost
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    fetchSmartJobsByPage(nextPage);
  }, [currentPage, totalPages, setSearchParams, fetchSmartJobsByPage]);

  const goToPreviousPage = useCallback(() => {
    const prevPage = currentPage <= 1 ? totalPages : currentPage - 1;
    setCurrentPage(prevPage);
    setSearchParams({ page: prevPage.toString() });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchSmartJobsByPage(prevPage);
  }, [currentPage, totalPages, setSearchParams, fetchSmartJobsByPage]);

  const goToPage = useCallback((pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setSearchParams({ page: pageNumber.toString() });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      fetchSmartJobsByPage(pageNumber);
    }
  }, [totalPages, setSearchParams, fetchSmartJobsByPage]);

  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1);
    setSearchParams({});
    fetchSmartJobsByPage(1);
  }, [setSearchParams, fetchSmartJobsByPage]);

  // Load initial page
  useEffect(() => {
    fetchSmartJobsByPage(currentPage);
  }, []);

  return {
    currentPage,
    totalPages,
    totalJobCount,
    jobs,
    loading,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    resetToFirstPage,
    // Computed values for UI
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
    startJobNumber: (currentPage - 1) * 12 + 1,
    endJobNumber: Math.min(currentPage * 12, totalJobCount)
  };
}