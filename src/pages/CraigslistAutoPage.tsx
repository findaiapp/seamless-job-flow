import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { 
  Calendar, 
  Copy, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Zap, 
  Settings,
  BarChart3,
  Clock
} from "lucide-react";

const CraigslistAutoPage = () => {
  const [todaysPost, setTodaysPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [topPerformers, setTopPerformers] = useState<any[]>([]);
  const [performanceData, setPerformanceData] = useState({
    messages_received: 0,
    views_estimated: 0,
    clicks: 0
  });
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { toast } = useToast();

  // Load today's auto-generated post
  useEffect(() => {
    loadTodaysPost();
    loadTopPerformers();
  }, []);

  const loadTodaysPost = async () => {
    setIsLoading(true);
    try {
      // Mock today's post
      const mockPost = {
        id: 'mock-1',
        title: 'Experienced Nanny Needed - Brooklyn Heights',
        body: `Looking for a caring and reliable nanny for our 2 children (ages 3 and 5) in Brooklyn Heights.

Schedule: Monday-Friday, 8am-4pm
Pay: $20-25/hour based on experience
Start date: Immediately

Requirements:
- 2+ years childcare experience
- References required
- CPR certification preferred
- Must love kids!

We offer:
✓ Competitive pay
✓ Paid holidays
✓ Flexible schedule options

Ready to join our family? Apply today!`,
        borough: 'Brooklyn',
        job_type: 'Nanny',
        conversion_score: 85,
        flag_risk_score: 10,
        manual_posted: false,
        created_at: new Date().toISOString()
      };
      setTodaysPost(mockPost);
      setPerformanceData({
        messages_received: 12,
        views_estimated: 156,
        clicks: 23
      });
    } catch (error) {
      console.error('Error loading today\'s post:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTopPerformers = async () => {
    try {
      // Mock top performers
      const mockPerformers = [
        {
          id: '1',
          title: 'Loving Babysitter Wanted - Manhattan',
          borough: 'Manhattan',
          job_type: 'Babysitter',
          conversion_score: 92,
          messages_received: 18,
          created_at: '2025-01-15'
        },
        {
          id: '2',
          title: 'Part-time Nanny - Queens Family',
          borough: 'Queens',
          job_type: 'Nanny',
          conversion_score: 89,
          messages_received: 15,
          created_at: '2025-01-14'
        }
      ];
      setTopPerformers(mockPerformers);
    } catch (error) {
      console.error('Error loading top performers:', error);
    }
  };

  const generateTodaysPost = async () => {
    setIsGenerating(true);
    try {
      // Mock generation delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Post Generated!",
        description: "Today's fresh Craigslist post has been created",
      });

      await loadTodaysPost();
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate today's post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyPost = async () => {
    if (!todaysPost) return;
    
    const fullPost = `${todaysPost.title}\n\n${todaysPost.body}`;
    
    try {
      await navigator.clipboard.writeText(fullPost);
      toast({
        title: "Copied!",
        description: "Post copied to clipboard - ready to paste on Craigslist",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy post to clipboard",
        variant: "destructive"
      });
    }
  };

  const markAsPosted = async () => {
    if (!todaysPost) return;
    
    try {
      // Mock marking as posted
      setTodaysPost(prev => ({ ...prev, manual_posted: true }));

      toast({
        title: "Marked as Posted!",
        description: "Post status updated successfully",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to update post status",
        variant: "destructive"
      });
    }
  };

  const updatePerformanceData = async () => {
    if (!todaysPost) return;
    
    try {
      // Mock update
      toast({
        title: "Performance Updated!",
        description: "Performance metrics saved successfully",
      });
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "Failed to save performance data",
        variant: "destructive"
      });
    }
  };

  const getReadinessColor = (post: any) => {
    if (!post) return 'gray';
    const flagRisk = post.flag_risk_score || 0;
    const conversionScore = post.conversion_score || 0;
    
    if (flagRisk > 30) return 'red';
    if (conversionScore < 50) return 'yellow';
    return 'green';
  };

  const getReadinessMessage = (post: any) => {
    if (!post) return 'No post available';
    
    const flagRisk = post.flag_risk_score || 0;
    const conversionScore = post.conversion_score || 0;
    
    if (flagRisk > 30) return '🔴 Might get flagged — needs edit';
    if (conversionScore < 50) return '🟡 Low urgency / weak CTA';
    return '🟢 Ready to Post';
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">Craigslist Auto-Reposter</h1>
          <p className="text-muted-foreground">Daily GPT-generated childcare posts with performance tracking</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Generated Post */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Today's Auto-Generated Post
                {todaysPost && (
                  <Badge variant={getReadinessColor(todaysPost) === 'green' ? 'default' : 
                                 getReadinessColor(todaysPost) === 'yellow' ? 'secondary' : 'destructive'}>
                    Score: {Math.round(todaysPost.conversion_score || 0)}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Clock className="h-6 w-6 animate-spin mr-2" />
                  Loading today's post...
                </div>
              ) : todaysPost ? (
                <>
                  {/* Post Preview */}
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{todaysPost.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {todaysPost.borough} • {todaysPost.job_type}
                      </p>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-md whitespace-pre-wrap text-sm">
                      {todaysPost.body}
                    </div>
                  </div>

                  {/* Readiness Status */}
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      {getReadinessMessage(todaysPost)}
                    </AlertDescription>
                  </Alert>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button onClick={copyPost} variant="outline">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy and Post
                    </Button>
                    <Button 
                      onClick={markAsPosted}
                      variant={todaysPost.manual_posted ? "secondary" : "default"}
                      disabled={todaysPost.manual_posted}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {todaysPost.manual_posted ? "Posted ✓" : "Mark as Posted"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">No post generated for today yet</p>
                  <Button onClick={generateTodaysPost} disabled={isGenerating}>
                    <Zap className="h-4 w-4 mr-2" />
                    {isGenerating ? "Generating..." : "Generate Today's Post"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Tracking */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todaysPost ? (
                <>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium block mb-1">Messages Received</label>
                      <Input
                        type="number"
                        value={performanceData.messages_received}
                        onChange={(e) => setPerformanceData(prev => ({
                          ...prev,
                          messages_received: parseInt(e.target.value) || 0
                        }))}
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium block mb-1">Estimated Views</label>
                      <Input
                        type="number"
                        value={performanceData.views_estimated}
                        onChange={(e) => setPerformanceData(prev => ({
                          ...prev,
                          views_estimated: parseInt(e.target.value) || 0
                        }))}
                        placeholder="0"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium block mb-1">Link Clicks</label>
                      <Input
                        type="number"
                        value={performanceData.clicks}
                        onChange={(e) => setPerformanceData(prev => ({
                          ...prev,
                          clicks: parseInt(e.target.value) || 0
                        }))}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <Button onClick={updatePerformanceData} className="w-full">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Save Performance Data
                  </Button>
                </>
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  Generate today's post to track performance
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Variants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Top Performing Variants
            </CardTitle>
          </CardHeader>
          <CardContent>
            {topPerformers.length > 0 ? (
              <div className="space-y-3">
                {topPerformers.map((post, index) => (
                  <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">#{index + 1}</Badge>
                        <span className="font-medium text-sm">{post.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {post.borough} • {post.job_type} • {new Date(post.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Score: {Math.round(post.conversion_score || 0)}</div>
                      <div className="text-xs text-muted-foreground">
                        {post.messages_received || 0} messages
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">
                No performance data available yet. Posts will appear here as they generate results.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Daily Schedule Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Auto-Generation Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Daily Schedule:</span>
                <span className="font-medium">4:30 AM ET (9:30 AM UTC)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Borough Rotation:</span>
                <span className="font-medium">Brooklyn → Manhattan → Queens → Bronx → Staten Island</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Job Types:</span>
                <span className="font-medium">Nanny, Babysitter, Preschool Assistant, Home Daycare</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="default">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CraigslistAutoPage;