// 🦄 Smart Pagination Feed Component - Indeed-inspired with dopamine boosts
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, MapPin, Clock, DollarSign, Building2, Verified } from "lucide-react";
import { useSmartPaginatedJobs } from "@/hooks/useSmartPaginatedJobs";
import { cn } from "@/lib/utils";

interface SmartPaginationFeedProps {
  onJobClick?: (jobId: string) => void;
  className?: string;
}

export function SmartPaginationFeed({ onJobClick, className }: SmartPaginationFeedProps) {
  const {
    currentPage,
    totalPages,
    totalJobCount,
    jobs,
    loading,
    goToNextPage,
    goToPreviousPage,
    isFirstPage,
    isLastPage,
    startJobNumber,
    endJobNumber
  } = useSmartPaginatedJobs();

  const handleJobClick = (jobId: string) => {
    onJobClick?.(jobId);
  };

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Header with job count and page info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-border/50">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">
            {totalJobCount.toLocaleString()} matching jobs
          </h2>
          <p className="text-sm text-muted-foreground">
            Now viewing page {currentPage} of {totalPages} • Showing {startJobNumber}-{endJobNumber} of {totalJobCount} jobs
          </p>
        </div>
        
        {/* Page counter with progress feel */}
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
            Page {currentPage}/{totalPages}
          </Badge>
          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentPage / totalPages) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Job listings */}
      <div className="space-y-4">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 12 }, (_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          jobs.map((job, index) => (
            <Card 
              key={job.id} 
              className={cn(
                "group cursor-pointer border border-border/50 hover:border-border transition-all duration-200 hover:shadow-md animate-fade-in",
                job.is_featured && "ring-2 ring-primary/20 border-primary/30"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => handleJobClick(job.id)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Job header with tags */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        {job.is_verified && (
                          <Verified className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      
                      {/* Job tags */}
                      {job.jobTags && job.jobTags.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                          {job.jobTags.map((tag, tagIndex) => (
                            <Badge 
                              key={tagIndex}
                              variant={tag.includes('🆕') ? "default" : tag.includes('🔥') ? "destructive" : "secondary"}
                              className="text-xs px-2 py-1 animate-scale-in"
                              style={{ animationDelay: `${(index * 50) + (tagIndex * 100)}ms` }}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div className="text-right space-y-1">
                      <div className="flex items-center gap-1 text-sm font-medium text-foreground">
                        <DollarSign className="w-4 h-4" />
                        {job.pay_range}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">
                        {job.job_type}
                      </div>
                    </div>
                  </div>

                  {/* Company and location */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      <span className="font-medium">{job.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>2 days ago</span>
                    </div>
                  </div>

                  {/* Job description */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {job.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* iOS-style navigation buttons */}
      <div className="flex items-center justify-center gap-4 pt-8 pb-4">
        <Button
          variant="outline"
          size="lg"
          onClick={goToPreviousPage}
          disabled={loading}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-200",
            "hover:scale-105 active:scale-95",
            "disabled:opacity-50 disabled:hover:scale-100"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex items-center gap-2 px-4 py-2 bg-muted/30 rounded-full text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{currentPage}</span>
          <span>of</span>
          <span className="font-medium text-foreground">{totalPages}</span>
        </div>

        <Button
          size="lg"
          onClick={goToNextPage}
          disabled={loading}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-200",
            "hover:scale-105 active:scale-95 bg-primary hover:bg-primary/90",
            "disabled:opacity-50 disabled:hover:scale-100"
          )}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Progress indicator */}
      <div className="text-center text-xs text-muted-foreground">
        {!isLastPage && (
          <span className="animate-pulse">
            🎯 {totalPages - currentPage} more pages to explore
          </span>
        )}
        {isLastPage && (
          <span className="text-primary font-medium">
            🎉 You've reached the end! Start over or refine your search.
          </span>
        )}
      </div>
    </div>
  );
}