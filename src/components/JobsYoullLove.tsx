import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, DollarSign, Flame } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

interface JobsYoullLoveProps {
  onJobClick: (jobId: string) => void;
}

export function JobsYoullLove({ onJobClick }: JobsYoullLoveProps) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .limit(2);
        
        if (error) throw error;
        
        // Add mock match scores and hot status for display
        const jobsWithExtraData = data?.map(job => ({
          ...job,
          matchScore: Math.floor(Math.random() * 30) + 70, // 70-100%
          is_hot: Math.random() > 0.5
        })) || [];
        
        setJobs(jobsWithExtraData);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">🔥 Matched for You</h2>
          </div>
          <p className="text-sm text-muted-foreground">Based on your preferences</p>
        </div>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {loading ? (
          // Loading state
          Array.from({ length: 2 }, (_, i) => (
            <Card key={i} className="min-w-[280px] animate-pulse">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : jobs.length === 0 ? (
          <div className="text-center text-muted-foreground py-4">
            No jobs available at the moment
          </div>
        ) : (
          jobs.map((job) => (
          <Card 
            key={job.id} 
            className="min-w-[280px] cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-primary"
            onClick={() => onJobClick(job.id)}
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
                <Badge variant="outline" className="text-xs px-1 py-0">
                  Perfect Match
                </Badge>
                <Heart className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
              </div>
            </CardContent>
          </Card>
        ))
        )}
      </div>
    </div>
  );
}