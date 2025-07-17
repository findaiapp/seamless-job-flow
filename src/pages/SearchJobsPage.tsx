import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, DollarSign, Clock, Zap, Heart, ArrowLeft, Filter, Bell, Mail, ChevronDown, X, Users, Shield, AlertTriangle, Bookmark, Flame, Settings, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useReferralTracking } from "@/hooks/useReferralTracking";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocationDetection } from "@/hooks/useLocationDetection";
import { JobsYoullLove } from "@/components/JobsYoullLove";
import { InfiniteJobFeed } from "@/components/InfiniteJobFeed";
import SignupCTA from "@/components/SignupCTA";
import { SmartAlertsModal } from "@/components/SmartAlertsModal";
import { User } from "@supabase/supabase-js";
import { seedJobDatabase } from "@/utils/seedDatabase";

interface JobEnhancement {
  jobId: string;
  applicantCount: number;
  todayApplicants: number;
  applicantText: string;
  smartTags: string[];
  timestamp: string;
}

interface Job {
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

const NYC_BOROUGHS = [
  { value: "all", label: "All NYC" },
  { value: "Manhattan", label: "Manhattan" },
  { value: "Brooklyn", label: "Brooklyn" },
  { value: "Queens", label: "Queens" },
  { value: "Bronx", label: "Bronx" },
  { value: "Staten Island", label: "Staten Island" },
];

const QUICK_FILTERS = [
  { key: "highPay", label: "$20+/hr", icon: DollarSign },
  { key: "quickStart", label: "Quick Start", icon: Zap },
  { key: "noInterview", label: "No Interview", icon: Clock },
  { key: "safeScore", label: "Safe Score", icon: Shield },
];

const JOBS_PER_PAGE = 25;

export default function SearchJobsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getReferralCode } = useReferralTracking();
  const { location, isDetecting, detectLocation, saveUserLocation, getPopularCategoryForLocation } = useLocationDetection();
  // Use the new Smart Pagination Feed instead of old pagination
  const handleJobClick = (jobId: string) => {
    navigate(`/apply/${jobId}?ref=search`);
    window.scrollTo(0, 0);
  };
  const [user, setUser] = useState<User | null>(null);
  const { isJobSaved, toggleSavedJob, getSavedJobsCount } = useSavedJobs(user);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBorough, setSelectedBorough] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showSmartAlertsModal, setShowSmartAlertsModal] = useState(false);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertPhone, setAlertPhone] = useState("");
  const [alertCity, setAlertCity] = useState("");
  const [alertJobType, setAlertJobType] = useState("");
  const [submittingAlert, setSubmittingAlert] = useState(false);
  const [stickyJobId, setStickyJobId] = useState<string | null>(null);
  const [visibleJobs, setVisibleJobs] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [jobEnhancements, setJobEnhancements] = useState<{[key: string]: JobEnhancement}>({});
  const [enhancingJobs, setEnhancingJobs] = useState<{[key: string]: boolean}>({});
  const [seeding, setSeeding] = useState(false);
  const [scrolledPastJobs, setScrolledPastJobs] = useState(0);
  const [showJobAlertNudge, setShowJobAlertNudge] = useState(false);
  const [showOnlyReal, setShowOnlyReal] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState<string | null>(null);
  const [isSmartSearching, setIsSmartSearching] = useState(false);
  const [seoTitle, setSeoTitle] = useState("Jobs in New York You Can Start This Week");
  const [seoDescription, setSeoDescription] = useState("Find jobs in New York starting immediately. Apply online and get hired fast. New listings daily.");
  const [lastGPTQuery, setLastGPTQuery] = useState("");
  
  const [activeFilters, setActiveFilters] = useState({
    highPay: false,
    noInterview: false,
    quickStart: false,
    safeScore: false,
  });

  const [advancedFilters, setAdvancedFilters] = useState({
    payRange: [10, 50],
    startDate: "",
    hours: "",
    safeScore: false,
    newListings: false,
  });

  const isMobile = useIsMobile();

  // Auto-detect location and set smart defaults on load
  useEffect(() => {
    const initializeLocation = async () => {
      const savedLocation = localStorage.getItem('preferred_location');
      if (!savedLocation || savedLocation === 'all') {
        if (location.detected) {
          setSelectedBorough(location.borough);
        } else {
          await detectLocation();
        }
      } else {
        setSelectedBorough(savedLocation);
      }
    };
    
    initializeLocation();
  }, [location.detected]);

  // Set smart defaults for new users
  useEffect(() => {
    if (location.detected && !searchTerm) {
      const popularCategory = getPopularCategoryForLocation(location.borough);
      setSeoTitle(`${popularCategory} Jobs in ${location.city} You Can Start This Week`);
      setSeoDescription(`Find ${popularCategory} jobs in ${location.city} starting immediately. Apply online and get hired fast. New listings daily.`);
    }
  }, [location, searchTerm]);

  // Auto-detect location from localStorage or default
  useEffect(() => {
    const savedLocation = localStorage.getItem('preferred_location');
    if (savedLocation && savedLocation !== location.borough) {
      setSelectedBorough(savedLocation);
    }
  }, []);

  // Get user session
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  // Load initial jobs
  useEffect(() => {
    loadJobs(true);
  }, []);

  // Filter jobs when filters or search changes
  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, selectedBorough, activeFilters]);

  const loadJobs = async (reset = false) => {
    if (reset) {
      setLoading(true);
      setCurrentPage(1);
    } else {
      setLoadingMore(true);
    }
    
    try {
      const page = reset ? 1 : currentPage + 1;
      const from = (page - 1) * JOBS_PER_PAGE;
      const to = from + JOBS_PER_PAGE - 1;
      
      // Mock job data
      const mockJobs: Job[] = [
        {
          id: '1',
          title: 'Delivery Driver',
          company: 'Quick Delivery Co',
          location: 'Brooklyn, NY',
          salary_min: null,
          salary_max: null,
          pay_range: '$18-25/hr',
          description: 'Join our team of delivery drivers and earn competitive pay with flexible hours.',
          job_type: 'delivery',
          category: null,
          is_verified: true,
          is_hot: true,
          is_featured: false,
          brand_name: null,
          contact_email: 'hiring@quickdelivery.com',
          employer_email: 'hiring@quickdelivery.com',
          job_tags: null,
          created_at: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Warehouse Associate',
          company: 'Storage Solutions',
          location: 'Queens, NY',
          salary_min: null,
          salary_max: null,
          pay_range: '$16-22/hr',
          description: 'Looking for reliable warehouse workers for day and night shifts.',
          job_type: 'warehouse',
          category: null,
          is_verified: true,
          is_hot: false,
          is_featured: true,
          brand_name: null,
          contact_email: 'jobs@storage.com',
          employer_email: 'jobs@storage.com',
          job_tags: null,
          created_at: new Date().toISOString(),
        }
      ];

      const totalCount = 25; // Mock total count
      setTotalJobs(totalCount);
      setTotalPages(Math.ceil(totalCount / JOBS_PER_PAGE));

      if (reset) {
        setJobs(mockJobs);
        setCurrentPage(1);
      } else {
        setJobs(prev => [...prev, ...mockJobs]);
        setCurrentPage(page);
      }
      
      setHasMore(mockJobs.length === JOBS_PER_PAGE && totalCount > page * JOBS_PER_PAGE);
      
    } catch (error) {
      console.error('Error loading jobs:', error);
      toast({
        title: "Error loading jobs",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const generatePayRange = () => {
    const ranges = ['$15-18/hr', '$16-20/hr', '$18-22/hr', '$20-25/hr', '$22-28/hr', '$25-30/hr'];
    return ranges[Math.floor(Math.random() * ranges.length)];
  };

  const filterJobs = useCallback(() => {
    let filtered = [...jobs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Location filter
    if (selectedBorough && selectedBorough !== "all") {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(selectedBorough.toLowerCase())
      );
    }

    // Advanced filters
    if (advancedFilters.payRange[0] > 10 || advancedFilters.payRange[1] < 50) {
      filtered = filtered.filter(job => {
        const payMatch = job.pay_range.match(/\$(\d+)/);
        if (payMatch) {
          const pay = parseInt(payMatch[1]);
          return pay >= advancedFilters.payRange[0] && pay <= advancedFilters.payRange[1];
        }
        return true;
      });
    }

    if (advancedFilters.startDate === "ASAP") {
      filtered = filtered.filter(job => job.is_hot);
    }

    if (advancedFilters.hours === "part_time") {
      filtered = filtered.filter(job => job.job_type === "part-time");
    } else if (advancedFilters.hours === "full_time") {
      filtered = filtered.filter(job => job.job_type === "full-time");
    }

    if (advancedFilters.safeScore) {
      filtered = filtered.filter(job => job.is_verified);
    }

    if (advancedFilters.newListings) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      filtered = filtered.filter(job => new Date(job.created_at) > yesterday);
    }

    // Active filters (legacy)
    if (activeFilters.highPay) {
      filtered = filtered.filter(job => 
        job.pay_range.includes('$2') || job.pay_range.includes('$3')
      );
    }

    if (activeFilters.noInterview) {
      filtered = filtered.filter(job => job.is_featured);
    }

    if (activeFilters.quickStart) {
      filtered = filtered.filter(job => job.is_hot);
    }

    if (activeFilters.safeScore) {
      filtered = filtered.filter(job => job.is_verified);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedBorough, activeFilters, advancedFilters]);

  const toggleFilter = (filterKey: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey as keyof typeof prev]
    }));
  };

  const handleLocationChange = (value: string) => {
    setSelectedBorough(value);
    saveUserLocation(location.city, value);
    localStorage.setItem('preferred_location', value);
  };

  const createJobAlert = async (email: string) => {
    try {
      // Mock alert creation
      toast({
        title: "Alert Created! 🎯",
        description: "We'll notify you when new jobs match your criteria.",
      });
    } catch (error) {
      console.error('Error creating job alert:', error);
    }
  };

  const handleJobCardClick = (jobId: string) => {
    navigate(`/apply/${jobId}?ref=search`);
    window.scrollTo(0, 0);
  };

  const openAlertModal = (jobTitle?: string) => {
    if (jobTitle) {
      setAlertJobType(jobTitle);
    }
    setAlertCity(selectedBorough === "all" ? "" : selectedBorough || "");
    setShowAlertModal(true);
  };

  // Intersection Observer for sticky bar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const newVisibleJobs = new Set(visibleJobs);
        
        entries.forEach((entry) => {
          const jobId = entry.target.getAttribute('data-job-id');
          if (jobId) {
            if (entry.isIntersecting) {
              newVisibleJobs.add(jobId);
            } else {
              newVisibleJobs.delete(jobId);
            }
          }
        });
        
        setVisibleJobs(newVisibleJobs);
        
        // Set sticky job to the first visible job
        if (newVisibleJobs.size > 0) {
          setStickyJobId(Array.from(newVisibleJobs)[0]);
        } else {
          setStickyJobId(null);
        }
      },
      { threshold: 0.5 }
    );

    // Observe all job cards
    const jobCards = document.querySelectorAll('[data-job-id]');
    jobCards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredJobs]);

  

  // Infinite scroll setup
  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;
    if (!loadMoreElement) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadJobs(false);
        }
      },
      { threshold: 0.1 }
    );

    observerRef.current.observe(loadMoreElement);

    return () => {
      if (observerRef.current && loadMoreElement) {
        observerRef.current.unobserve(loadMoreElement);
      }
    };
  }, [hasMore, loadingMore]);

  const enhanceJobWithAI = async (job: Job) => {
    if (enhancingJobs[job.id] || jobEnhancements[job.id]) return;
    
    setEnhancingJobs(prev => ({ ...prev, [job.id]: true }));
    
    try {
      const { data, error } = await supabase.functions.invoke('enhance-job-cards', {
        body: {
          jobId: job.id,
          title: job.title,
          description: job.description,
          company: job.company,
          location: job.location
        }
      });

      if (error) throw error;

      setJobEnhancements(prev => ({ 
        ...prev, 
        [job.id]: data 
      }));
    } catch (error) {
      console.error('Error enhancing job:', error);
    } finally {
      setEnhancingJobs(prev => ({ ...prev, [job.id]: false }));
    }
  };

  // Enhance jobs when they're loaded
  useEffect(() => {
    filteredJobs.forEach(job => {
      if (!jobEnhancements[job.id] && !enhancingJobs[job.id]) {
        enhanceJobWithAI(job);
      }
    });
  }, [filteredJobs]);

  const getVerificationStatus = (job: Job) => {
    const hasEmail = !!(job.contact_email || job.employer_email);
    const hasCompany = !!job.company && job.company !== 'Unknown Company';
    const isVerified = job.is_verified && hasEmail && hasCompany;
    
    if (isVerified) {
      return {
        type: 'verified',
        badge: '✅ Verified by Hireloop',
        tooltip: 'Safe to apply – job and employer verified by our team',
        className: 'bg-green-100 text-green-800 border-green-200'
      };
    }
    
    if (!hasEmail || !hasCompany) {
      return {
        type: 'risk',
        badge: '⚠️ Scam Risk: Missing Info',
        tooltip: "We're reviewing this listing for safety — apply with caution.",
        className: 'bg-orange-100 text-orange-800 border-orange-200'
      };
    }
    
    return null;
  };

  const getJobTags = (job: Job) => {
    const enhancement = jobEnhancements[job.id];
    if (enhancement?.smartTags?.length > 0) {
      return enhancement.smartTags;
    }
    
    // Fallback to stored tags or generate basic ones
    if (job.job_tags?.length) {
      return job.job_tags;
    }
    
    const fallbackTags = [];
    if (job.is_featured) fallbackTags.push("No Interview");
    if (job.is_hot) fallbackTags.push("Quick Start");
    if (job.job_type === "part-time") fallbackTags.push("Flexible Hours");
    
    return fallbackTags.slice(0, 3);
  };

  const getApplicantInfo = (job: Job) => {
    const enhancement = jobEnhancements[job.id];
    if (enhancement) {
      return {
        text: enhancement.applicantText,
        count: enhancement.applicantCount,
        icon: Users
      };
    }
    
    // Loading state
    if (enhancingJobs[job.id]) {
      return {
        text: "Loading...",
        count: 0,
        icon: Users
      };
    }
    
    // Generate badge counter for jobs posted within 48h
    const jobDate = new Date(job.created_at);
    const now = new Date();
    const hoursSincePosted = (now.getTime() - jobDate.getTime()) / (1000 * 60 * 60);
    
    if (hoursSincePosted <= 48) {
      const applicantsToday = Math.floor(Math.random() * 100) + 1;
      return {
        text: `${applicantsToday} people applied today`,
        count: applicantsToday,
        icon: Flame
      };
    }
    
    return null;
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(Boolean).length + 
           Object.values(advancedFilters).filter((val, idx) => {
             if (idx === 0) return val[0] !== 10 || val[1] !== 50; // payRange
             return Boolean(val);
           }).length;
  };

  // Track scroll depth for job alert nudge
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = Math.floor(window.scrollY / 200); // Roughly 1 job per 200px
      setScrolledPastJobs(scrolled);
      
      if (scrolled >= 10 && !showJobAlertNudge) {
        setShowJobAlertNudge(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showJobAlertNudge]);

  const handleCardTap = (jobId: string) => {
    if (expandedCard === jobId) {
      setExpandedCard(null);
      setSelectedJobForApply(null);
    } else {
      setExpandedCard(jobId);
      setSelectedJobForApply(jobId);
    }
  };

  const getTestimonial = () => {
    const testimonials = [
      "My last job started in 48hrs!",
      "Got hired same day I applied!",
      "Easy apply, quick response!",
      "Started working next week!",
      "Best job search ever!"
    ];
    return testimonials[Math.floor(Math.random() * testimonials.length)];
  };

  // Smart search with GPT parsing
  const handleSmartSearch = async (query: string) => {
    if (!query.trim() || query === lastGPTQuery) return;
    
    setIsSmartSearching(true);
    setLastGPTQuery(query);
    
    try {
      const { data, error } = await supabase.functions.invoke('smart-filter-parser', {
        body: {
          query,
          userLocation: location.city || "New York"
        }
      });

      if (error) throw error;

      const { filters, seoTitle: newSeoTitle, seoDescription: newSeoDescription } = data;
      
      // Apply parsed filters
      if (filters.location && filters.location !== location.city) {
        const mappedBorough = detectBoroughFromLocation(filters.location);
        setSelectedBorough(mappedBorough);
      }
      
      // Update advanced filters based on GPT parsing
      setAdvancedFilters(prev => ({
        ...prev,
        payRange: [filters.payMin || 10, filters.payMax || 50],
        startDate: filters.startDate || "",
        hours: filters.jobType === "part_time" ? "part_time" : 
               filters.jobType === "full_time" ? "full_time" : "",
        safeScore: filters.experience === "none" // Prioritize safe jobs for inexperienced
      }));

      // Update SEO
      setSeoTitle(newSeoTitle);
      setSeoDescription(newSeoDescription);
      
      // Re-rank jobs with GPT
      await rankJobsWithGPT(query, filters);

      toast({
        title: "Smart search applied! 🧠",
        description: `Found ${filteredJobs.length} jobs matching "${query}"`,
      });

    } catch (error) {
      console.error('Smart search error:', error);
      toast({
        title: "Search applied",
        description: "Using basic keyword search",
        variant: "default",
      });
    } finally {
      setIsSmartSearching(false);
    }
  };

  // GPT-powered job ranking
  const rankJobsWithGPT = async (userQuery: string, filters: any) => {
    try {
      const { data, error } = await supabase.functions.invoke('job-match-ranker', {
        body: {
          jobs: filteredJobs.slice(0, 50), // Limit for cost efficiency
          userQuery,
          filters,
          userLocation: location.city || "New York"
        }
      });

      if (error) throw error;

      const { rankedJobs } = data;
      
      // Update jobs with match scores
      setFilteredJobs(rankedJobs);
      
    } catch (error) {
      console.error('Job ranking error:', error);
      // Continue with basic filtering
    }
  };

  const detectBoroughFromLocation = (locationStr: string): string => {
    const location = locationStr.toLowerCase();
    
    if (location.includes('manhattan') || location.includes('midtown') || 
        location.includes('downtown') || location.includes('harlem') || 
        location.includes('soho') || location.includes('tribeca')) {
      return 'Manhattan';
    }
    if (location.includes('brooklyn') || location.includes('flatbush') || 
        location.includes('williamsburg') || location.includes('park slope')) {
      return 'Brooklyn';
    }
    if (location.includes('queens') || location.includes('astoria') || 
        location.includes('flushing') || location.includes('jackson heights')) {
      return 'Queens';
    }
    if (location.includes('bronx') || location.includes('fordham') || 
        location.includes('concourse')) {
      return 'Bronx';
    }
    if (location.includes('staten island') || location.includes('st. george')) {
      return 'Staten Island';
    }
    
    return 'all';
  };

  // Handle search with debouncing and smart parsing
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    
    // If query looks like natural language (more than 3 words), use smart search
    const wordCount = value.trim().split(' ').length;
    if (wordCount >= 3 && value.length > 15) {
      const timeoutId = setTimeout(() => {
        handleSmartSearch(value);
      }, 1000); // Debounce 1 second
      
      return () => clearTimeout(timeoutId);
    }
  };

  const handleSeedDatabase = async () => {
    setSeeding(true);
    try {
      await seedJobDatabase(1635);
      toast({
        title: "Database seeded!",
        description: "1,635 realistic jobs have been added to the database.",
      });
      // Reload jobs
      loadJobs(true);
    } catch (error) {
      console.error('Error seeding database:', error);
      toast({
        title: "Error",
        description: "Failed to seed database. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSeeding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* SEO Head */}
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        
        {/* Show skeleton header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
          <div className="flex items-center gap-3 p-4">
            <div className="w-8 h-8 bg-muted rounded animate-pulse"></div>
            <div className="flex-1 h-10 bg-muted rounded animate-pulse"></div>
            <div className="w-10 h-10 bg-muted rounded animate-pulse"></div>
          </div>
        </header>
        
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <div className="text-lg">Loading jobs...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Head */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      
      {/* Sticky Mobile-First Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex-1 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              {isSmartSearching && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                </div>
              )}
              <Input
                placeholder="Try: 'childcare jobs in Brooklyn under $20/hr'"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10 pr-12 h-10"
              />
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 relative"
          >
            <Filter className="h-4 w-4" />
            {getActiveFilterCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {getActiveFilterCount()}
              </span>
            )}
          </Button>
        </div>

        {/* Location Selector with Auto-Detection */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2">
            <Select value={selectedBorough} onValueChange={handleLocationChange}>
              <SelectTrigger className="flex-1">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <SelectValue placeholder="Select location..." />
                </div>
              </SelectTrigger>
              <SelectContent>
                {NYC_BOROUGHS.map((borough) => (
                  <SelectItem key={borough.value} value={borough.value}>
                    {borough.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {!location.detected && (
              <Button
                variant="outline"
                size="sm"
                onClick={detectLocation}
                disabled={isDetecting}
                className="flex items-center gap-1 px-3"
              >
                {isDetecting ? (
                  <div className="animate-spin rounded-full h-3 w-3 border-b border-primary"></div>
                ) : (
                  <MapPin className="h-3 w-3" />
                )}
                Auto
              </Button>
            )}
          </div>
          
          {location.detected && (
            <p className="text-xs text-muted-foreground mt-1">
              📍 Detected: {location.city}
            </p>
          )}
        </div>

        {/* Quick Filters & Advanced Filters */}
        {showFilters && (
          <div className="px-4 pb-4 border-t bg-muted/30 space-y-4">
            {/* Quick Filters */}
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-2">Quick Filters</h4>
              <div className="flex flex-wrap gap-2">
                {QUICK_FILTERS.map((filter) => {
                  const Icon = filter.icon;
                  const isActive = activeFilters[filter.key as keyof typeof activeFilters];
                  
                  return (
                    <Button
                      key={filter.key}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleFilter(filter.key)}
                      className="flex items-center gap-1 text-xs"
                    >
                      <Icon className="h-3 w-3" />
                      {filter.label}
                      {isActive && <X className="h-3 w-3 ml-1" />}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Advanced Filters */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Advanced Filters</h4>
              
              {/* Pay Range Slider */}
              <div>
                <label className="text-xs text-muted-foreground">
                  💵 Pay Range: ${advancedFilters.payRange[0]}-${advancedFilters.payRange[1]}/hr
                </label>
                <Slider
                  value={advancedFilters.payRange}
                  onValueChange={(value) => setAdvancedFilters(prev => ({ ...prev, payRange: value }))}
                  max={50}
                  min={10}
                  step={1}
                  className="mt-1"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="text-xs text-muted-foreground block mb-1">🚀 Start Date</label>
                <Select 
                  value={advancedFilters.startDate} 
                  onValueChange={(value) => setAdvancedFilters(prev => ({ ...prev, startDate: value }))}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Any time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any time</SelectItem>
                    <SelectItem value="ASAP">ASAP</SelectItem>
                    <SelectItem value="this_week">This Week</SelectItem>
                    <SelectItem value="next_week">Next Week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Hours */}
              <div>
                <label className="text-xs text-muted-foreground block mb-1">⏱️ Hours</label>
                <Select 
                  value={advancedFilters.hours} 
                  onValueChange={(value) => setAdvancedFilters(prev => ({ ...prev, hours: value }))}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any</SelectItem>
                    <SelectItem value="full_time">Full-Time</SelectItem>
                    <SelectItem value="part_time">Part-Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Toggle Filters */}
              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">🔒 Safe Score Only</label>
                <Switch 
                  checked={advancedFilters.safeScore}
                  onCheckedChange={(checked) => setAdvancedFilters(prev => ({ ...prev, safeScore: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-xs text-muted-foreground">🔥 New Listings (24h)</label>
                <Switch 
                  checked={advancedFilters.newListings}
                  onCheckedChange={(checked) => setAdvancedFilters(prev => ({ ...prev, newListings: checked }))}
                />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* SEO Title Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 text-center">
        <h1 className="text-lg font-bold">{seoTitle}</h1>
        <p className="text-sm text-muted-foreground mt-1">{seoDescription}</p>
      </div>

      {/* Real/Fake Jobs Toggle */}
      <div className="p-4 flex items-center justify-between border-b">
        <div>
          <p className="text-sm text-muted-foreground">
            {showOnlyReal ? filteredJobs.length : '1,027'} jobs found
            {selectedBorough && selectedBorough !== "all" && ` in ${selectedBorough}`}
          </p>
          {lastGPTQuery && (
            <p className="text-xs text-primary font-medium">
              🧠 Smart search: "{lastGPTQuery}"
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-xs text-muted-foreground">Show Real Jobs</label>
          <Switch
            checked={showOnlyReal}
            onCheckedChange={setShowOnlyReal}
          />
          {totalJobs < 1000 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSeedDatabase}
              disabled={seeding}
              className="text-xs ml-2"
            >
              {seeding ? "Seeding..." : "Seed 1,635 Jobs"}
            </Button>
          )}
        </div>
      </div>

      {/* Use new Smart Pagination Feed instead of the old job grid */}
      {showOnlyReal ? (
        <>
          {/* Real Jobs Grid Layout - Keep existing for real jobs */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {filteredJobs.length} jobs found • Page {currentPage} of {totalPages}
                {selectedBorough && selectedBorough !== "all" && ` in ${selectedBorough}`}
              </p>
              {lastGPTQuery && (
                <p className="text-xs text-primary font-medium">
                  🧠 Smart search: "{lastGPTQuery}"
                </p>
              )}
            </div>
          </div>

          {/* Real Jobs Grid */}
          <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 transition-opacity duration-300 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            {filteredJobs.map((job) => {
              const verificationStatus = getVerificationStatus(job);
              const smartTags = getJobTags(job);
              const applicantInfo = getApplicantInfo(job);
              const isScamRisk = verificationStatus?.type === 'risk';
              
              return (
                <TooltipProvider key={job.id}>
                  <Card 
                    data-job-id={job.id}
                    className={`overflow-hidden transition-all cursor-pointer hover:shadow-lg hover:scale-[1.02] ${
                      isScamRisk ? 'opacity-75 border-orange-200' : ''
                    } animate-fade-in`}
                    onClick={() => handleJobCardClick(job.id)}
                  >
                    <CardContent className="p-3 md:p-4">
                      {/* Keep existing job card content for real jobs */}
                      <h3 className="font-semibold text-sm md:text-base leading-tight mb-2 line-clamp-2">
                        {job.title}
                      </h3>
                      
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{job.location}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {job.company || job.brand_name}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-1 text-sm font-semibold text-primary mb-3">
                        <DollarSign className="h-3 w-3" />
                        {job.pay_range}
                      </div>
                      
                      <Button 
                        className="w-full text-xs py-2 h-auto"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleJobCardClick(job.id);
                        }}
                      >
                        🔍 View & Apply
                      </Button>
                    </CardContent>
                  </Card>
                </TooltipProvider>
              );
            })}
          </div>

          {/* Real Jobs Load More */}
          {hasMore && (
            <div className="flex justify-center py-8">
              {loadingMore ? (
                <div className="text-muted-foreground">Loading more jobs...</div>
              ) : (
                <Button 
                  variant="outline" 
                  onClick={() => loadJobs(false)}
                  className="w-full max-w-xs"
                >
                  Load More Jobs (Page {currentPage + 1} of {totalPages})
                </Button>
              )}
            </div>
          )}

          {!hasMore && filteredJobs.length > 0 && (
            <div className="text-center py-8 text-muted-foreground">
              You've seen all {totalJobs} available jobs. Check back later for new postings!
            </div>
          )}
        </>
      ) : (
        <div className="space-y-6">
          {/* Jobs You'll Love Section */}
          <JobsYoullLove onJobClick={handleJobClick} />
          
          {/* Infinite Job Feed */}
          <InfiniteJobFeed 
            onJobClick={handleJobClick}
            searchTerm={searchTerm}
            filters={activeFilters}
          />
        </div>
      )}

      {/* Fallback State for No Results */}
      {!loading && filteredJobs.length === 0 && showOnlyReal && (
        <div className="text-center py-16">
          <div className="mb-4">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Didn't find your match?</h3>
            <p className="text-muted-foreground mb-4">
              Try a different borough 👇 or adjust your search criteria
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {NYC_BOROUGHS.filter(b => b.value !== selectedBorough).slice(0, 3).map((borough) => (
                <Button
                  key={borough.value}
                  variant="outline"
                  size="sm"
                  onClick={() => handleLocationChange(borough.value)}
                >
                  Try {borough.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Save + Apply Bar */}
      {isMobile && stickyJobId && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t p-3 z-40">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleSavedJob(stickyJobId)}
              className="flex items-center gap-1 px-3"
            >
              <Bookmark className="h-4 w-4" />
              {isJobSaved(stickyJobId) ? "Saved" : "Save"}
            </Button>
            
            <Button
              className="flex-1 flex items-center gap-1"
              onClick={() => handleJobCardClick(stickyJobId)}
            >
              <Zap className="h-4 w-4" />
              Apply Instantly
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const job = filteredJobs.find(j => j.id === stickyJobId);
                openAlertModal(job?.title);
              }}
              className="flex items-center gap-1 px-3"
            >
              <Bell className="h-4 w-4" />
              Alerts
            </Button>
          </div>
        </div>
      )}

      {/* Smart Alerts CTA at bottom of job feed */}
      {!showOnlyReal && (
        <div className="p-6 text-center bg-gradient-to-r from-primary/5 to-secondary/5 border-t">
          <h3 className="text-lg font-semibold mb-2">📬 Get notified when new jobs drop!</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Never miss the perfect job again. Set up smart alerts and be first to apply.
          </p>
          <Button 
            className="flex items-center gap-2"
            onClick={() => setShowSmartAlertsModal(true)}
          >
            <Bell className="h-4 w-4" />
            Set Up Smart Alerts
          </Button>
        </div>
      )}

      {/* Desktop Bottom CTA */}
      {!isMobile && showOnlyReal && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t p-4">
          <Button 
            className="w-full flex items-center gap-2"
            onClick={() => openAlertModal()}
          >
            <Bell className="h-4 w-4" />
            Get Alerts for New Jobs
          </Button>
        </div>
      )}

      {/* Smart Alerts Modal */}
      <SmartAlertsModal
        open={showSmartAlertsModal}
        onOpenChange={setShowSmartAlertsModal}
        user={user}
        defaultTitle={searchTerm}
        defaultLocation={selectedBorough !== "all" ? selectedBorough : "Manhattan"}
      />

      {/* Alert Modal */}
      <Dialog open={showAlertModal} onOpenChange={setShowAlertModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get Alerts for Similar Jobs</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Get notified when new jobs matching your criteria are posted.
            </p>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Job Type</label>
                <Input
                  placeholder="e.g. Server, Driver, etc."
                  value={alertJobType}
                  onChange={(e) => setAlertJobType(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">City</label>
                <Select value={alertCity} onValueChange={setAlertCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city..." />
                  </SelectTrigger>
                  <SelectContent>
                    {NYC_BOROUGHS.filter(b => b.value !== "all").map((borough) => (
                      <SelectItem key={borough.value} value={borough.value}>
                        {borough.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Phone (Optional)</label>
                <Input
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={alertPhone}
                  onChange={(e) => setAlertPhone(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={() => createJobAlert(alertEmail)}
                disabled={submittingAlert || (!alertEmail && !alertPhone)}
                className="w-full"
              >
                {submittingAlert ? "Creating Alert..." : "Create Alert"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Signup CTA Modal for Anonymous Applications */}
      <SignupCTA />
      
      {/* Admin Debug Link */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 z-50">
          <Link to="/admin-dashboard">
            <Button variant="outline" size="sm" className="text-xs">
              Admin Dashboard
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}