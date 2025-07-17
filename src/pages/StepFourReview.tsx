import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Briefcase, MapPin, Edit } from "lucide-react";

interface ApplicationData {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  role: string | null;
  availability: string | null;
  location: string | null;
}

const StepFourReview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [applicationData, setApplicationData] = useState<ApplicationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchApplicationData();
  }, []);

  const fetchApplicationData = async () => {
    try {
      const { data: applications, error } = await supabase
        .from('applications')
        .select('*')
        .eq('status', 'in_progress')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error("❌ Error fetching application:", error);
        toast({
          title: "❌ Error loading your application",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (!applications || applications.length === 0) {
        toast({
          title: "❌ No application found",
          description: "Please start from Step 1",
          variant: "destructive",
        });
        navigate("/step-one-personal-info");
        return;
      }

      setApplicationData(applications[0]);
    } catch (e) {
      console.error("🔥 Unexpected error:", e);
      toast({
        title: "⚠️ Something went wrong",
        description: "Failed to load your application",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const submitApplication = async () => {
    if (!applicationData) return;

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('applications')
        .update({
          status: 'submitted',
          submitted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', applicationData.id)
        .select()
        .single();

      if (error) {
        console.error("❌ Supabase submit error:", error);
        toast({
          title: "❌ Submission failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      console.log("✅ Application submitted successfully", data);
      
      // Navigate to success page with the applicant's name
      navigate("/step-five-success", { 
        state: { name: applicationData.name || "there" }
      });
      
    } catch (e) {
      console.error("🔥 Unexpected error:", e);
      toast({
        title: "⚠️ Something went wrong",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-foreground">Loading your application...</span>
        </div>
      </div>
    );
  }

  if (!applicationData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">No Application Found</h2>
          <p className="text-muted-foreground mb-4">Let's start your application from the beginning.</p>
          <Button onClick={() => navigate("/step-one-personal-info")}>
            Start Application →
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      {/* Header */}
      <div className="pt-8 pb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in">
          Review Your Application
        </h1>
        <p className="text-muted-foreground text-lg animate-fade-in">
          Make sure everything looks right before we send it off.
        </p>
      </div>

      {/* Review Sections */}
      <div className="flex-1 space-y-4">
        {/* Personal Info */}
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Personal Information</h3>
                  <p className="text-sm text-muted-foreground">
                    {applicationData.name || "Not provided"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/step-one-personal-info")}
                className="p-2"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Contact Information</h3>
                  <p className="text-sm text-muted-foreground">
                    {applicationData.email || "Not provided"}
                  </p>
                  {applicationData.phone && (
                    <p className="text-sm text-muted-foreground">
                      {applicationData.phone}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/step-one-personal-info")}
                className="p-2"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Job Preferences */}
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Job Preferences</h3>
                  <p className="text-sm text-muted-foreground">
                    {applicationData.role || "Not specified"}
                  </p>
                  {applicationData.availability && (
                    <p className="text-sm text-muted-foreground">
                      {applicationData.availability}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/step-two-preferences")}
                className="p-2"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card className="animate-fade-in">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold text-foreground">Preferred Location</h3>
                  <p className="text-sm text-muted-foreground">
                    {applicationData.location || "Not specified"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/step-three-location")}
                className="p-2"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submit Button - Pinned to bottom */}
      <div className="pt-8 pb-6">
        <Button
          onClick={submitApplication}
          disabled={isSubmitting}
          className="w-full h-14 text-lg font-semibold transition-all duration-200 hover:scale-[1.02]"
          size="lg"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Submitting...
            </div>
          ) : (
            "Looks Good – Submit →"
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepFourReview;