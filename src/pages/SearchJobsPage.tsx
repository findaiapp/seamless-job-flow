import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, MapPin, DollarSign, Clock, Zap, Heart, Briefcase, Mail, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

export default function SearchJobsPage() {
  const { toast } = useToast();
  const { getReferralCode } = useReferralTracking();
  const [user, setUser] = useState<User | null>(null);
  const { isJobSaved, toggleSavedJob, getSavedJobsCount } = useSavedJobs(user);
  
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState({
    highPay: false,
    noInterview: false,
    quickStart: false,
  });
  const [alertEmails, setAlertEmails] = useState<{[key: string]: string}>({});
  const [submittingAlert, setSubmittingAlert] = useState<{[key: string]: boolean}>({});

  useEffect(() => {
    // Check auth state
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Set page metadata
    document.title = "Search Jobs Near You | Hireloop";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Real jobs. Instant apply. No interviews.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Real jobs. Instant apply. No interviews.';
      document.head.appendChild(meta);
    }

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [searchTerm, location, filters]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      let query = supabase.from('jobs').select('*');

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,company.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      if (location) {
        query = query.or(`location.ilike.%${location}%,city.ilike.%${location}%`);
      }

      if (filters.highPay) {
        query = query.or(`salary_min.gte.20,pay_range.ilike.%$2%,pay_range.ilike.%$3%,pay_range.ilike.%$4%,pay_range.ilike.%$5%`);
      }

      if (filters.noInterview) {
        query = query.eq('is_featured', true);
      }

      if (filters.quickStart) {
        query = query.eq('is_hot', true);
      }

      const { data, error } = await query.limit(50);

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleJobAlert = async (jobId: string) => {
    const email = alertEmails[jobId];
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email to set up job alerts.",
        variant: "destructive",
      });
      return;
    }

    setSubmittingAlert(prev => ({ ...prev, [jobId]: true }));

    try {
      const job = jobs.find(j => j.id === jobId);
      await supabase.from('job_alerts').insert({
        email,
        city: job?.location || 'Unknown',
        preferred_method: 'email'
      });

      toast({
        title: "Alert set up!",
        description: "We'll email you about similar jobs.",
      });

      setAlertEmails(prev => ({ ...prev, [jobId]: '' }));
    } catch (error) {
      console.error('Error setting up job alert:', error);
      toast({
        title: "Error",
        description: "Failed to set up job alert. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmittingAlert(prev => ({ ...prev, [jobId]: false }));
    }
  };

  const toggleFilter = (filterKey: keyof typeof filters) => {
    setFilters(prev => ({
      ...prev,
      [filterKey]: !prev[filterKey]
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navigation */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-foreground">
            Hireloop
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Saved Jobs
            </Button>
            <Button asChild>
              <Link to="/post-job">Post a Job</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="What job are you looking for?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Smart Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={filters.highPay ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter('highPay')}
              className="flex items-center gap-1"
            >
              <DollarSign className="h-3 w-3" />
              $20+/hr
            </Button>
            <Button
              variant={filters.noInterview ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter('noInterview')}
              className="flex items-center gap-1"
            >
              <Clock className="h-3 w-3" />
              No Interview
            </Button>
            <Button
              variant={filters.quickStart ? "default" : "outline"}
              size="sm"
              onClick={() => toggleFilter('quickStart')}
              className="flex items-center gap-1"
            >
              <Zap className="h-3 w-3" />
              Quick Start
            </Button>
          </div>

          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              Saved Jobs ({getSavedJobsCount()})
            </Button>
            {!user && getSavedJobsCount() > 0 && (
              <Button variant="outline" size="sm">
                Sign Up to Sync Saves
              </Button>
            )}
          </div>
        </div>

        {/* Job Results */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Loading jobs...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No jobs found in your area</h3>
            <p className="text-muted-foreground mb-4">
              But we'll text you when one comes in
            </p>
            <Button>Refer a friend for $10</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-foreground line-clamp-2">
                      {job.title}
                    </h3>
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
                    {job.is_verified && (
                      <Badge variant="secondary" className="text-xs">
                        ✓ Verified
                      </Badge>
                    )}
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
                  
                  <Button asChild className="w-full mb-3">
                    <Link to={`/apply/${job.id}?ref=search`}>
                      Apply Instantly
                    </Link>
                  </Button>

                  {/* Job Alert Section */}
                  <div className="border-t pt-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">Get more jobs like this</span>
                    </div>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={alertEmails[job.id] || ''}
                        onChange={(e) => setAlertEmails(prev => ({ 
                          ...prev, 
                          [job.id]: e.target.value 
                        }))}
                        className="flex-1 text-sm"
                        size={40}
                      />
                      <Button
                        size="sm"
                        onClick={() => handleJobAlert(job.id)}
                        disabled={submittingAlert[job.id] || !alertEmails[job.id]}
                        className="flex items-center gap-1"
                      >
                        <Mail className="h-3 w-3" />
                        {submittingAlert[job.id] ? "..." : "Alert"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}