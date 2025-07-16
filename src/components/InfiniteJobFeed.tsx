import { useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, DollarSign, Clock, Shield, Heart, Zap, Users } from 'lucide-react';
import { useFakePaginationLogic } from '@/hooks/useFakePaginationLogic';
import { useUserActivity } from '@/hooks/useUserActivity';
import { useSavedJobs } from '@/hooks/useSavedJobs';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';
import { useState } from 'react';

interface InfiniteJobFeedProps {
  onJobClick: (jobId: string) => void;
  searchTerm?: string;
  filters?: any;
}

export function InfiniteJobFeed({ onJobClick, searchTerm, filters }: InfiniteJobFeedProps) {
  const { jobs, loading, loadingMore, hasMore, loadNextPage, trackPaginationActivity } = useFakePaginationLogic();
  const { trackActivity } = useUserActivity();
  const [user, setUser] = useState<User | null>(null);
  const { isJobSaved, toggleSavedJob } = useSavedJobs(user);
  
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;
    if (!loadMoreElement) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadNextPage();
          trackPaginationActivity('scroll_load_more', { 
            totalJobs: jobs.length,
            hasMore: hasMore 
          });
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
  }, [hasMore, loadingMore, loadNextPage, trackPaginationActivity, jobs.length]);

  // Track page views
  useEffect(() => {
    trackPaginationActivity('page_view', { 
      totalJobs: jobs.length,
      searchTerm,
      filters 
    });
  }, [jobs.length]);

  const handleJobClick = useCallback(async (job: any) => {
    await trackActivity(job, 'click', { source: 'infinite_feed' });
    onJobClick(job.id);
  }, [trackActivity, onJobClick]);

  const handleSaveJob = useCallback(async (e: React.MouseEvent, job: any) => {
    e.stopPropagation();
    await trackActivity(job, 'save');
    toggleSavedJob(job.id);
  }, [trackActivity, toggleSavedJob]);

  const getVerificationStatus = (job: any) => {
    if (job.is_verified) return { icon: Shield, text: "Verified", color: "text-green-600" };
    return { icon: Users, text: "Community", color: "text-muted-foreground" };
  };

  const getApplicantInfo = (job: any) => {
    const baseCount = Math.floor(Math.random() * 20) + 5;
    const todayCount = Math.floor(Math.random() * 8) + 1;
    return `${baseCount} applied • ${todayCount} today`;
  };

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (!job.title.toLowerCase().includes(searchLower) &&
          !job.company.toLowerCase().includes(searchLower) &&
          !job.description.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    return true;
  });

  if (loading && jobs.length === 0) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-4 w-4" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredJobs.map((job, index) => {
        const verification = getVerificationStatus(job);
        const applicantInfo = getApplicantInfo(job);
        const timeAgo = `${Math.floor(Math.random() * 12) + 1}h ago`;
        
        return (
          <Card 
            key={job.id} 
            className="cursor-pointer hover:shadow-md transition-all duration-200 group"
            onClick={() => handleJobClick(job)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-base group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    {job.is_hot && (
                      <Badge variant="destructive" className="text-xs px-2 py-0.5">
                        🔥 Hot
                      </Badge>
                    )}
                    {job.is_featured && (
                      <Badge variant="secondary" className="text-xs px-2 py-0.5">
                        ⭐ Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{job.company}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleSaveJob(e, job)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart 
                    className={`h-4 w-4 ${isJobSaved(job.id) ? 'fill-current text-primary' : 'text-muted-foreground'}`} 
                  />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <DollarSign className="h-3 w-3" />
                  <span>{job.pay_range}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <verification.icon className={`h-3 w-3 ${verification.color}`} />
                  <span className={verification.color}>{verification.text}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{timeAgo}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {job.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>{applicantInfo}</span>
                </div>
                
                <div className="flex gap-2">
                  {job.matchScore && job.matchScore > 70 && (
                    <Badge variant="secondary" className="text-xs">
                      {job.matchScore}% Match
                    </Badge>
                  )}
                  {job.urgencyScore && job.urgencyScore > 7 && (
                    <Badge variant="outline" className="text-xs flex items-center gap-1">
                      <Zap className="h-2 w-2" />
                      Quick Apply
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Infinite Scroll Trigger */}
      <div ref={loadMoreRef} className="py-4">
        {loadingMore && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                      <Skeleton className="h-4 w-4" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Fallback Load More Button */}
        {hasMore && !loadingMore && (
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => {
                loadNextPage();
                trackPaginationActivity('button_load_more', { totalJobs: jobs.length });
              }}
              className="w-full max-w-sm"
            >
              Load More Jobs
            </Button>
          </div>
        )}
        
        {!hasMore && jobs.length > 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p>You've seen all available jobs</p>
            <p className="text-sm">Check back later for new opportunities!</p>
          </div>
        )}
      </div>
    </div>
  );
}