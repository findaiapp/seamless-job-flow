import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, DollarSign, Shield, ArrowRight, CheckCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCraigslistTracker } from "@/hooks/useCraigslistTracker";

interface Job {
  id: string;
  title: string;
  company: string;
  pay_range: string;
  location: string;
  description: string;
}

const ApplyFallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isCraigslistUser } = useCraigslistTracker();
  const [featuredJob, setFeaturedJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Form state for direct application
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    experience: "",
    referralSource: ""
  });

  // Check for Craigslist parameters
  const isFromCraigslist = searchParams.get('utm_source') === 'craigslist' || 
                           searchParams.get('utm_campaign') === 'craigslist';
  const jobParam = searchParams.get('job');
  const cityParam = searchParams.get('city');

  useEffect(() => {
    const fetchFeaturedJob = async () => {
      try {
        // Mock featured job
        const mockJob: Job = {
          id: 'mock-1',
          title: 'Delivery Driver',
          company: 'Quick Delivery Co',
          pay_range: '$18-25/hr',
          location: 'Brooklyn, NY',
          description: 'Join our team of delivery drivers and earn competitive pay with flexible hours.'
        };
        setFeaturedJob(mockJob);
      } catch (error) {
        console.error('Error fetching featured job:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedJob();

    // Smart prefill for Craigslist users
    if (isFromCraigslist) {
      setFormData(prev => ({
        ...prev,
        experience: jobParam ? `${jobParam.replace('-', ' ')} experience` : '',
        referralSource: 'craigslist'
      }));
    }
  }, [isFromCraigslist, jobParam]);

  const handleDirectSubmit = async () => {
    if (!formData.fullName || !formData.phone || !formData.email) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    
    try {
      // Mock submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast({
        title: "✅ Application received!",
        description: "Browse open roles while you wait.",
      });
      
      navigate('/search-jobs');
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

  return (
    <div className="min-h-screen bg-background">
      {/* Craigslist Trust Box */}
      {isCraigslistUser && (
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
          <h2 className="text-3xl font-bold mb-4">
            {isFromCraigslist ? "Apply for Jobs in Your Area" : "Oops! That job link didn't work"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {isFromCraigslist 
              ? `Looking for ${jobParam ? jobParam.replace('-', ' ') + ' jobs' : 'jobs'} in ${cityParam || 'your area'}? You're in the right place!`
              : "Don't worry - we've got plenty of other great opportunities for you"
            }
          </p>
        </div>

        {/* Quick Application Form for Craigslist Users */}
        {isFromCraigslist && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Quick Application</CardTitle>
              <p className="text-sm text-muted-foreground">Get started with a quick application and we'll match you with relevant jobs</p>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <label className="text-sm font-medium">Experience</label>
                <Input 
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  placeholder="Brief description of your experience"
                />
              </div>

              <Button 
                onClick={handleDirectSubmit}
                disabled={submitting}
                className="w-full"
                size="lg"
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </Button>
            </CardContent>
          </Card>
        )}

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