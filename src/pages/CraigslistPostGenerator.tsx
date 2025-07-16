import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Wand2, Copy, Save, AlertTriangle, CheckCircle } from "lucide-react";

const CraigslistPostGenerator = () => {
  const [borough, setBorough] = useState('');
  const [jobType, setJobType] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [validationWarnings, setValidationWarnings] = useState<string[]>([]);
  
  const { toast } = useToast();

  const boroughs = ["Brooklyn", "Bronx", "Manhattan", "Queens", "Staten Island"];
  const jobTypes = ["Nanny", "Babysitter", "Preschool Assistant", "Home Daycare"];

  const validateForFlags = (title: string, body: string) => {
    const warnings: string[] = [];
    
    // Check for too many emojis in title
    const emojiCount = (title.match(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu) || []).length;
    if (emojiCount > 2) {
      warnings.push("🚫 Too many emojis in title (max 2 recommended)");
    }

    // Check for capitalized brand names
    const flaggedBrands = ['AMAZON', 'NYC GOV', 'UBER', 'LYFT', 'DOORDASH'];
    const hasCapsBrands = flaggedBrands.some(brand => title.toUpperCase().includes(brand) || body.toUpperCase().includes(brand));
    if (hasCapsBrands) {
      warnings.push("🚫 Contains capitalized brand names that may trigger flags");
    }

    // Check for multiple links
    const linkCount = (body.match(/https?:\/\/[^\s]+/g) || []).length;
    if (linkCount > 1) {
      warnings.push("🚫 Multiple links detected (keep only CTA link)");
    }

    // Check for positive terms
    const positiveTerms = ['flexible hours', 'family-owned', 'training provided', 'competitive pay', 'friendly environment'];
    const hasPositiveTerms = positiveTerms.some(term => body.toLowerCase().includes(term));
    if (!hasPositiveTerms) {
      warnings.push("⚠️ Consider adding terms like 'flexible hours' or 'training provided'");
    }

    return warnings;
  };

  const generatePost = async () => {
    if (!borough || !jobType) {
      toast({
        title: "Missing Information",
        description: "Please select both borough and job type",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-craigslist-post', {
        body: { borough, jobType },
      });

      if (error) {
        throw new Error(error.message || 'Failed to generate post');
      }
      setTitle(data.title);
      setBody(data.body);
      
      // Validate the generated content
      const warnings = validateForFlags(data.title, data.body);
      setValidationWarnings(warnings);

      toast({
        title: "Post Generated!",
        description: "Your Craigslist post has been created",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPost = async () => {
    const fullPost = `${title}\n\n${body}\n\nLocation: ${city}, ${borough} ${zip}`;
    
    try {
      await navigator.clipboard.writeText(fullPost);
      toast({
        title: "Copied!",
        description: "Post copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy post to clipboard",
        variant: "destructive"
      });
    }
  };

  const markAsUsed = async () => {
    if (!title || !body || !borough || !jobType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before saving",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const utmLink = `https://hireloop.ai/apply?job=${jobType.toLowerCase().replace(' ', '-')}&city=${city.toLowerCase()}&ref=craigslist`;
      
      // Insert the generated post into the database
      const { error } = await supabase
        .from('craigslist_posts')
        .insert({
          variant: 'generator',
          title: title,
          body: body,
          borough: borough,
          job_type: jobType,
          used: true,
          utm_link: utmLink
        });

      if (error) throw error;

      toast({
        title: "Post Saved!",
        description: "Post marked as used and saved to database",
      });

      // Clear form
      setTitle('');
      setBody('');
      setCity('');
      setZip('');
      setValidationWarnings([]);
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save post to database",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">Craigslist Post Generator</h1>
          <p className="text-muted-foreground">Create flag-proof childcare job posts that attract quality applicants</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Generator Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5" />
                Post Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Borough</label>
                  <Select value={borough} onValueChange={setBorough}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select borough" />
                    </SelectTrigger>
                    <SelectContent>
                      {boroughs.map(b => (
                        <SelectItem key={b} value={b}>{b}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Job Type</label>
                  <Select value={jobType} onValueChange={setJobType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Post Title</label>
                <Input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="🍼 Brooklyn Babysitter Wanted - Flexible Hours!"
                  maxLength={70}
                />
                <p className="text-xs text-muted-foreground mt-1">{title.length}/70 characters</p>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Post Body</label>
                <Textarea 
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Post description will be generated here..."
                  rows={8}
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground mt-1">{body.length}/500 characters</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">City</label>
                  <Input 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Park Slope"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">ZIP Code</label>
                  <Input 
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    placeholder="e.g. 11215"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={generatePost} 
                  disabled={isGenerating || !borough || !jobType}
                  className="w-full"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  {isGenerating ? "Generating..." : "Generate with GPT"}
                </Button>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    onClick={copyPost}
                    disabled={!title || !body}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Post
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={markAsUsed}
                    disabled={isSaving || !title || !body}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? "Saving..." : "Mark as Used"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preview Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {title && (
                <div>
                  <h3 className="font-semibold text-lg">{title}</h3>
                  {city && borough && (
                    <p className="text-sm text-muted-foreground">{city}, {borough} {zip}</p>
                  )}
                </div>
              )}
              
              {body && (
                <div className="whitespace-pre-wrap text-sm bg-muted p-3 rounded-md">
                  {body}
                </div>
              )}

              {validationWarnings.length > 0 && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-1">
                      {validationWarnings.map((warning, index) => (
                        <div key={index} className="text-sm">{warning}</div>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {validationWarnings.length === 0 && title && body && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    ✅ Post looks flag-safe and ready to publish!
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CraigslistPostGenerator;