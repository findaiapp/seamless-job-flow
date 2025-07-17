import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Database, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function GenerateFakeJobsPage() {
  const [count, setCount] = useState(1600);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState("");
  const { toast } = useToast();

  const handleGenerate = async () => {
    setIsGenerating(true);
    setProgress("Initializing job generation...");

    try {
      const { data, error } = await supabase.functions.invoke('generate-fake-jobs', {
        body: { count }
      });

      if (error) throw error;

      setProgress(`✅ Generated ${data.jobsGenerated} jobs successfully!`);
      toast({
        title: "Jobs Generated!",
        description: `Successfully created ${data.jobsGenerated} fake job listings`,
      });

    } catch (error: any) {
      console.error('Generation error:', error);
      setProgress("❌ Generation failed");
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate jobs",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClearJobs = async () => {
    if (!confirm("Are you sure you want to delete all fake jobs? This cannot be undone.")) {
      return;
    }

    setIsGenerating(true);
    setProgress("Clearing fake jobs...");

    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('utm_source', 'fake-generator');

      if (error) throw error;

      setProgress("✅ Cleared all fake jobs");
      toast({
        title: "Jobs Cleared",
        description: "All fake jobs have been removed from the database",
      });

    } catch (error: any) {
      console.error('Clear error:', error);
      setProgress("❌ Failed to clear jobs");
      toast({
        title: "Clear Failed",
        description: error.message || "Failed to clear jobs",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Fake Job Generator</h1>
          <p className="text-muted-foreground">
            Generate realistic Craigslist-style job listings for testing
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Bulk Job Generation
            </CardTitle>
            <CardDescription>
              Creates realistic job listings across multiple categories and cities using AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Number of Jobs</label>
              <Input
                type="number"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value) || 1600)}
                min="1"
                max="5000"
                disabled={isGenerating}
              />
              <p className="text-xs text-muted-foreground">
                Recommended: 1600 jobs (covers all categories and cities)
              </p>
            </div>

            {progress && (
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm">{progress}</p>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Database className="w-4 h-4 mr-2" />
                    Generate Jobs
                  </>
                )}
              </Button>

              <Button
                onClick={handleClearJobs}
                disabled={isGenerating}
                variant="destructive"
              >
                Clear Fake Jobs
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium mb-2">Categories:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Delivery Driver</li>
                  <li>• Warehouse Associate</li>
                  <li>• General Labor</li>
                  <li>• Childcare/Nanny</li>
                  <li>• House Cleaner</li>
                  <li>• Security Guard</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Cities:</h4>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Brooklyn, NY</li>
                  <li>• Bronx, NY</li>
                  <li>• Queens, NY</li>
                  <li>• Manhattan, NY</li>
                  <li>• Atlanta, GA</li>
                  <li>• Miami, FL</li>
                </ul>
              </div>
            </div>
            
            <div className="pt-3 border-t">
              <h4 className="font-medium mb-2">Features:</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• AI-generated realistic descriptions</li>
                <li>• Random pay ranges ($16-$28/hr)</li>
                <li>• Distributed creation dates (last 30 days)</li>
                <li>• Compatible with /apply/:job_id system</li>
                <li>• Automatically approved and active</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}