import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApplicationForm } from "../context/ApplicationFormContext";
import { Briefcase, Clock, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import MotivationBanner from "../components/MotivationBanner";
import MediaUpload from "../components/MediaUpload";

const StepTwo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formData, updateField, goToStep, saveCurrentStep, isLoading } = useApplicationForm();
  
  const [localData, setLocalData] = useState({
    experience: formData.experience || '',
    availability: formData.availability || ''
  });

  const [mediaUrl, setMediaUrl] = useState(formData.mediaUrl || '');
  const [mediaType, setMediaType] = useState<'video' | 'audio'>(formData.mediaType as 'video' | 'audio' || 'video');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setLocalData(prev => ({ ...prev, [field]: value }));
    updateField(field, value);
  };

  const handleMediaUploaded = (url: string, type: 'video' | 'audio') => {
    setMediaUrl(url);
    setMediaType(type);
    updateField('mediaUrl', url);
    updateField('mediaType', type);
  };

  const handleBack = () => {
    if (goToStep(1)) {
      navigate("../step-1");
    }
  };

  const handleContinue = async () => {
    if (!localData.experience.trim() || !localData.availability) {
      toast({
        title: "Missing Information",
        description: "Please fill in your experience and availability",
        variant: "destructive",
      });
      return;
    }

    // Save current step
    const saved = await saveCurrentStep();
    if (saved && goToStep(3)) {
      navigate("../step-3");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        {/* Motivation Banner */}
        <MotivationBanner step={2} />
        
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
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Skills & Availability ⚡
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Tell us about your experience and when you can start
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Experience */}
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-sm font-medium flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                Relevant Experience *
              </Label>
              <Textarea
                id="experience"
                value={localData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="Describe your relevant work experience, skills, or why you're interested in this position..."
                className="min-h-32 text-base resize-none"
                required
              />
              <p className="text-xs text-muted-foreground">
                Share any relevant experience, even if it's not directly related
              </p>
            </div>

            {/* Availability */}
            <div className="space-y-2">
              <Label htmlFor="availability" className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                When can you start? *
              </Label>
              <Select
                value={localData.availability}
                onValueChange={(value) => handleInputChange('availability', value)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select your availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediately">Immediately</SelectItem>
                  <SelectItem value="within-1-week">Within 1 week</SelectItem>
                  <SelectItem value="within-2-weeks">Within 2 weeks</SelectItem>
                  <SelectItem value="within-1-month">Within 1 month</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Media Upload */}
            <MediaUpload 
              onMediaUploaded={handleMediaUploaded}
              currentMediaUrl={mediaUrl}
              currentMediaType={mediaType}
            />

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
                  'Continue to Resume →'
                )}
              </Button>
            </div>

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

export default StepTwo;