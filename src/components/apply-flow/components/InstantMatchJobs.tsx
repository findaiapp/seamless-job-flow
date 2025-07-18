import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useApplicationForm } from '../context/ApplicationFormContext';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  pay_range: string;
  job_type: string;
}

interface InstantMatchJobsProps {
  currentJobId: string;
  userLocation?: string;
  jobType?: string;
}

const InstantMatchJobs = ({ currentJobId, userLocation, jobType }: InstantMatchJobsProps) => {
  const [matchedJobs, setMatchedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { formData } = useApplicationForm();

  useEffect(() => {
    fetchMatchedJobs();
  }, [currentJobId, userLocation, jobType]);

  const fetchMatchedJobs = async () => {
    try {
      let query = supabase
        .from('jobs')
        .select('id, title, company, location, pay_range, job_type')
        .eq('is_approved', true)
        .eq('status', 'active')
        .neq('id', currentJobId)
        .limit(3);

      // Try to match by location first
      if (userLocation) {
        query = query.ilike('location', `%${userLocation}%`);
      }

      const { data: locationMatches, error: locationError } = await query;

      if (locationError) {
        console.error('Error fetching location matches:', locationError);
      }

      let finalMatches = locationMatches || [];

      // If we don't have enough matches, get some random ones
      if (finalMatches.length < 3) {
        const { data: randomJobs, error: randomError } = await supabase
          .from('jobs')
          .select('id, title, company, location, pay_range, job_type')
          .eq('is_approved', true)
          .eq('status', 'active')
          .neq('id', currentJobId)
          .limit(3 - finalMatches.length);

        if (!randomError && randomJobs) {
          finalMatches = [...finalMatches, ...randomJobs];
        }
      }

      setMatchedJobs(finalMatches);
    } catch (error) {
      console.error('Error fetching matched jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickApply = (job: Job) => {
    // Navigate to the new job with current form data
    navigate(`/apply/${job.id}/step-1`, {
      state: {
        quickApply: true,
        previousFormData: formData
      }
    });
  };

  if (loading) {
    return (
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded"></div>
              <div className="h-3 bg-muted rounded w-5/6"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (matchedJobs.length === 0) return null;

  return (
    <Card className="mt-6 border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <ArrowRight className="h-5 w-5 text-primary" />
          You may also qualify for these jobs ↓
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Apply faster with your saved info
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {matchedJobs.map((job) => (
          <Card key={job.id} className="border border-muted hover:border-primary/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{job.title}</h3>
                    <p className="text-sm text-muted-foreground">{job.company}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </div>
                    {job.pay_range && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <DollarSign className="h-3 w-3" />
                        {job.pay_range}
                      </div>
                    )}
                    {job.job_type && (
                      <Badge variant="secondary" className="text-xs">
                        {job.job_type}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <Button
                  onClick={() => handleQuickApply(job)}
                  size="sm"
                  className="flex-shrink-0"
                >
                  <Clock className="h-4 w-4 mr-1" />
                  1-Tap Apply
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <p className="text-xs text-muted-foreground text-center mt-4">
          Your information will be pre-filled for faster applications! ⚡
        </p>
      </CardContent>
    </Card>
  );
};

export default InstantMatchJobs;