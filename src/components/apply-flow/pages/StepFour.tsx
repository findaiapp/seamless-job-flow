import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApplicationForm } from "../context/ApplicationFormContext";
import { Gift, ArrowLeft, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StepFour = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formData, updateField, goToStep, saveCurrentStep, isLoading } = useApplicationForm();
  
  const [referralCode, setReferralCode] = useState(formData.referralCode || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleReferralChange = (value: string) => {
    setReferralCode(value);
    updateField('referralCode', value);
  };

  const handleBack = () => {
    if (goToStep(3)) {
      navigate("../step-3");
    }
  };

  const handleContinue = async () => {
    // Referral code is optional, save current step and continue
    const saved = await saveCurrentStep();
    if (saved && goToStep(5)) {
      navigate("../step-5");
    }
  };

  const handleSkip = async () => {
    const saved = await saveCurrentStep();
    if (saved && goToStep(5)) {
      navigate("../step-5");
    }
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
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Referral Code 🎁
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Have a referral code? Enter it here (optional)
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Benefits Card */}
            <Card className="border border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Referral Benefits</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Get priority consideration for your application</li>
                  <li>• Help connect with current employees</li>
                  <li>• Support our employee referral program</li>
                </ul>
              </CardContent>
            </Card>

            {/* Referral Code Input */}
            <div className="space-y-2">
              <Label htmlFor="referralCode" className="text-sm font-medium flex items-center gap-2">
                <Gift className="h-4 w-4 text-primary" />
                Referral Code (Optional)
              </Label>
              <Input
                id="referralCode"
                type="text"
                value={referralCode}
                onChange={(e) => handleReferralChange(e.target.value.toUpperCase())}
                placeholder="Enter referral code"
                className="h-12 text-base font-mono tracking-wider"
                style={{ textTransform: 'uppercase' }}
              />
              <p className="text-xs text-muted-foreground">
                If someone referred you to this position, enter their code here
              </p>
            </div>

            {/* Where to Find Code */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-2">Don't have a code?</h3>
                <p className="text-sm text-muted-foreground">
                  Referral codes are typically shared by current employees or through special recruitment campaigns. If you don't have one, you can skip this step.
                </p>
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <Button
                onClick={handleBack}
                variant="outline"
                className="flex-1 h-12 text-base"
                size="lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              
              <div className="flex gap-2 flex-1">
                <Button
                  onClick={handleSkip}
                  variant="ghost"
                  className="h-12 text-base px-4"
                  disabled={isLoading}
                >
                  Skip
                </Button>
                
                <Button
                  onClick={handleContinue}
                  disabled={isLoading}
                  className="flex-1 h-12 text-base font-semibold"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </div>
                  ) : (
                    'Continue to Review →'
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StepFour;