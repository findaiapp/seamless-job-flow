import { useState, useEffect } from "react";
import { useParams, useSearchParams, Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Shield, Upload, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [generatingMessage, setGeneratingMessage] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    whyYou: "",
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

  const generateIntroMessage = async () => {
    if (!job?.title) return;
    
    setGeneratingMessage(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-intro-message', {
        body: { jobTitle: job.title }
      });

      if (error) throw error;
      
      setFormData(prev => ({ ...prev, whyYou: data.message }));
      toast({
        title: "Message generated!",
        description: "Feel free to customize it before submitting.",
      });
    } catch (error) {
      console.error('Error generating message:', error);
      toast({
        title: "Error",
        description: "Failed to generate message. Please write your own.",
        variant: "destructive",
      });
    } finally {
      setGeneratingMessage(false);
    }
  };

  const uploadResume = async (file: File): Promise<string | null> => {
    const applicationId = crypto.randomUUID();
    const fileExt = file.name.split('.').pop();
    const fileName = `${applicationId}/resume.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(fileName, file);

    if (error) {
      console.error('Resume upload error:', error);
      return null;
    }

    const { data: urlData } = supabase.storage
      .from('resumes')
      .getPublicUrl(fileName);
    
    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!job_id || !formData.fullName || !formData.phone || !formData.email) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    
    try {
      let resumeUrl = null;
      if (formData.resume) {
        resumeUrl = await uploadResume(formData.resume);
        if (!resumeUrl) {
          toast({
            title: "Upload failed",
            description: "Failed to upload resume. Please try again.",
            variant: "destructive",
          });
          return;
        }
      }

      const referralCode = localStorage.getItem('referral_code');
      
      const { error } = await supabase
        .from('applications')
        .insert({
          job_id: job_id,
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          why_you: formData.whyYou,
          resume_url: resumeUrl,
          referral_code: referralCode,
          company_name: job?.company || '',
          job_title: job?.title || '',
        });

      if (error) throw error;

      toast({
        title: "Application submitted!",
        description: "We'll be in touch soon.",
      });

      // Reset form
      setFormData({
        fullName: "",
        phone: "",
        email: "",
        whyYou: "",
        resume: null
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
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
                <label className="text-sm font-medium">Why are you a great fit? *</label>
                <div className="flex gap-2 mb-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateIntroMessage}
                    disabled={generatingMessage || !job?.title}
                    className="flex items-center gap-1"
                  >
                    <Sparkles className="h-3 w-3" />
                    {generatingMessage ? "Generating..." : "AI Generate"}
                  </Button>
                </div>
                <Textarea
                  required
                  value={formData.whyYou}
                  onChange={(e) => setFormData(prev => ({ ...prev, whyYou: e.target.value }))}
                  placeholder="Tell us why you're perfect for this role..."
                  rows={4}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Resume (PDF, DOC, DOCX - max 10MB)</label>
                <div className="mt-2 border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <div className="text-sm">
                    {formData.resume ? (
                      <span className="text-foreground font-medium">{formData.resume.name}</span>
                    ) : (
                      <span className="text-muted-foreground">
                        Drop your resume here or{" "}
                        <label className="text-primary cursor-pointer hover:underline">
                          browse files
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file && file.size <= 10 * 1024 * 1024) {
                                setFormData(prev => ({ ...prev, resume: file }));
                              } else if (file) {
                                toast({
                                  title: "File too large",
                                  description: "Please select a file under 10MB.",
                                  variant: "destructive",
                                });
                              }
                            }}
                            className="hidden"
                          />
                        </label>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit My Application"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplyPage;