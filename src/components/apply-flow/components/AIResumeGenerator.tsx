import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, Download, Loader2 } from 'lucide-react';
import { useApplicationForm } from '../context/ApplicationFormContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface AIResumeGeneratorProps {
  onResumeGenerated: (resumeUrl: string) => void;
}

const AIResumeGenerator = ({ onResumeGenerated }: AIResumeGeneratorProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<string>('');
  const { formData, job } = useApplicationForm();
  const { toast } = useToast();

  const generateResume = async () => {
    setIsGenerating(true);
    try {
      const response = await supabase.functions.invoke('generate-resume', {
        body: {
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          location: formData.location,
          email: formData.email,
          experience: formData.experience,
          availability: formData.availability,
          jobTitle: job?.title || 'this position',
          jobCompany: job?.company || 'the company'
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      const { resumeContent } = response.data;
      setGeneratedResume(resumeContent);

      // Convert to PDF and upload
      await createAndUploadPDF(resumeContent);

    } catch (error) {
      console.error('Error generating resume:', error);
      toast({
        title: "Generation Failed",
        description: "Unable to generate resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const createAndUploadPDF = async (content: string) => {
    try {
      // Create a simple HTML version for PDF conversion
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; margin: 40px; }
            h1 { color: #333; border-bottom: 2px solid #333; }
            h2 { color: #555; margin-top: 20px; }
            .contact-info { margin-bottom: 20px; }
            ul { margin: 10px 0; }
            li { margin: 5px 0; }
          </style>
        </head>
        <body>
          ${content.replace(/\n/g, '<br>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}
        </body>
        </html>
      `;

      // Convert HTML to blob (simplified - in a real app you'd use a PDF library)
      const blob = new Blob([htmlContent], { type: 'text/html' });
      
      // Upload to Supabase Storage
      const fileName = `ai-generated-resume-${Date.now()}.html`;
      const filePath = `resumes/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, blob);

      if (uploadError) {
        throw new Error(uploadError.message);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(filePath);

      onResumeGenerated(publicUrl);

      toast({
        title: "Resume Generated! 🎉",
        description: "Your AI-powered resume has been created and attached.",
      });

    } catch (error) {
      console.error('Error creating PDF:', error);
      toast({
        title: "Upload Failed",
        description: "Resume generated but couldn't upload. Please try manual upload.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
      <CardContent className="p-6 text-center">
        <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
        
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Don't have a resume? Let AI write one for you.
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4">
          Our AI will create a professional resume based on your application details
        </p>

        {generatedResume ? (
          <div className="space-y-4">
            <div className="text-left bg-background/50 p-4 rounded-lg text-xs">
              <div className="max-h-32 overflow-y-auto">
                {generatedResume.slice(0, 200)}...
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setGeneratedResume('')}
                variant="outline"
                size="sm"
                className="flex-1"
              >
                Generate New
              </Button>
              <Button
                onClick={() => createAndUploadPDF(generatedResume)}
                size="sm"
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Use This Resume
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={generateResume}
            disabled={isGenerating}
            className="w-full"
            size="lg"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating Resume...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Generate with AI
              </div>
            )}
          </Button>
        )}

        <p className="text-xs text-muted-foreground mt-2">
          Takes 10-15 seconds • Uses your form data to create personalized content
        </p>
      </CardContent>
    </Card>
  );
};

export default AIResumeGenerator;