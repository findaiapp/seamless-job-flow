import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplicationForm } from '@/contexts/ApplicationFormContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const StepThreeLocation = () => {
  const navigate = useNavigate();
  const { formData, updateFormData, saveToSupabase, isLoading } = useApplicationForm();
  const { toast } = useToast();

  const [referralCode, setReferralCode] = useState(formData.referralCode);
  const [source, setSource] = useState(formData.source);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sourceOptions = [
    'Google Search',
    'Social Media (Instagram, TikTok, etc.)',
    'Friend/Family Referral',
    'Job Board (Indeed, LinkedIn, etc.)',
    'Company Website',
    'Other'
  ];

  const handleNext = async () => {
    if (!source) {
      toast({
        title: "Missing Information",
        description: "Please tell us how you heard about us",
        variant: "destructive",
      });
      return;
    }

    updateFormData({
      referralCode: referralCode.trim(),
      source,
      currentStep: 4,
    });

    await saveToSupabase();
    navigate('/apply/step-4');
  };

  const handleBack = () => {
    navigate('/apply/step-2');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Step 3 of 4</span>
            <span className="text-sm font-medium text-primary">75%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '75%' }}></div>
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
              <Label htmlFor="source" className="text-sm font-medium">
                How did you hear about us? *
              </Label>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select how you found us" />
                </SelectTrigger>
                <SelectContent>
                  {sourceOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="referralCode" className="text-sm font-medium">
                Referral Code <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="referralCode"
                type="text"
                placeholder="Enter referral code if you have one"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                className="h-12"
              />
              <p className="text-xs text-muted-foreground">
                Got a referral code from a friend? Enter it here for potential bonuses!
              </p>
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

export default StepThreeLocation;