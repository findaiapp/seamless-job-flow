import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplicationForm } from '@/contexts/ApplicationFormContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const StepOnePersonalInfo = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, saveToSupabase, isLoading } = useApplicationForm();
  const { toast } = useToast();

  const [fullName, setFullName] = useState(formData.fullName);
  const [phone, setPhone] = useState(formData.phone);
  const [location, setLocation] = useState(formData.location);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = async () => {
    if (!fullName.trim() || !phone.trim() || !location.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    updateFormData({
      fullName: fullName.trim(),
      phone: phone.trim(),
      location: location.trim(),
      currentStep: 2,
    });

    // Auto-save progress
    await saveToSupabase();
    navigate('../step-2');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
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
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Basic Info ✨
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Tell us a bit about yourself
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full Name *
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Location *
              </Label>
              <Input
                id="location"
                type="text"
                placeholder="City, State"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-12"
              />
            </div>

            <Button
              onClick={handleNext}
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold mt-8"
              size="lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Saving...
                </div>
              ) : (
                "Continue →"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StepOnePersonalInfo;