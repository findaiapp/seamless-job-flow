import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useApplicationFormData } from "@/hooks/useApplicationFormData";
import { useToast } from "@/hooks/use-toast";

const StepOnePersonalInfo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formData, updateFormData, saveToSupabase, isLoading } = useApplicationFormData();
  
  const [localFormData, setLocalFormData] = useState({
    fullName: formData.fullName,
    email: formData.email,
    phone: formData.phone,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

  // Sync with global form data
  useEffect(() => {
    setLocalFormData({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
    });
  }, [formData]);

  // Autofocus on Full Name when page loads
  useEffect(() => {
    const fullNameInput = document.getElementById("fullName");
    if (fullNameInput) {
      fullNameInput.focus();
    }
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (field: string, value: string) => {
    setLocalFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors on input change
    if (field === "email" && errors.email) {
      setErrors(prev => ({ ...prev, email: "" }));
    }
    if (field === "phone" && errors.phone) {
      setErrors(prev => ({ ...prev, phone: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = { email: "", phone: "" };
    let isValid = true;

    if (localFormData.email && !validateEmail(localFormData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (localFormData.phone && !validatePhone(localFormData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Update global form data
      updateFormData({
        fullName: localFormData.fullName,
        email: localFormData.email,
        phone: localFormData.phone,
        currentStep: 2,
      });

      // Save to Supabase
      const result = await saveToSupabase();
      
      if (result.success) {
        toast({
          title: "🎉 Progress saved!",
          description: "Let's continue with your preferences",
        });
        navigate("/apply/step-2");
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

  const isFormValid = localFormData.fullName.trim() && localFormData.email.trim() && localFormData.phone.trim();

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      {/* Header */}
      <div className="pt-8 pb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in">
          Let's Start With You
        </h1>
        <p className="text-muted-foreground text-lg animate-fade-in">
          Employers love fast applicants. Let's make yours shine.
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6">
        {/* Full Name */}
        <div className="space-y-2 animate-fade-in">
          <Label htmlFor="fullName" className="text-foreground font-medium">
            Full Name
          </Label>
          <Input
            id="fullName"
            type="text"
            value={localFormData.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            placeholder="Enter your full name"
            className="h-12 text-lg transition-all duration-200 focus:scale-[1.02] hover-scale"
          />
        </div>

        {/* Email */}
        <div className="space-y-2 animate-fade-in">
          <Label htmlFor="email" className="text-foreground font-medium">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={localFormData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            placeholder="Enter your email address"
            className="h-12 text-lg transition-all duration-200 focus:scale-[1.02] hover-scale"
          />
          {errors.email && (
            <p className="text-destructive text-sm animate-fade-in">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2 animate-fade-in">
          <Label htmlFor="phone" className="text-foreground font-medium">
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            value={localFormData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="Enter your phone number"
            className="h-12 text-lg transition-all duration-200 focus:scale-[1.02] hover-scale"
          />
          {errors.phone && (
            <p className="text-destructive text-sm animate-fade-in">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Next Button - Pinned to bottom */}
      <div className="pt-8 pb-6">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className="w-full h-14 text-lg font-semibold transition-all duration-200 hover:scale-[1.02]"
          size="lg"
        >
          {isSubmitting ? "Saving..." : "Next →"}
        </Button>
      </div>
    </div>
  );
};

export default StepOnePersonalInfo;