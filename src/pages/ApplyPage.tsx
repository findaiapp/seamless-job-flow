import { useState, useEffect } from "react";
import { useParams, useSearchParams, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Shield } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  pay_range: string;
  location: string;
  description: string;
  created_at: string;
}

const ApplyPage = () => {
  const { job_id } = useParams();
  const [searchParams] = useSearchParams();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    resume: null as File | null
  });

  useEffect(() => {
    const fetchJob = async () => {
      if (!job_id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', job_id)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          setNotFound(true);
        } else {
          setJob(data);
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();

    // Store referral in localStorage if present
    const ref = searchParams.get('ref');
    if (ref) {
      localStorage.setItem('referral_code', ref);
    }
  }, [job_id, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock application submission
    console.log('Application submitted:', {
      jobId: job_id,
      ...formData,
      referral: localStorage.getItem('referral_code')
    });

    // Show success message (mock)
    alert('Application submitted successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading job details...</div>
      </div>
    );
  }

  if (notFound) {
    return <Navigate to="/apply" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">Apply Now</h1>
          <Button variant="outline" size="sm" onClick={() => window.history.back()}>
            Back
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Job Details */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Verified Job
              </Badge>
            </div>
            <CardTitle className="text-2xl">{job?.title}</CardTitle>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4" />
                {job?.pay_range}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job?.location}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{job?.description}</p>
          </CardContent>
        </Card>

        {/* Apply Form */}
        <Card>
          <CardHeader>
            <CardTitle>Apply for this position</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name *</label>
                <Input 
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Phone *</label>
                <Input 
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Your phone number"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Email *</label>
                <Input 
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Resume (optional)</label>
                <Input 
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setFormData(prev => ({ ...prev, resume: e.target.files?.[0] || null }))}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Apply Instantly
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplyPage;