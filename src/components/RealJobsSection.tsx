import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign, Zap, Bookmark } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface JobCardProps {
  onJobClick: (jobId: string) => void;
}

const RealJobsSection: React.FC<JobCardProps> = ({ onJobClick }) => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadRealJobs();
  }, []);

  const loadRealJobs = async () => {
    try {
      const { data: realJobs, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error loading jobs:', error);
        return;
      }

      setJobs(realJobs || []);
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded mb-4 w-3/4"></div>
              <div className="h-8 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No jobs available at the moment.</p>
        <Button 
          onClick={() => window.location.reload()}
          variant="outline" 
          className="mt-4"
        >
          Refresh Jobs
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {jobs.map((job) => (
        <Card 
          key={job.id} 
          className="cursor-pointer hover:shadow-lg transition-all duration-200 group relative overflow-hidden"
          onClick={() => onJobClick(job.id)}
        >
          <CardContent className="p-4">
            {/* Job Header */}
            <div className="mb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {job.company}
                  </p>
                </div>
                {job.is_verified && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    ✓ Verified
                  </Badge>
                )}
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{job.location}</span>
              </div>
              
              {job.pay_range && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.pay_range}</span>
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{job.job_type || 'Full-time'}</span>
              </div>
            </div>

            {/* Description */}
            {job.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {job.description}
              </p>
            )}

            {/* Apply Button */}
            <Button 
              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
              onClick={(e) => {
                e.stopPropagation();
                onJobClick(job.id);
              }}
            >
              <Zap className="h-4 w-4 mr-2" />
              Apply Now
            </Button>

            {/* Hot job indicator */}
            {Math.random() > 0.7 && (
              <div className="absolute top-2 right-2">
                <Badge variant="destructive" className="text-xs animate-pulse">
                  🔥 Hot
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RealJobsSection;