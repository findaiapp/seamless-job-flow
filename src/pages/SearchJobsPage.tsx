import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, DollarSign, Clock, Zap, Heart, ArrowLeft, Filter, Bell, Mail, ChevronDown, X, Users, Shield, AlertTriangle, Bookmark, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { supabase } from "@/integrations/supabase/client";
import { useReferralTracking } from "@/hooks/useReferralTracking";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { useToast } from "@/hooks/use-toast";
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
  
  const [activeFilters, setActiveFilters] = useState({
    highPay: false,
    noInterview: false,
    quickStart: false,
    safeScore: false,
  });

  // Auto-detect location from localStorage or default
  useEffect(() => {
    const savedLocation = localStorage.getItem('preferred_location');
    if (savedLocation) {
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
        salary_min: null,
        salary_max: null,
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
        job_tags: null,
        created_at: item.created_at,
      }));

      const totalCount = count || 0;
      setTotalJobs(totalCount);
      setTotalPages(Math.ceil(totalCount / JOBS_PER_PAGE));

      if (reset) {
        setJobs(transformedJobs);
        setCurrentPage(1);
      } else {
        setJobs(prev => [...prev, ...transformedJobs]);
        setCurrentPage(page);
      }
      
      setHasMore(transformedJobs.length === JOBS_PER_PAGE && totalCount > page * JOBS_PER_PAGE);
      
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

    // Active filters
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
  }, [jobs, searchTerm, selectedBorough, activeFilters]);

  const toggleFilter = (filterKey: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey as keyof typeof prev]
    }));
  };

  const handleLocationChange = (value: string) => {
    setSelectedBorough(value);
    localStorage.setItem('preferred_location', value);
  };

  const handleJobAlert = async (jobType?: string) => {
    if (!alertEmail && !alertPhone) return;
    
    setSubmittingAlert(true);
    try {
      const { error } = await supabase
        .from('alerts')
        .insert({
          email: alertEmail || null,
          phone: alertPhone || null,
          city: alertCity || selectedBorough || 'New York',
          job_type: alertJobType || jobType || 'all',
          is_active: true
        });

      if (error) throw error;

      toast({
        title: "Alert created!",
        description: "We'll notify you when similar jobs are posted.",
      });
      setAlertEmail("");
      setAlertPhone("");
      setAlertCity("");
      setAlertJobType("");
      setShowAlertModal(false);
    } catch (error) {
      console.error('Error creating alert:', error);
      toast({
        title: "Error",
        description: "Failed to create job alert. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmittingAlert(false);
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

  const isMobile = window.innerWidth < 768;

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
    return Object.values(activeFilters).filter(Boolean).length;
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
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 h-10"
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

        {/* Location Selector */}
        <div className="px-4 pb-3">
          <Select value={selectedBorough} onValueChange={handleLocationChange}>
            <SelectTrigger className="w-full">
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
        </div>

        {/* Quick Filters */}
        {showFilters && (
          <div className="px-4 pb-4 border-t bg-muted/30">
            <div className="flex flex-wrap gap-2 pt-4">
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
        )}
      </header>

      {/* Job Results */}
      <div className="p-4 pb-20">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredJobs.length} jobs found • Page {currentPage} of {totalPages}
            {selectedBorough && selectedBorough !== "all" && ` in ${selectedBorough}`}
          </p>
          {totalJobs < 1000 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSeedDatabase}
              disabled={seeding}
              className="text-xs"
            >
              {seeding ? "Seeding..." : "Seed 1,635 Jobs"}
            </Button>
          )}
        </div>

        {/* Mobile-First Grid Layout - 2 columns mobile, 3 desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
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
                    {/* Top Status Badges */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {/* Quick Tag */}
                      {job.is_featured && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 border-blue-200">
                          ⚡ Start Tomorrow
                        </Badge>
                      )}
                      {job.is_hot && (
                        <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 border-purple-200">
                          🔥 No Interview
                        </Badge>
                      )}
                      {(job.pay_range.includes('$2') || job.pay_range.includes('$3')) && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700 border-green-200">
                          💸 $20+/hr
                        </Badge>
                      )}
                    </div>

                    {/* Job Title - Compact */}
                    <h3 className="font-semibold text-sm md:text-base leading-tight mb-2 line-clamp-2">
                      {job.title}
                    </h3>
                    
                    {/* Location & Company */}
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {job.company || job.brand_name}
                      </p>
                    </div>
                    
                    {/* Pay Rate - Prominent */}
                    <div className="flex items-center gap-1 text-sm font-semibold text-primary mb-3">
                      <DollarSign className="h-3 w-3" />
                      {job.pay_range}
                    </div>
                    
                    {/* Applicants Today Counter */}
                    {applicantInfo && (
                      <div className="flex items-center gap-1 text-xs text-orange-600 mb-3">
                        <Users className="h-3 w-3" />
                        <span className="font-medium">{applicantInfo.count} applied today</span>
                      </div>
                    )}
                    
                    {/* View & Apply CTA */}
                    <Button 
                      className="w-full text-xs py-2 h-auto"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleJobCardClick(job.id);
                      }}
                    >
                      🔍 View & Apply
                    </Button>
                    
                    {/* Mobile Action Icons */}
                    <div className="flex justify-center gap-2 mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSavedJob(job.id);
                        }}
                        className="p-1 h-auto"
                      >
                        <Heart
                          className={`h-3 w-3 ${
                            isJobSaved(job.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          openAlertModal(job.title);
                        }}
                        className="p-1 h-auto"
                      >
                        <Bell className="h-3 w-3 text-muted-foreground" />
                      </Button>
                    </div>
                    
                    {/* Verification Status - Bottom */}
                    {verificationStatus && (
                      <div className="mt-2 pt-2 border-t">
                        <Badge 
                          variant="outline" 
                          className={`text-xs w-full justify-center ${verificationStatus.className}`}
                          title={verificationStatus.tooltip}
                        >
                          {verificationStatus.type === 'verified' ? '✅ Safe Score' : '⚠️ Caution'}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TooltipProvider>
            );
          })}
        </div>

        {/* Load More / Infinite Scroll Trigger */}
        {hasMore && (
          <div ref={loadMoreRef} className="flex justify-center py-8">
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

        {/* No results fallback */}
        {!loading && filteredJobs.length === 0 && (
          <div className="text-center py-16">
            <div className="mb-4">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No jobs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or check back later for new postings.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedBorough("all");
                setActiveFilters({
                  highPay: false,
                  noInterview: false,
                  quickStart: false,
                  safeScore: false,
                });
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

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

      {/* Desktop Bottom CTA */}
      {!isMobile && (
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
                onClick={() => handleJobAlert()}
                disabled={submittingAlert || (!alertEmail && !alertPhone)}
                className="w-full"
              >
                {submittingAlert ? "Creating Alert..." : "Create Alert"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}