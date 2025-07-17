import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplicationForm } from '@/contexts/ApplicationFormContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const StepFourReferral = () => {
  const navigate = useNavigate();
  const { formData, updateField, saveCurrentStep, goToStep, isLoading } = useApplicationForm();
  const { toast } = useToast();

  const [email, setEmail] = useState(formData.email || '');
  const [source, setSource] = useState('direct');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sourceOptions = [
    { value: 'direct', label: 'Job search website' },
    { value: 'friend', label: 'Friend or family' },
    { value: 'social', label: 'Social media' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'other', label: 'Other' }
  ];

  const handleNext = async () => {
    // Email is optional, but if provided should be valid
    if (email && !email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Update form data
    updateField('email', email.trim());
    updateField('step', 4);

    // Save current step
    const saved = await saveCurrentStep();
    if (saved) {
      // Navigate to step 5 (review)
      if (goToStep(5)) {
        navigate('../step-5');
      }
    }
  };

  const handleBack = () => {
    navigate('../step-3');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Step 4 of 5</span>
            <span className="text-sm font-medium text-primary">80%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '80%' }}></div>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Almost there! 🎯
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Help us understand how you found us
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address (Optional)
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
              <p className="text-xs text-muted-foreground">
                We'll use this to send you updates about your application
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="source" className="text-sm font-medium">
                How did you hear about this job? *
              </Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select how you found us" />
                </SelectTrigger>
                <SelectContent>
                  {sourceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex-1 h-12"
              >
                ← Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={isLoading}
                className="flex-1 h-12 text-base font-semibold"
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StepFourReferral;