import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const StepOnePersonalInfo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
  });

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
    setFormData(prev => ({ ...prev, [field]: value }));
    
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

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const insertApplication = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert([{
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          status: 'in_progress',
          company_name: 'TBD', // Required field, will be set in later steps
          job_title: 'TBD', // Required field, will be set in later steps
          job_id: 'temp-' + Date.now(), // Temporary ID, will be updated in later steps
        }])
        .select()
        .single();

      if (error) {
        console.error("❌ Supabase insert error:", error);
        toast({
          title: "❌ Application failed",
          description: error.message,
          variant: "destructive",
        });
        return { success: false };
      }

      console.log("✅ Application progress saved", data);
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
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const result = await insertApplication();
      
      if (result.success) {
        toast({
          title: "🎉 Progress saved!",
          description: "Let's continue with your preferences",
        });
        navigate("/step-two-preferences");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.fullName.trim() && formData.email.trim() && formData.phone.trim();

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
            value={formData.fullName}
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
            value={formData.email}
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
            value={formData.phone}
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