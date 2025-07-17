import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplicationForm } from '@/contexts/ApplicationFormContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileText, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const StepThreeResumeUpload = () => {
  const navigate = useNavigate();
  const { formData, updateField, saveCurrentStep, goToStep, isLoading } = useApplicationForm();
  const { toast } = useToast();

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState(formData.resumeUrl);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      // Check file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF or Word document",
          variant: "destructive",
        });
        return;
      }

      setResumeFile(file);
    }
  };

  const uploadResume = async (): Promise<string | null> => {
    if (!resumeFile) return null;

    setUploading(true);
    try {
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `resume-${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('resumes')
        .upload(fileName, resumeFile);

      if (error) {
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: "Failed to upload resume. Please try again.",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleNext = async () => {
    let finalResumeUrl = resumeUrl;

    // Upload file if selected
    if (resumeFile) {
      const uploadedUrl = await uploadResume();
      if (uploadedUrl) {
        finalResumeUrl = uploadedUrl;
      } else {
        return; // Upload failed
      }
    }

    // Update form data
    updateField('resumeUrl', finalResumeUrl || '');
    updateField('step', 3);

    // Save current step
    const saved = await saveCurrentStep();
    if (saved) {
      // Navigate to step 4
      if (goToStep(4)) {
        navigate('../step-4');
      }
    }
  };

  const handleBack = () => {
    navigate('../step-2');
  };

  const removeFile = () => {
    setResumeFile(null);
    setResumeUrl('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-lg mx-auto">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">Step 3 of 5</span>
            <span className="text-sm font-medium text-primary">60%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '60%' }}></div>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Resume & Experience 📄
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Upload your resume or provide a link to your portfolio
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* File Upload */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Upload Resume <span className="text-muted-foreground">(optional)</span>
              </Label>
              
              {!resumeFile && !resumeUrl && (
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your resume here, or click to browse
                  </p>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                  />
                  <Label
                    htmlFor="resume-upload"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90"
                  >
                    <Upload className="w-4 h-4" />
                    Choose File
                  </Label>
                  <p className="text-xs text-muted-foreground mt-2">
                    PDF, DOC, or DOCX (max 5MB)
                  </p>
                </div>
              )}

              {resumeFile && (
                <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="flex-1 text-sm font-medium text-foreground">
                    {resumeFile.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="p-1 h-auto"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {resumeUrl && !resumeFile && (
                <div className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="flex-1 text-sm font-medium text-foreground">
                    Resume uploaded
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="p-1 h-auto"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>

            <div className="text-center text-muted-foreground text-sm">
              <span>or</span>
            </div>

            {/* URL Input */}
            <div className="space-y-2">
              <Label htmlFor="resumeUrl" className="text-sm font-medium">
                Resume/Portfolio URL <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="resumeUrl"
                type="url"
                placeholder="https://your-resume-link.com"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                className="h-12"
                disabled={!!resumeFile}
              />
              <p className="text-xs text-muted-foreground">
                Link to your online resume, LinkedIn, or portfolio
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
                disabled={isLoading || uploading}
                className="flex-1 h-12 text-base font-semibold"
                size="lg"
              >
                {uploading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Uploading...
                  </div>
                ) : isLoading ? (
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

export default StepThreeResumeUpload;