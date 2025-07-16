import { useState, useEffect } from "react";
import { useParams, useSearchParams, Navigate, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, DollarSign, Shield, Upload, Sparkles, User, CheckCircle, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useReferralTracking } from "@/hooks/useReferralTracking";

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
  const navigate = useNavigate();
  const { toast } = useToast();
  const { getReferralCode } = useReferralTracking();
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [generatingMessage, setGeneratingMessage] = useState(false);
  
  // Multi-step progress state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    fullName: "",
    phone: "",
    email: "",
    location: "",
    
    // Step 2: Skills & Availability  
    positionApplyingFor: "",
    experience: "",
    skills: "",
    skillsDescription: "",
    availability: "",
    whyYou: "",
    resume: null as File | null,
    
    // Step 3: Referral & Source
    howHeard: "",
    referralSource: "",
  });

  const [applicantsToday, setApplicantsToday] = useState(0);

  // Progress calculation
  const getProgress = (): number => {
    return (currentStep / totalSteps) * 100;
  };

  // Step validation
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.fullName && formData.phone && formData.email);
      case 2:
        return !!(formData.skillsDescription && formData.availability);
      case 3:
        return true; // Optional fields
      default:
        return false;
    }
  };

  // Get today's application count
  const getTodayApplicationCount = async (jobId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const { count } = await supabase
      .from('applications')
      .select('*', { count: 'exact', head: true })
      .eq('job_id', jobId)
      .gte('created_at', today);
    return count || 0;
  };

  // Smart prefill logic for Craigslist
  useEffect(() => {
    const prefillData = () => {
      // Get saved data from localStorage
      const savedData = localStorage.getItem('apply_prefill_data');
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setFormData(prev => ({ ...prev, ...parsed }));
        } catch (error) {
          console.error('Error parsing saved data:', error);
        }
      }

      // Enhanced smart prefill from URL params for Craigslist
      const ref = searchParams.get('ref');
      const utmSource = searchParams.get('utm_source');
      const utmCampaign = searchParams.get('utm_campaign');
      const jobParam = searchParams.get('job');
      const cityParam = searchParams.get('city');
      
      // Craigslist-specific prefilling
      if (utmSource === 'craigslist' || utmCampaign === 'craigslist') {
        setFormData(prev => ({ 
          ...prev, 
          howHeard: 'Craigslist',
          referralSource: 'craigslist',
          ...(jobParam && { experience: `${jobParam.replace('-', ' ')} experience` }),
          ...(cityParam && { location: cityParam.charAt(0).toUpperCase() + cityParam.slice(1) })
        }));
      } else if (ref) {
        localStorage.setItem('referral_code', ref);
        setFormData(prev => ({ ...prev, referralSource: ref, howHeard: 'Referral Link' }));
      }
    };

    prefillData();
  }, [searchParams]);

  // Save form data to localStorage on changes
  useEffect(() => {
    localStorage.setItem('apply_prefill_data', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const fetchJob = async () => {
      if (!job_id) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_posted_jobs')
          .select('*')
          .eq('id', job_id)
          .maybeSingle();

        if (error) throw error;

        if (!data) {
          setNotFound(true);
        } else {
          // Transform Supabase data to Job interface
          const transformedJob: Job = {
            id: data.id,
            title: data.job_title || 'Unknown Position',
            company: data.company || 'Unknown Company',
            pay_range: '$15-25/hr', // Default since no pay_range field exists
            location: data.location || 'Remote',
            description: data.description || 'No description available',
            created_at: data.created_at
          };
          setJob(transformedJob);
          
          // Auto-fill position applying for
          setFormData(prev => ({ 
            ...prev, 
            positionApplyingFor: transformedJob.title 
          }));

          // Get today's application count
          const count = await getTodayApplicationCount(job_id);
          setApplicantsToday(count);
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [job_id]);

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

  const handleSubmit = async () => {
    if (!job_id || !isStepValid(1) || !isStepValid(2)) {
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
          setSubmitting(false);
          return;
        }
      }

      const referralCode = getReferralCode() || formData.referralSource;
      
      // Extract UTM parameters and source tracking
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source') || '';
      const utmCampaign = urlParams.get('utm_campaign') || '';
      const utmMedium = urlParams.get('utm_medium') || '';
      const refParam = urlParams.get('ref') || '';
      
      // Insert application with UTM tracking
      const { data: applicationData, error: appError } = await supabase
        .from('applications')
        .insert({
          job_id: job_id,
          name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          location: formData.location,
          position_applied_for: formData.positionApplyingFor,
          why_you: formData.whyYou,
          skills_description: formData.skillsDescription,
          availability: formData.availability,
          resume_url: resumeUrl,
          referral_code: referralCode,
          company_name: job?.company || '',
          job_title: job?.title || '',
          ref_source: formData.howHeard,
          // UTM tracking fields (if they exist in your schema)
          utm_source: utmSource,
          utm_campaign: utmCampaign,
          utm_medium: utmMedium,
        })
        .select()
        .single();

      if (appError) throw appError;

      // Save referral data if present
      if (referralCode && applicationData) {
        await supabase.from('referral_tracking').insert({
          referral_code: referralCode,
          referral_type: 'job_application',
          referrer_id: '00000000-0000-0000-0000-000000000000', // anonymous
          referred_id: applicationData.id
        });
      }

      // Clear saved data
      localStorage.removeItem('apply_prefill_data');
      
      // Enhanced completion routing to /search-jobs
      toast({
        title: "You're in the loop! 👀",
        description: "We'll text/email you if you're a match.",
      });
      
      // Redirect to search-jobs instead of thank-you
      navigate('/search-jobs');
      
    } catch (error: any) {
      console.error('Submission error:', error);
      
      // Check for duplicate application
      if (error.message?.includes('duplicate') || error.code === '23505') {
        toast({
          title: "Already applied!",
          description: "Looks like you've already applied! Browse more jobs below.",
        });
        navigate('/search-jobs');
        return;
      }
      
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps && isStepValid(currentStep)) {
      setCurrentStep(currentStep + 1);
    } else if (!isStepValid(currentStep)) {
      toast({
        title: "Complete required fields",
        description: "Please fill in all required fields before continuing.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepTitles = [
    "Basic Info",
    "Your Skills & Availability", 
    "Confirm & Submit"
  ];

  const stepIcons = [User, FileText, CheckCircle];

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Show skeleton header */}
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 w-24 bg-muted rounded animate-pulse"></div>
              <div className="h-8 w-16 bg-muted rounded animate-pulse"></div>
            </div>
            <div className="h-2 bg-muted rounded animate-pulse"></div>
          </div>
        </header>
        
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <div className="text-lg">Loading job details...</div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return <Navigate to="/search-jobs" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Craigslist Trust Box */}
      {formData.howHeard === 'Craigslist' && (
        <div className="sticky top-0 z-50 bg-green-50 border-b border-green-200 text-green-800">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                You're in the right place
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                Secure application via Hireloop — no signup required
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Marie from Luigi's Pizza is reviewing applicants now
              </div>
            </div>
            <div className="text-center mt-1 text-xs">
              💼 We're hiring for: Delivery Drivers, Cooks, Front Desk
            </div>
          </div>
        </div>
      )}
      
      {/* Sticky Progress Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold">Apply Now</h1>
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              Back
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              {stepTitles.map((title, index) => {
                const StepIcon = stepIcons[index];
                const isActive = currentStep === index + 1;
                const isCompleted = currentStep > index + 1;
                
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-1 ${
                      isActive ? 'text-primary font-medium' : 
                      isCompleted ? 'text-green-600' : 'text-muted-foreground'
                    }`}
                  >
                    <StepIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">{title}</span>
                    <span className="sm:hidden">{index + 1}</span>
                  </div>
                );
              })}
            </div>
            <Progress value={getProgress()} className="h-2" />
            <div className="text-xs text-muted-foreground text-center">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
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
              {formData.howHeard === 'Craigslist' && (
                <Badge variant="outline" className="text-xs">
                  Craigslist Lead
                </Badge>
              )}
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
            <p className="text-sm text-muted-foreground mb-4">{job?.description}</p>
            
            {/* Applicants Today Counter */}
            {applicantsToday > 0 && (
              <div className="flex items-center gap-2 p-3 bg-primary/10 text-primary rounded-lg border border-primary/20">
                <span className="text-sm font-medium">
                  👀 {applicantsToday} people applied today for this job!
                  {applicantsToday > 10 && (
                    <span className="ml-1 animate-pulse">🔥</span>
                  )}
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Multi-Step Form */}
        <Card>
          <CardHeader>
            <CardTitle>{stepTitles[currentStep - 1]}</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
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
                  <label className="text-sm font-medium">Location</label>
                  <Input 
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Your city, state"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Skills & Availability */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Position Applying For</label>
                  <Select 
                    value={formData.positionApplyingFor} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, positionApplyingFor: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={job?.title || ""}>{job?.title}</SelectItem>
                      <SelectItem value="Delivery Driver">Delivery Driver</SelectItem>
                      <SelectItem value="Kitchen Staff">Kitchen Staff</SelectItem>
                      <SelectItem value="Front Desk">Front Desk</SelectItem>
                      <SelectItem value="Customer Service">Customer Service</SelectItem>
                      <SelectItem value="Sales Associate">Sales Associate</SelectItem>
                      <SelectItem value="Cook">Cook</SelectItem>
                      <SelectItem value="Server">Server</SelectItem>
                      <SelectItem value="Childcare">Childcare</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Tell us about your skills *</label>
                  <Textarea
                    required
                    value={formData.skillsDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, skillsDescription: e.target.value }))}
                    placeholder="List past experience, certifications, languages, etc."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Why are you a great fit?</label>
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
                    value={formData.whyYou}
                    onChange={(e) => setFormData(prev => ({ ...prev, whyYou: e.target.value }))}
                    placeholder="Tell us why you're perfect for this role..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Availability *</label>
                  <Select value={formData.availability} onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="When can you start?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediately">Immediately</SelectItem>
                      <SelectItem value="within_week">Within a week</SelectItem>
                      <SelectItem value="within_month">Within a month</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
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
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {currentStep === 3 && (
              <div className="space-y-6">
                {/* Resume Preview */}
                <Card className="border-dashed">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Resume Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="font-medium text-lg">{formData.fullName}</div>
                      <div className="text-sm text-muted-foreground">
                        {formData.email} • {formData.phone}
                        {formData.location && ` • ${formData.location}`}
                      </div>
                    </div>
                    
                    {formData.whyYou && (
                      <div>
                        <div className="font-medium text-sm">Why I'm a great fit:</div>
                        <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                          {formData.whyYou}
                        </div>
                      </div>
                    )}
                    
                    {formData.skills && (
                      <div>
                        <div className="font-medium text-sm">Skills:</div>
                        <div className="text-sm text-muted-foreground">{formData.skills}</div>
                      </div>
                    )}
                    
                    <div>
                      <div className="font-medium text-sm">Availability:</div>
                      <div className="text-sm text-muted-foreground capitalize">
                        {formData.availability.replace('_', ' ')}
                      </div>
                    </div>
                    
                    {formData.resume && (
                      <div>
                        <div className="font-medium text-sm">Resume:</div>
                        <div className="text-sm text-muted-foreground">{formData.resume.name}</div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Referral Capture */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">How'd you hear about us?</label>
                    <Select value={formData.howHeard} onValueChange={(value) => setFormData(prev => ({ ...prev, howHeard: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Craigslist">Craigslist</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Friend">Friend referral</SelectItem>
                        <SelectItem value="Google">Google search</SelectItem>
                        <SelectItem value="Indeed">Indeed</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.referralSource && (
                    <div>
                      <label className="text-sm font-medium">Referral Code</label>
                      <Input 
                        value={formData.referralSource}
                        onChange={(e) => setFormData(prev => ({ ...prev, referralSource: e.target.value }))}
                        placeholder="Referral code (if any)"
                        disabled={!!getReferralCode()}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 pt-4 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={submitting || !isStepValid(1) || !isStepValid(2)}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  {submitting ? "Submitting..." : "Submit Application"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Trust Boost Section */}
        <Card className="mt-6 border-border/50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <div className="text-sm font-medium text-foreground mb-1">
                  🔒 Your info is secure.
                </div>
                <div className="text-xs text-muted-foreground">
                  We use your application ONLY to connect you with employers on Hireloop. 
                  You'll never be spammed or auto-charged.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplyPage;