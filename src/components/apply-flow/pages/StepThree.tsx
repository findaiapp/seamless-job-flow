import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApplicationForm } from "../context/ApplicationFormContext";
import { Upload, FileText, ArrowLeft, X, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const StepThree = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formData, updateField, goToStep, saveCurrentStep, isLoading } = useApplicationForm();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadedFile, setUploadedFile] = useState<string>('');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (formData.resumeUrl) {
      setUploadState('success');
      setUploadedFile(formData.resumeUrl);
    }
  }, [formData.resumeUrl]);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF or Word document",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploadState('uploading');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(uploadError.message);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      updateField('resumeUrl', publicUrl);
      setUploadedFile(file.name);
      setUploadState('success');

      toast({
        title: "Resume Uploaded!",
        description: "Your resume has been successfully uploaded",
      });
    } catch (error) {
      console.error('Error uploading resume:', error);
      setUploadState('error');
      toast({
        title: "Upload Failed",
        description: "Failed to upload your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveFile = () => {
    updateField('resumeUrl', '');
    setUploadedFile('');
    setUploadState('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBack = () => {
    if (goToStep(2)) {
      navigate("../step-2");
    }
  };

  const handleContinue = async () => {
    // Resume is optional, but save progress anyway
    const saved = await saveCurrentStep();
    if (saved && goToStep(4)) {
      navigate("../step-4");
    }
  };

  const handleSkip = async () => {
    const saved = await saveCurrentStep();
    if (saved && goToStep(4)) {
      navigate("../step-4");
    }
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
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Upload Resume 📄
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Add your resume to strengthen your application (optional)
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Upload Area */}
            <div className="space-y-4">
              {uploadState === 'idle' && (
                <div
                  onClick={handleFileSelect}
                  className="border-2 border-dashed border-border hover:border-primary transition-colors rounded-lg p-8 text-center cursor-pointer bg-muted/20 hover:bg-muted/40"
                >
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Upload Your Resume
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    PDF or Word document, up to 5MB
                  </p>
                  <Button variant="outline" className="pointer-events-none">
                    Choose File
                  </Button>
                </div>
              )}

              {uploadState === 'uploading' && (
                <div className="border-2 border-primary rounded-lg p-8 text-center bg-primary/5">
                  <div className="w-12 h-12 mx-auto mb-4 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Uploading Resume...
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Please wait while we upload your file
                  </p>
                </div>
              )}

              {uploadState === 'success' && (
                <div className="border-2 border-green-200 dark:border-green-800 rounded-lg p-6 bg-green-50 dark:bg-green-900/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                      <div>
                        <h3 className="font-semibold text-green-800 dark:text-green-200">
                          Resume Uploaded
                        </h3>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          {uploadedFile || 'Your resume'}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleRemoveFile}
                      variant="ghost"
                      size="sm"
                      className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {uploadState === 'error' && (
                <div className="border-2 border-red-200 dark:border-red-800 rounded-lg p-6 bg-red-50 dark:bg-red-900/20">
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                      Upload Failed
                    </h3>
                    <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                      There was an error uploading your resume
                    </p>
                    <Button onClick={handleFileSelect} variant="outline" size="sm">
                      Try Again
                    </Button>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
            </div>

            {/* File Requirements */}
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Accepted formats: PDF, DOC, DOCX</p>
              <p>• Maximum file size: 5MB</p>
              <p>• Make sure your resume is up to date</p>
            </div>

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
                    'Continue to Referral →'
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

export default StepThree;