import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Save, RefreshCw, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface PostVariant {
  title: string;
  body: string;
}

export default function RepostEngine() {
  const { toast } = useToast();
  const [city, setCity] = useState('');
  const [jobType, setJobType] = useState('');
  const [variants, setVariants] = useState<PostVariant[]>([]);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  const cities = [
    'Brooklyn', 'Manhattan', 'Queens', 'Bronx', 'Staten Island',
    'Los Angeles', 'San Francisco', 'Chicago', 'Miami', 'Boston',
    'Philadelphia', 'Dallas', 'Houston', 'Phoenix', 'Seattle'
  ];

  const jobTypes = [
    'Delivery Driver', 'Food Service', 'Retail Associate', 'Security Guard',
    'Warehouse Worker', 'Administrative Assistant', 'Customer Service Rep',
    'Maintenance Tech', 'Cook', 'Cashier', 'Sales Associate', 'Cleaner'
  ];

  const generateVariants = async () => {
    if (!city || !jobType) {
      toast({
        title: "Missing Information",
        description: "Please select both city and job type",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-post-variants', {
        body: { city, jobType }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setVariants(data.variants);
      toast({
        title: "Variants Generated!",
        description: `Created 3 unique variants for ${jobType} in ${city}`,
      });
    } catch (error: any) {
      console.error('Error generating variants:', error);
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate variants. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const updateVariant = (index: number, field: 'title' | 'body', value: string) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  const saveVariants = async () => {
    if (!city || !jobType || variants.length === 0) {
      toast({
        title: "Missing Data",
        description: "Please generate variants first",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      // Prepare variants for insertion
      const variantsToInsert = variants.map(variant => ({
        city,
        job_type: jobType,
        variant_title: variant.title,
        variant_body: variant.body,
        created_by: null // Could be set to current user ID if auth is implemented
      }));

      const { error } = await supabase
        .from('post_variants')
        .insert(variantsToInsert);

      if (error) {
        throw error;
      }

      toast({
        title: "Variants Saved!",
        description: `Successfully saved ${variants.length} variants for ${jobType} in ${city}`,
      });

      // Reset form
      setVariants([]);
      setCity('');
      setJobType('');

    } catch (error: any) {
      console.error('Error saving variants:', error);
      toast({
        title: "Save Failed",
        description: error.message || "Failed to save variants. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin-dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Repost Engine</h1>
            <p className="text-muted-foreground">Generate and manage Craigslist post variants</p>
          </div>
        </div>

        {/* Configuration */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Variant Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">City</label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select city" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(cityOption => (
                      <SelectItem key={cityOption} value={cityOption}>
                        {cityOption}
                      </SelectItem>
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
                    {jobTypes.map(job => (
                      <SelectItem key={job} value={job}>
                        {job}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={generateVariants} 
                disabled={generating || !city || !jobType}
                className="flex-1"
              >
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating AI Variants...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate 3 Variants
                  </>
                )}
              </Button>

              {variants.length > 0 && (
                <Button 
                  onClick={() => setVariants([])}
                  variant="outline"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Generated Variants */}
        {variants.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Generated Variants</h2>
              <Button 
                onClick={saveVariants} 
                disabled={saving}
                size="lg"
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save All Variants
                  </>
                )}
              </Button>
            </div>

            {variants.map((variant, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Variant {index + 1}
                    </CardTitle>
                    <Badge variant="outline">
                      {variant.title.length}/50 characters
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Title</label>
                    <Input
                      value={variant.title}
                      onChange={(e) => updateVariant(index, 'title', e.target.value)}
                      placeholder="Job post title"
                      maxLength={50}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Body ({variant.body.length} characters)
                    </label>
                    <Textarea
                      value={variant.body}
                      onChange={(e) => updateVariant(index, 'body', e.target.value)}
                      placeholder="Job post description"
                      rows={8}
                      className="resize-none"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {variants.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ready to Generate Variants</h3>
              <p className="text-muted-foreground">
                Select a city and job type above, then click "Generate 3 Variants" to create AI-powered post variations
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}