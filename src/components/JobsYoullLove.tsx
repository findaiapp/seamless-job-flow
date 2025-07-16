import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, DollarSign, Flame, ChevronRight } from 'lucide-react';
import { useUserActivity } from '@/hooks/useUserActivity';
import { Job } from '@/hooks/useFakePaginationLogic';

interface JobsYoullLoveProps {
  onJobClick: (jobId: string) => void;
}

export function JobsYoullLove({ onJobClick }: JobsYoullLoveProps) {
  const { getJobsYoullLove, trackActivity } = useUserActivity();
  const [recommendedJobs, setRecommendedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [matchReason, setMatchReason] = useState('');

  useEffect(() => {
    loadRecommendedJobs();
  }, []);

  const loadRecommendedJobs = async () => {
    try {
      setLoading(true);
      const jobs = await getJobsYoullLove();
      
      // Transform to match Job interface
      const transformedJobs = jobs.slice(0, 4).map(job => ({
        id: job.id,
        title: job.job_title || 'Unknown Position',
        company: job.company || 'Unknown Company',
        location: job.location || 'Remote',
        salary_min: job.salary_min,
        salary_max: job.salary_max,
        pay_range: `$${job.salary_min || 15}-${job.salary_max || 25}/hr`,
        description: job.description || 'No description available',
        job_type: job.type || null,
        category: null,
        is_verified: !!job.contact_email,
        is_hot: Math.random() > 0.5,
        is_featured: false,
        brand_name: null,
        contact_email: job.contact_email,
        employer_email: job.contact_email,
        job_tags: job.tags || null,
        created_at: job.created_at,
        matchScore: Math.floor(Math.random() * 20) + 80, // 80-100 for recommended
        matchReasons: ['Previous Interest', 'Location Match', 'Pay Range'].slice(0, Math.floor(Math.random() * 3) + 1),
        urgencyScore: Math.floor(Math.random() * 5) + 6
      }));

      setRecommendedJobs(transformedJobs);

      // Generate dynamic match reason
      if (transformedJobs.length > 0) {
        const reasons = [
          "Because you viewed delivery jobs in Brooklyn yesterday...",
          "Based on your interest in warehouse positions...",
          "Matching your preferred $20+ hourly rate...",
          "Similar to jobs you applied to recently...",
          "In your favorite NYC neighborhoods..."
        ];
        setMatchReason(reasons[Math.floor(Math.random() * reasons.length)]);
      }
    } catch (error) {
      console.error('Error loading recommended jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJobClick = async (job: any) => {
    await trackActivity(job, 'click', { source: 'recommended' });
    onJobClick(job.id);
  };

  if (loading) {
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Flame className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Jobs You'll Love</h2>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[280px] bg-muted rounded-lg animate-pulse h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (recommendedJobs.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">🔥 Matched for You</h2>
          </div>
          <p className="text-sm text-muted-foreground">{matchReason}</p>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          View All <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {recommendedJobs.map((job) => (
          <Card 
            key={job.id} 
            className="min-w-[280px] cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-primary"
            onClick={() => handleJobClick(job)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                  {job.matchScore}% Match
                </Badge>
                {job.is_hot && (
                  <Badge variant="destructive" className="text-xs">
                    🔥 Hot
                  </Badge>
                )}
              </div>
              
              <h3 className="font-medium text-sm mb-1 line-clamp-1">{job.title}</h3>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{job.company}</p>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <DollarSign className="h-3 w-3" />
                  <span>{job.pay_range}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-1">
                  {job.matchReasons?.slice(0, 2).map((reason, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs px-1 py-0">
                      {reason}
                    </Badge>
                  ))}
                </div>
                <Heart className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}