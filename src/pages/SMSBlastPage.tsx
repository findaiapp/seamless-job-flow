import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Users, MessageSquare, Send, Eye } from "lucide-react";

interface OptInUser {
  id: string;
  first_name: string;
  city: string;
  job_type: string;
  phone_number: string;
  email: string;
  created_at: string;
}

interface BlastLog {
  id: string;
  phone_number: string;
  message: string;
  city: string;
  job_type: string;
  sent_at: string;
  status: string;
  utm_campaign: string;
  redirect_url: string;
  click_id: string;
}

interface ClickAnalytics {
  blast_id: string;
  utm_campaign: string;
  total_sent: number;
  total_clicks: number;
  click_rate: number;
  city: string;
  job_type: string;
  sent_at: string;
}

const SMSBlastPage = () => {
  const [filters, setFilters] = useState({
    city: "",
    job_type: "",
    date_range: "all"
  });
  const [matchedUsers, setMatchedUsers] = useState<OptInUser[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [jobTypes, setJobTypes] = useState<string[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState("friendly");
  const [jobDetails, setJobDetails] = useState("");
  const [campaignName, setCampaignName] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("https://seamless-job-flow.lovable.app/search-jobs");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [blastLogs, setBlastLogs] = useState<BlastLog[]>([]);
  const [clickAnalytics, setClickAnalytics] = useState<ClickAnalytics[]>([]);
  const { toast } = useToast();

  // Load initial data
  useEffect(() => {
    loadFilterOptions();
    loadBlastLogs();
    loadClickAnalytics();
  }, []);

  // Update filtered users when filters change
  useEffect(() => {
    loadFilteredUsers();
  }, [filters]);

  const loadFilterOptions = async () => {
    try {
      const { data: citiesData } = await supabase
        .from('alert_optins')
        .select('city')
        .eq('consent', true);

      const { data: jobTypesData } = await supabase
        .from('alert_optins')
        .select('job_type')
        .eq('consent', true);

      if (citiesData) {
        const uniqueCities = [...new Set(citiesData.map(item => item.city))].sort();
        setCities(uniqueCities);
      }

      if (jobTypesData) {
        const uniqueJobTypes = [...new Set(jobTypesData.map(item => item.job_type))].sort();
        setJobTypes(uniqueJobTypes);
      }
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

  const loadFilteredUsers = async () => {
    try {
      let query = supabase
        .from('alert_optins')
        .select('*')
        .eq('consent', true);

      if (filters.city) {
        query = query.eq('city', filters.city);
      }

      if (filters.job_type) {
        query = query.eq('job_type', filters.job_type);
      }

      if (filters.date_range !== 'all') {
        const daysAgo = filters.date_range === '7' ? 7 : filters.date_range === '30' ? 30 : 0;
        if (daysAgo > 0) {
          const date = new Date();
          date.setDate(date.getDate() - daysAgo);
          query = query.gte('created_at', date.toISOString());
        }
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;

      setMatchedUsers(data || []);
      setUserCount(data?.length || 0);
    } catch (error) {
      console.error('Error loading filtered users:', error);
    }
  };

  const loadBlastLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('sms_blast_logs')
        .select('*')
        .order('sent_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setBlastLogs(data || []);
    } catch (error) {
      console.error('Error loading blast logs:', error);
    }
  };

  const loadClickAnalytics = async () => {
    try {
      // Get blast logs with click counts
      const { data: analyticsData, error } = await supabase
        .from('sms_blast_logs')
        .select(`
          id,
          utm_campaign,
          city,
          job_type,
          sent_at,
          sms_clicks!inner (
            id
          )
        `)
        .order('sent_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      // Process the data to create analytics
      const analytics: ClickAnalytics[] = [];
      const blastMap = new Map();

      // Count total sent per campaign
      const { data: sentData } = await supabase
        .from('sms_blast_logs')
        .select('utm_campaign, id')
        .not('utm_campaign', 'is', null);

      // Count clicks per campaign
      const { data: clickData } = await supabase
        .from('sms_clicks')
        .select('utm_campaign, id');

      if (sentData && clickData) {
        const sentCounts = sentData.reduce((acc, item) => {
          acc[item.utm_campaign] = (acc[item.utm_campaign] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const clickCounts = clickData.reduce((acc, item) => {
          acc[item.utm_campaign] = (acc[item.utm_campaign] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Create analytics for each campaign
        Object.keys(sentCounts).forEach(campaign => {
          const totalSent = sentCounts[campaign] || 0;
          const totalClicks = clickCounts[campaign] || 0;
          const clickRate = totalSent > 0 ? (totalClicks / totalSent) * 100 : 0;

          // Find sample blast for additional info
          const sampleBlast = sentData.find(item => item.utm_campaign === campaign);
          if (sampleBlast) {
            analytics.push({
              blast_id: sampleBlast.id,
              utm_campaign: campaign,
              total_sent: totalSent,
              total_clicks: totalClicks,
              click_rate: clickRate,
              city: '', // Will be filled from blast logs
              job_type: '', // Will be filled from blast logs
              sent_at: '' // Will be filled from blast logs
            });
          }
        });
      }

      setClickAnalytics(analytics);
    } catch (error) {
      console.error('Error loading click analytics:', error);
    }
  };

  const generateMessage = async () => {
    if (!jobDetails.trim()) {
      toast({
        title: "❌ Missing Job Details",
        description: "Please enter job details to generate a message.",
        variant: "destructive"
      });
      return;
    }

    if (!redirectUrl.trim()) {
      toast({
        title: "❌ Missing Redirect URL",
        description: "Please enter a redirect URL.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Generate campaign name if not provided
      const generatedCampaign = campaignName || `${filters.city || 'all'}-${filters.job_type || 'jobs'}-${new Date().getMonth() + 1}`.toLowerCase().replace(/\s+/g, '-');
      setCampaignName(generatedCampaign);

      // Mock message generation (replace with OpenAI API call)
      const toneMap = {
        friendly: "Hey! 👋",
        professional: "Good morning,",
        urgent: "🚨 URGENT:"
      };

      // Create short tracked link placeholder
      const shortLink = `https://seamless-job-flow.lovable.app/s/CLICK_ID`;
      
      const generatedMessage = `${toneMap[tone as keyof typeof toneMap]} ${jobDetails.substring(0, 100)}... Apply now → ${shortLink}`;
      
      setMessage(generatedMessage);
      
      toast({
        title: "✅ Message Generated",
        description: "Click tracking link will be generated when sending.",
      });
    } catch (error) {
      console.error('Error generating message:', error);
      toast({
        title: "❌ Generation Failed",
        description: "Please try again or write a custom message.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const sendBlast = async () => {
    if (!message.trim()) {
      toast({
        title: "❌ No Message",
        description: "Please generate or write a message first.",
        variant: "destructive"
      });
      return;
    }

    if (matchedUsers.length === 0) {
      toast({
        title: "❌ No Recipients",
        description: "No users match your current filters.",
        variant: "destructive"
      });
      return;
    }

    setIsSending(true);

    try {
      // Send SMS blasts using edge function with click tracking
      const blastPromises = matchedUsers.map(async (user) => {
        // Generate unique click ID for each user
        const clickId = `${Math.random().toString(36).substr(2, 9)}`;
        
        // Replace CLICK_ID placeholder with actual click ID
        const trackedMessage = message.replace('CLICK_ID', clickId);
        
        const { data, error } = await supabase.functions.invoke('send-sms-blast', {
          body: {
            phone_number: user.phone_number,
            message: trackedMessage,
            city: user.city,
            job_type: user.job_type,
            utm_campaign: campaignName,
            redirect_url: redirectUrl,
            click_id: clickId
          }
        });

        if (error) {
          console.error(`Failed to send SMS to ${user.phone_number}:`, error);
          throw error;
        }

        return data;
      });

      await Promise.all(blastPromises);

      toast({
        title: "🚀 Blast Sent!",
        description: `Successfully sent ${matchedUsers.length} SMS messages with click tracking.`,
      });

      // Reload logs
      loadBlastLogs();

      // Clear message
      setMessage("");
      setJobDetails("");
      setCampaignName("");

    } catch (error) {
      console.error('Error sending blast:', error);
      toast({
        title: "❌ Send Failed",
        description: "Some messages may not have been sent. Check logs.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center px-4">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            📲 Smart SMS Blaster
          </h1>
        </div>
      </div>

      <div className="container px-4 py-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Filters & Message Composer */}
          <div className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Target Audience
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>City</Label>
                    <Select value={filters.city} onValueChange={(value) => setFilters({...filters, city: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All cities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All cities</SelectItem>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Job Type</Label>
                    <Select value={filters.job_type} onValueChange={(value) => setFilters({...filters, job_type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="All types" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All types</SelectItem>
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Date Range</Label>
                  <Select value={filters.date_range} onValueChange={(value) => setFilters({...filters, date_range: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All time</SelectItem>
                      <SelectItem value="7">Last 7 days</SelectItem>
                      <SelectItem value="30">Last 30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-primary">🎯 {userCount}</div>
                  <div className="text-sm text-muted-foreground">users matched</div>
                </div>
              </CardContent>
            </Card>

            {/* Message Composer */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Message Composer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Campaign Name</Label>
                    <Input
                      placeholder="e.g., bronx-daycare-nov"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Redirect URL</Label>
                    <Input
                      placeholder="https://hireloop.ai/apply"
                      value={redirectUrl}
                      onChange={(e) => setRedirectUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label>Job Details</Label>
                  <Textarea
                    placeholder="Enter job details (e.g., '3 warehouse jobs in Brooklyn at $19/hr, start Monday')"
                    value={jobDetails}
                    onChange={(e) => setJobDetails(e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Tone</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">🔥 Friendly</SelectItem>
                      <SelectItem value="professional">💼 Professional</SelectItem>
                      <SelectItem value="urgent">📣 Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={generateMessage} 
                  disabled={isGenerating || !jobDetails.trim()}
                  className="w-full"
                >
                  {isGenerating ? "Generating..." : "Generate Message"}
                </Button>

                <div>
                  <Label>Final Message</Label>
                  <Textarea
                    placeholder="Generated message will appear here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    {message.length}/160 characters
                  </div>
                </div>

                <Button 
                  onClick={sendBlast} 
                  disabled={isSending || !message.trim() || userCount === 0}
                  className="w-full"
                  variant="destructive"
                >
                  {isSending ? "Sending..." : `🚀 Send to ${userCount} Recipients`}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Recent Blasts */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Recent Blasts
                </CardTitle>
              </CardHeader>
              <CardContent>
                {blastLogs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No SMS blasts sent yet
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Target</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blastLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="text-xs">
                            {new Date(log.sent_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-xs max-w-[200px] truncate">
                            {log.message}
                          </TableCell>
                          <TableCell className="text-xs">
                            <div>{log.city}</div>
                            <div className="text-muted-foreground">{log.job_type}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={log.status === 'sent' ? 'default' : 'destructive'}>
                              {log.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            {/* Matched Users Preview */}
            {userCount > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recipients Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {matchedUsers.slice(0, 10).map((user) => (
                      <div key={user.id} className="flex justify-between items-center text-sm border-b pb-2">
                        <div>
                          <div className="font-medium">{user.first_name}</div>
                          <div className="text-muted-foreground">{user.city} • {user.job_type}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {user.phone_number.slice(-4)}
                        </div>
                      </div>
                    ))}
                    {userCount > 10 && (
                      <div className="text-center text-sm text-muted-foreground pt-2">
                        ...and {userCount - 10} more
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Click Analytics Dashboard */}
        {clickAnalytics.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  📊 Click Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Total Sent</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>Click Rate</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clickAnalytics.map((analytics) => (
                      <TableRow key={analytics.blast_id}>
                        <TableCell className="font-medium">
                          {analytics.utm_campaign}
                        </TableCell>
                        <TableCell>{analytics.total_sent}</TableCell>
                        <TableCell>{analytics.total_clicks}</TableCell>
                        <TableCell>
                          <Badge variant={analytics.click_rate > 5 ? 'default' : 'secondary'}>
                            {analytics.click_rate.toFixed(1)}%
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Logs
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default SMSBlastPage;