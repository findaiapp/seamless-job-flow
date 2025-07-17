import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useApplicationForm } from "@/contexts/ApplicationFormContext";
import { useToast } from "@/hooks/use-toast";
import { User, Phone, MapPin, Briefcase, Clock, Link, Gift, Edit } from "lucide-react";

const StepFiveReview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formData, submitApplication, isLoading } = useApplicationForm();
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-submit on page load
  useEffect(() => {
    if (!submitted && formData.fullName && !isLoading) {
      setSubmitted(true);
      submitApplication().then((success) => {
        if (success) {
          navigate("../success", {
            state: { name: formData.fullName || "there" },
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
  }, [submitted, formData.fullName, isLoading, submitApplication, navigate, toast]);

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

  if (!formData.fullName || !formData.phoneNumber) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Please Complete Previous Steps</h2>
          <p className="text-muted-foreground mb-4">Let's start your application from the beginning.</p>
          <Button onClick={() => navigate("../step-1")}>
            Start Application →
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Step 5 of 5</span>
            <span className="text-sm font-medium text-primary">100%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '100%' }}></div>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-2">
                Review Application 📋
              </h1>
              <p className="text-muted-foreground">
                We're submitting your application now!
              </p>
            </div>

            {/* Review Sections */}
            <div className="space-y-4">
              {/* Personal Info */}
              <Card className="border border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground">Personal Information</h3>
                        <p className="text-sm text-muted-foreground">
                          {formData.fullName}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate("../step-1")}
                      className="p-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="border border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground">Contact & Location</h3>
                        <p className="text-sm text-muted-foreground">
                          {formData.phoneNumber}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formData.location}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate("../step-1")}
                      className="p-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Skills & Availability */}
              <Card className="border border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground">Skills & Availability</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {formData.experience || "Not specified"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Can start: {formData.availability}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate("../step-2")}
                      className="p-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Source */}
              <Card className="border border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Gift className="h-5 w-5 text-primary" />
                      <div>
                        <h3 className="font-semibold text-foreground">Contact Information</h3>
                        {formData.email && (
                          <p className="text-sm text-muted-foreground">
                            Email: {formData.email}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Application submitted
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate("../step-4")}
                      className="p-2"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Auto-submitting indicator */}
            <div className="mt-8">
              <div className="w-full h-14 flex items-center justify-center bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <span className="text-primary font-medium">Submitting your application...</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StepFiveReview;