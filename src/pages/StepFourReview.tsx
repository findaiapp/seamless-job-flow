import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApplicationFormData } from "@/hooks/useApplicationFormData";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Briefcase, MapPin, Edit } from "lucide-react";

const StepFourReview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formData, submitApplication, isLoading } = useApplicationFormData();
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const result = await submitApplication();
      
      if (result.success) {
        toast({
          title: "🎉 Application submitted!",
          description: "We'll review your application shortly",
        });
        
        navigate("/apply/step-5", { 
          state: { name: formData.fullName || "there" }
        });
      } else {
        toast({
          title: "❌ Submission failed",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "❌ Something went wrong",
        description: "Please try again",
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

  if (!formData.fullName || !formData.email) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Please Complete Previous Steps</h2>
          <p className="text-muted-foreground mb-4">Let's start your application from the beginning.</p>
          <Button onClick={() => navigate("/apply/step-1")}>
            Start Application →
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col px-4 py-6 md:px-6 md:py-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 animate-fade-in">
          Review Your Application
        </h1>
        <p className="text-muted-foreground text-base md:text-lg animate-fade-in">
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
                    {formData.fullName || "Not provided"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/apply/step-1")}
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
                    {formData.email || "Not provided"}
                  </p>
                  {formData.phone && (
                    <p className="text-sm text-muted-foreground">
                      {formData.phone}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/apply/step-1")}
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
                    {formData.jobType || "Not specified"}
                  </p>
                  {formData.schedule && (
                    <p className="text-sm text-muted-foreground">
                      {formData.schedule} - {formData.availability}
                    </p>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/apply/step-2")}
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
                    {formData.neighborhood ? `${formData.city}, ${formData.neighborhood}` : formData.city || "Not specified"}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/apply/step-3")}
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
          onClick={handleSubmit}
          disabled={isSubmitting || isLoading}
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