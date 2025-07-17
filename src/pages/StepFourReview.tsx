import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApplicationFormData } from "@/hooks/useApplicationFormData";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Briefcase, MapPin, Edit } from "lucide-react";

interface ReviewPageProps {}

const ReviewPage: React.FC<ReviewPageProps> = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const contextData = useApplicationFormData();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-submit on page load
  useEffect(() => {
    if (!submitted && contextData.formData.fullName && !contextData.isLoading) {
      setSubmitted(true);
      contextData.submitApplication().then((res) => {
        if (res.success) {
          navigate("/apply/step-5", {
            state: { name: contextData.formData.fullName || "there" },
          });
        } else {
          toast({
            title: "❌ Something went wrong",
            description: "Please try again",
            variant: "destructive",
          });
          setSubmitted(false);
        }
      });
    }
  }, [submitted, contextData.formData.fullName, contextData.isLoading, contextData, navigate, toast]);

  if (contextData.isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-foreground">Loading your application...</span>
        </div>
      </div>
    );
  }

  if (!contextData.formData.fullName || !contextData.formData.email) {
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

  const userData = contextData.formData;

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
                    {userData.fullName || "Not provided"}
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
                    {userData.email || "Not provided"}
                  </p>
                  {userData.phone && (
                    <p className="text-sm text-muted-foreground">
                      {userData.phone}
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
                    {userData.jobType || "Not specified"}
                  </p>
                  {userData.schedule && (
                    <p className="text-sm text-muted-foreground">
                      {userData.schedule} - {userData.availability}
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
                    {userData.neighborhood ? `${userData.city}, ${userData.neighborhood}` : userData.city || "Not specified"}
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

      {/* Auto-submitting indicator */}
      <div className="pt-8 pb-6">
        <div className="w-full h-14 flex items-center justify-center bg-primary/10 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-primary font-medium">Submitting your application...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;