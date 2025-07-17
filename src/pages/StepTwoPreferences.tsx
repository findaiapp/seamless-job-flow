import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const StepTwoPreferences = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    jobType: "",
    schedule: "",
    availability: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobTypeOptions = [
    "Warehouse",
    "Delivery", 
    "Security",
    "Kitchen",
    "Cashier",
    "Other"
  ];

  const scheduleOptions = [
    "Full-Time",
    "Part-Time", 
    "Overnight",
    "Weekends",
    "Flexible"
  ];

  const availabilityOptions = [
    "ASAP",
    "This Week",
    "Next Week"
  ];

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateApplication = async () => {
    try {
      // Get the most recent application with in_progress status
      const { data: applications, error: fetchError } = await supabase
        .from('applications')
        .select('*')
        .eq('status', 'in_progress')
        .order('created_at', { ascending: false })
        .limit(1);

      if (fetchError) {
        console.error("❌ Error fetching application:", fetchError);
        toast({
          title: "❌ Error finding your application",
          description: fetchError.message,
          variant: "destructive",
        });
        return { success: false };
      }

      if (!applications || applications.length === 0) {
        toast({
          title: "❌ No application found",
          description: "Please start from Step 1",
          variant: "destructive",
        });
        navigate("/step-one-personal-info");
        return { success: false };
      }

      const applicationId = applications[0].id;

      // Update the application with job preferences
      const { data, error } = await supabase
        .from('applications')
        .update({
          // Map form fields to database columns
          role: formData.jobType,
          availability: `${formData.schedule} - ${formData.availability}`,
          updated_at: new Date().toISOString(),
        })
        .eq('id', applicationId)
        .select()
        .single();

      if (error) {
        console.error("❌ Supabase update error:", error);
        toast({
          title: "❌ Update failed",
          description: error.message,
          variant: "destructive",
        });
        return { success: false };
      }

      console.log("✅ Application preferences updated", data);
      return { success: true, id: data.id };
    } catch (e) {
      console.error("🔥 Unexpected error:", e);
      toast({
        title: "⚠️ Something went wrong",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const result = await updateApplication();
      
      if (result.success) {
        toast({
          title: "🎉 Preferences saved!",
          description: "Let's continue with your location",
        });
        navigate("/step-three-location");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.jobType && formData.schedule && formData.availability;

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      {/* Header */}
      <div className="pt-8 pb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in">
          What Kind of Work Are You Looking For?
        </h1>
        <p className="text-muted-foreground text-lg animate-fade-in">
          We'll match you with the best jobs near you.
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6">
        {/* Job Type */}
        <div className="space-y-2 animate-fade-in">
          <Label htmlFor="jobType" className="text-foreground font-medium">
            Job Type
          </Label>
          <Select value={formData.jobType} onValueChange={(value) => handleSelectChange("jobType", value)}>
            <SelectTrigger className="h-12 text-lg transition-all duration-200 focus:scale-[1.02] hover-scale bg-background">
              <SelectValue placeholder="Select a job type" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border z-50">
              {jobTypeOptions.map((option) => (
                <SelectItem key={option} value={option} className="text-foreground hover:bg-accent">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Schedule */}
        <div className="space-y-2 animate-fade-in">
          <Label htmlFor="schedule" className="text-foreground font-medium">
            Schedule Preference
          </Label>
          <Select value={formData.schedule} onValueChange={(value) => handleSelectChange("schedule", value)}>
            <SelectTrigger className="h-12 text-lg transition-all duration-200 focus:scale-[1.02] hover-scale bg-background">
              <SelectValue placeholder="Select your schedule preference" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border z-50">
              {scheduleOptions.map((option) => (
                <SelectItem key={option} value={option} className="text-foreground hover:bg-accent">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Start Availability */}
        <div className="space-y-2 animate-fade-in">
          <Label htmlFor="availability" className="text-foreground font-medium">
            When Can You Start?
          </Label>
          <Select value={formData.availability} onValueChange={(value) => handleSelectChange("availability", value)}>
            <SelectTrigger className="h-12 text-lg transition-all duration-200 focus:scale-[1.02] hover-scale bg-background">
              <SelectValue placeholder="Select your availability" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border z-50">
              {availabilityOptions.map((option) => (
                <SelectItem key={option} value={option} className="text-foreground hover:bg-accent">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Validation Prompts */}
        {!formData.jobType && (
          <p className="text-muted-foreground text-sm animate-fade-in">
            👆 Please select your preferred job type
          </p>
        )}
        {formData.jobType && !formData.schedule && (
          <p className="text-muted-foreground text-sm animate-fade-in">
            👆 Please select your schedule preference
          </p>
        )}
        {formData.jobType && formData.schedule && !formData.availability && (
          <p className="text-muted-foreground text-sm animate-fade-in">
            👆 Please select when you can start
          </p>
        )}
      </div>

      {/* Next Button - Pinned to bottom */}
      <div className="pt-8 pb-6">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className="w-full h-14 text-lg font-semibold transition-all duration-200 hover:scale-[1.02]"
          size="lg"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Saving...
            </div>
          ) : (
            "Next →"
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepTwoPreferences;