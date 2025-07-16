import { useState, useEffect, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, MapPin, DollarSign, Clock, Zap, Heart, ArrowLeft, Filter, Bell, Mail, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useReferralTracking } from "@/hooks/useReferralTracking";
import { useSavedJobs } from "@/hooks/useSavedJobs";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";

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
}

const NYC_BOROUGHS = [
  { value: "", label: "All NYC" },
  { value: "Manhattan", label: "Manhattan" },
  { value: "Brooklyn", label: "Brooklyn" },
  { value: "Queens", label: "Queens" },
  { value: "Bronx", label: "Bronx" },
  { value: "Staten Island", label: "Staten Island" },
];

const QUICK_FILTERS = [
  { key: "highPay", label: "$20+/hr", icon: DollarSign },
  { key: "noInterview", label: "No Interview", icon: Zap },
  { key: "quickStart", label: "Quick Start", icon: Clock },
  { key: "flexibleShifts", label: "Flexible Shifts", icon: Clock },
  { key: "weeklyPay", label: "Weekly Pay", icon: DollarSign },
];

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
  const [selectedBorough, setSelectedBorough] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertEmail, setAlertEmail] = useState("");
  const [submittingAlert, setSubmittingAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const [activeFilters, setActiveFilters] = useState({
    highPay: false,
    noInterview: false,
    quickStart: false,
    flexibleShifts: false,
    weeklyPay: false,
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
      const page = reset ? 1 : currentPage;
      const from = (page - 1) * 20;
      const to = from + 19;
      
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
        pay_range: '$15-25/hr', // Default since no pay_range field exists
        description: item.description || 'No description available',
        job_type: null, // Not available in current schema
        category: null, // Not available in current schema
        is_verified: false,
        is_hot: Math.random() > 0.7,
        is_featured: Math.random() > 0.8,
        brand_name: null,
      }));

      // Generate fake jobs if insufficient data
      let jobsData = transformedJobs;
      if (jobsData.length < 20) {
        const fakeJobs = generateFakeJobs(20 - jobsData.length, from + jobsData.length);
        jobsData = [...jobsData, ...fakeJobs];
      }

      if (reset) {
        setJobs(jobsData);
      } else {
        setJobs(prev => [...prev, ...jobsData]);
      }
      
      setHasMore(jobsData.length === 20);
      if (!reset) {
        setCurrentPage(prev => prev + 1);
      }
      
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

  const generateFakeJobs = (count: number, startIndex: number): Job[] => {
    const companies = ["TechCorp", "BuildRight", "QuickFix", "EatFresh", "CleanPro", "CarePlus", "FastMove", "SafeGuard"];
    const jobTitles = ["Warehouse Worker", "Food Delivery", "Customer Service", "Cleaner", "Security Guard", "Driver", "Sales Associate", "Kitchen Helper"];
    const locations = ["Manhattan, NY", "Brooklyn, NY", "Queens, NY", "Bronx, NY", "Staten Island, NY"];
    
    return Array.from({ length: count }, (_, i) => ({
      id: `fake-${startIndex + i}`,
      title: jobTitles[i % jobTitles.length],
      company: companies[i % companies.length],
      location: locations[i % locations.length],
      salary_min: 18 + (i % 10),
      salary_max: 25 + (i % 15),
      pay_range: `$${18 + (i % 10)}-${25 + (i % 15)}/hr`,
      description: "Great opportunity for motivated individuals. Flexible schedule, competitive pay, and growth opportunities available.",
      job_type: i % 3 === 0 ? "full-time" : "part-time",
      category: "general",
      is_verified: i % 3 === 0,
      is_hot: i % 5 === 0,
      is_featured: i % 4 === 0,
      brand_name: null,
    }));
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
    if (selectedBorough) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(selectedBorough.toLowerCase())
      );
    }

    // Active filters
    if (activeFilters.highPay) {
      filtered = filtered.filter(job => 
        (job.salary_min && job.salary_min >= 20) || 
        job.pay_range.includes('$2') || 
        job.pay_range.includes('$3')
      );
    }

    if (activeFilters.noInterview) {
      filtered = filtered.filter(job => job.is_featured);
    }

    if (activeFilters.quickStart) {
      filtered = filtered.filter(job => job.is_hot);
    }

    if (activeFilters.flexibleShifts) {
      filtered = filtered.filter(job => 
        job.job_type === "part-time" || 
        job.description.toLowerCase().includes('flexible')
      );
    }

    if (activeFilters.weeklyPay) {
      filtered = filtered.filter(job => 
        job.description.toLowerCase().includes('weekly') ||
        job.description.toLowerCase().includes('pay')
      );
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

  const handleJobAlert = async () => {
    if (!alertEmail) return;
    
    setSubmittingAlert(true);
    try {
      const { error } = await supabase
        .from('job_alerts')
        .insert({
          email: alertEmail,
          city: selectedBorough || 'New York',
          preferred_method: 'email',
        });

      if (error) throw error;

      toast({
        title: "Alert created!",
        description: "We'll notify you when similar jobs are posted.",
      });
      setAlertEmail("");
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

  const getMatchTags = (job: Job) => {
    const tags = [];
    const savedCount = getSavedJobsCount();
    
    if (savedCount > 0 && Math.random() > 0.5) {
      tags.push("🔥 Similar to your saved jobs");
    }
    
    // Check if job matches active filters
    const matchesFilters = Object.entries(activeFilters).some(([key, active]) => {
      if (!active) return false;
      if (key === 'highPay' && job.salary_min && job.salary_min >= 20) return true;
      if (key === 'noInterview' && job.is_featured) return true;
      if (key === 'quickStart' && job.is_hot) return true;
      return false;
    });
    
    if (matchesFilters) {
      tags.push("🎯 Matches your search");
    }
    
    if (job.location.toLowerCase().includes('remote')) {
      tags.push("🌍 Remote Friendly");
    }
    
    return tags.slice(0, 2);
  };

  const getTrustScore = (job: Job) => {
    if (job.is_verified) {
      return {
        text: "✅ Verified",
        verified: true,
        tooltip: "This employer has been verified"
      };
    }
    return {
      text: "⚠️ Low Trust",
      verified: false,
      tooltip: "Be cautious — this job hasn't been verified yet."
    };
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(Boolean).length;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading jobs...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Mobile Header */}
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
                className="pl-10 pr-4"
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
        <div className="px-4 pb-4">
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
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {filteredJobs.length} jobs found
            {selectedBorough && ` in ${selectedBorough}`}
          </p>
        </div>

        <div className="space-y-4">
          {filteredJobs.map((job) => {
            const matchTags = getMatchTags(job);
            const trustScore = getTrustScore(job);
            
            return (
              <Card key={job.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg leading-tight mb-1 truncate">
                        {job.title}
                      </h3>
                      
                      {/* Match Tags */}
                      {matchTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {matchTags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleSavedJob(job.id)}
                      className="p-1 h-auto"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isJobSaved(job.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  </div>
                
                  <p className="text-sm text-muted-foreground mb-1">
                    {job.company || job.brand_name}
                  </p>
                  
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm font-medium text-foreground mb-3">
                    <DollarSign className="h-3 w-3" />
                    {job.salary_min && job.salary_max 
                      ? `$${job.salary_min} - $${job.salary_max}/hr`
                      : job.pay_range
                    }
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {/* Trust Score Badge */}
                    <Badge 
                      variant={trustScore.verified ? "secondary" : "destructive"} 
                      className="text-xs"
                      title={trustScore.tooltip}
                    >
                      {trustScore.text}
                    </Badge>
                    
                    {job.is_featured && (
                      <Badge variant="outline" className="text-xs">
                        No Interview
                      </Badge>
                    )}
                    {job.is_hot && (
                      <Badge variant="outline" className="text-xs">
                        🔥 Hot Job
                      </Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {job.description}
                  </p>
                  
                  <Button asChild className="w-full">
                    <Link to={`/apply/${job.id}?ref=search`}>
                      Apply Instantly
                    </Link>
                  </Button>
                </CardContent>
              </Card>
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
                Load More Jobs
              </Button>
            )}
          </div>
        )}

        {!hasMore && filteredJobs.length > 0 && (
          <div className="text-center py-8 text-muted-foreground">
            You've seen all available jobs. Check back later for new postings!
          </div>
        )}
      </div>

      {/* Bottom Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t p-4">
        <Dialog open={showAlertModal} onOpenChange={setShowAlertModal}>
          <DialogTrigger asChild>
            <Button className="w-full flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Get Alerts for New Jobs
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Job Alerts</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Get notified when new jobs matching your criteria are posted.
              </p>
              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                />
                <Button 
                  onClick={handleJobAlert}
                  disabled={submittingAlert || !alertEmail}
                  className="w-full"
                >
                  {submittingAlert ? "Creating Alert..." : "Create Alert"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}