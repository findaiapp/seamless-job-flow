import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Shield, ArrowRight } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  pay_range: string;
  location: string;
  description: string;
}

const ApplyFallback = () => {
  const [featuredJob, setFeaturedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedJob = async () => {
      try {
        const { data, error } = await supabase
          .from('user_posted_jobs')
          .select('*')
          .limit(1)
          .maybeSingle();

        if (error) throw error;
        
        if (data) {
          // Transform Supabase data to Job interface
          const transformedJob: Job = {
            id: data.id,
            title: data.job_title || 'Unknown Position',
            company: data.company || 'Unknown Company',
            pay_range: '$15-25/hr', // Default since no pay_range field exists
            location: data.location || 'Remote',
            description: data.description || 'No description available'
          };
          setFeaturedJob(transformedJob);
        }
      } catch (error) {
        console.error('Error fetching featured job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedJob();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">Find Your Next Job</h1>
          <Link to="/search-jobs">
            <Button variant="outline" size="sm">
              Browse Jobs
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Oops! That job link didn't work</h2>
          <p className="text-muted-foreground mb-6">
            Don't worry - we've got plenty of other great opportunities for you
          </p>
        </div>

        {loading ? (
          <div className="text-center">Loading featured job...</div>
        ) : featuredJob ? (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Featured Job
                </Badge>
              </div>
              <CardTitle className="text-2xl">{featuredJob.title}</CardTitle>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {featuredJob.pay_range}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {featuredJob.location}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-6">
                {featuredJob.description}
              </p>
              <div className="flex gap-3">
                <Link to={`/apply/${featuredJob.id}?ref=fallback`} className="flex-1">
                  <Button className="w-full" size="lg">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="mb-8">
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                No featured jobs available right now
              </p>
            </CardContent>
          </Card>
        )}

        <div className="text-center">
          <Link to="/search-jobs">
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              Browse More Jobs
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApplyFallback;