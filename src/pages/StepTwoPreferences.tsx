import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplicationForm } from '@/components/apply-flow/context/ApplicationFormContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const StepTwoPreferences = () => {
  const navigate = useNavigate();
  const { formData, updateField, saveCurrentStep, goToStep, isLoading } = useApplicationForm();
  const { toast } = useToast();

  const [experience, setExperience] = useState(formData.experience || '');
  const [availability, setAvailability] = useState(formData.availability);
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const availabilityOptions = [
    'Immediately',
    'Within 1 week',
    'Within 2 weeks',
    'Within 1 month',
    'Flexible'
  ];

  const handleNext = async () => {
    if (!experience.trim() || !availability) {
      toast({
        title: "Missing Information",
        description: "Please fill in your experience and availability",
        variant: "destructive",
      });
      return;
    }

    // Update form data
    updateField('experience', experience.trim());
    updateField('availability', availability);
    updateField('step', 2);

    // Save current step
    const saved = await saveCurrentStep();
    if (saved) {
      // Navigate to step 3
      if (goToStep(3)) {
        navigate('../step-3');
      }
    }
  };

  const handleBack = () => {
    navigate('../step-1');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Step 2 of 5</span>
            <span className="text-sm font-medium text-primary">40%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '40%' }}></div>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Skills & Availability 💼
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Tell us about your experience and when you can start
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-sm font-medium">
                Skills & Experience *
              </Label>
              <Textarea
                id="experience"
                placeholder="Describe your relevant skills and experience..."
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="availability" className="text-sm font-medium">
                When can you start? *
              </Label>
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select your availability" />
                </SelectTrigger>
                <SelectContent>
                  {availabilityOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
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

export default StepTwoPreferences;