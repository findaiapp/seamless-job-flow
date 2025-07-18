import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApplicationForm } from "../context/ApplicationFormContext";
import { User, Phone, MapPin, Mail } from "lucide-react";
import { JobCard } from "../components/JobCard";
import { useToast } from "@/hooks/use-toast";
import AutofillBar from "../components/AutofillBar";
import MotivationBanner from "../components/MotivationBanner";

const StepOne = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formData, updateField, goToStep, saveCurrentStep, isLoading, job } = useApplicationForm();
  
  const [localData, setLocalData] = useState({
    fullName: formData.fullName || '',
    phoneNumber: formData.phoneNumber || '',
    location: formData.location || '',
    email: formData.email || ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
    updateField(field, value);
  };

  const handleAutofill = (autofillData: any) => {
    setLocalData(prev => ({ ...prev, ...autofillData }));
    Object.keys(autofillData).forEach(key => {
      updateField(key, autofillData[key]);
    });
  };

  const handleContinue = async () => {
    if (!localData.fullName.trim() || !localData.phoneNumber.trim() || !localData.location.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, phone, and location",
        variant: "destructive",
      });
      return;
    }

    // Save current step
    const saved = await saveCurrentStep();
    if (saved && goToStep(2)) {
      navigate("../step-2");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-lg mx-auto">
        {/* Job Card */}
        {job && <JobCard job={job} />}
        
        {/* Autofill Bar */}
        <AutofillBar onAutofill={handleAutofill} currentFormData={localData} />
        
        {/* Motivation Banner */}
        <MotivationBanner step={1} />
        
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Step 1 of 5</span>
            <span className="text-sm font-medium text-primary">20%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '20%' }}></div>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Personal Information 👤
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Let's start with your basic contact details
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                value={localData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter your full name"
                className="h-12 text-base"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-sm font-medium flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                Phone Number *
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={localData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="(555) 123-4567"
                className="h-12 text-base"
                required
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                Location *
              </Label>
              <Input
                id="location"
                type="text"
                value={localData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, State"
                className="h-12 text-base"
                required
              />
            </div>

            {/* Email (Optional) */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Email (Optional)
              </Label>
              <Input
                id="email"
                type="email"
                value={localData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your.email@example.com"
                className="h-12 text-base"
              />
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold mt-8"
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                'Continue to Skills & Availability →'
              )}
            </Button>

            {/* Required Fields Notice */}
            <p className="text-xs text-muted-foreground text-center mt-4">
              * Required fields
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StepOne;