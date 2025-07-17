import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApplicationFormData } from "@/hooks/useApplicationFormData";
import { useToast } from "@/hooks/use-toast";

const StepTwoPreferences = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formData, updateFormData, saveToSupabase, isLoading } = useApplicationFormData();
  
  const [localFormData, setLocalFormData] = useState({
    jobType: formData.jobType,
    schedule: formData.schedule,
    availability: formData.availability,
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

  // Sync with global form data
  useEffect(() => {
    setLocalFormData({
      jobType: formData.jobType,
      schedule: formData.schedule,
      availability: formData.availability,
    });
  }, [formData]);

  const handleSelectChange = (field: string, value: string) => {
    setLocalFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Update global form data
      updateFormData({
        jobType: localFormData.jobType,
        schedule: localFormData.schedule,
        availability: localFormData.availability,
        currentStep: 3,
      });

      // Save to Supabase
      const result = await saveToSupabase();
      
      if (result.success) {
        toast({
          title: "🎉 Preferences saved!",
          description: "Let's continue with your location",
        });
        navigate("/apply/step-3");
      } else {
        toast({
          title: "❌ Save failed",
          description: "Please try again",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = localFormData.jobType && localFormData.schedule && localFormData.availability;

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
          <Select value={localFormData.jobType} onValueChange={(value) => handleSelectChange("jobType", value)}>
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
          <Select value={localFormData.schedule} onValueChange={(value) => handleSelectChange("schedule", value)}>
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
          <Select value={localFormData.availability} onValueChange={(value) => handleSelectChange("availability", value)}>
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
        {!localFormData.jobType && (
          <p className="text-muted-foreground text-sm animate-fade-in">
            👆 Please select your preferred job type
          </p>
        )}
        {localFormData.jobType && !localFormData.schedule && (
          <p className="text-muted-foreground text-sm animate-fade-in">
            👆 Please select your schedule preference
          </p>
        )}
        {localFormData.jobType && localFormData.schedule && !localFormData.availability && (
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