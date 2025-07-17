import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
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
  variant_label?: string;
  ab_test_id?: string;
  is_ab_test?: boolean;
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
  variant_label?: string;
  is_ab_test?: boolean;
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
  const [redirectUrl, setRedirectUrl] = useState("https://hireloop.ai/apply");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [blastLogs, setBlastLogs] = useState<BlastLog[]>([]);
  const [clickAnalytics, setClickAnalytics] = useState<ClickAnalytics[]>([]);
  
  // A/B Testing state
  const [isABTest, setIsABTest] = useState(false);
  const [messageB, setMessageB] = useState("");
  const [variantALabel, setVariantALabel] = useState("Variant A");
  const [variantBLabel, setVariantBLabel] = useState("Variant B");
  
  // Attribution analytics state
  const [attributionData, setAttributionData] = useState<any[]>([]);
  const [showAttributionModal, setShowAttributionModal] = useState(false);
  const [showClickModal, setShowClickModal] = useState(false);
  const [selectedBlastClicks, setSelectedBlastClicks] = useState<any[]>([]);
  
  const { toast } = useToast();

  // Load initial data
  useEffect(() => {
    loadFilterOptions();
    loadBlastLogs();
    loadClickAnalytics();
    fetchAttributionData();
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

  const fetchAttributionData = async () => {
    const { data, error } = await supabase
      .from('sms_attributions')
      .select(`
        *,
        sms_blast_logs!inner(
          utm_campaign,
          city,
          job_type,
          variant_label,
          ab_test_id,
          is_ab_test
        )
      `)
      .order('timestamp', { ascending: false });

    if (error) {
      console.error('Error fetching attribution data:', error);
      return;
    }

    setAttributionData(data || []);
  };

  const loadClickAnalytics = async () => {
    try {
      // Get campaign-level analytics with A/B test support
      const { data: blastData } = await supabase
        .from('sms_blast_logs')
        .select('*')
        .not('utm_campaign', 'is', null)
        .order('sent_at', { ascending: false });

      const { data: clickData } = await supabase
        .from('sms_clicks')
        .select('*')
        .not('utm_campaign', 'is', null);

      if (blastData && clickData) {
        const campaignMap = new Map();
        
        // Group by campaign and variant
        blastData.forEach(blast => {
          const key = `${blast.utm_campaign}_${blast.variant_label || 'single'}`;
          if (!campaignMap.has(key)) {
            campaignMap.set(key, {
              utm_campaign: blast.utm_campaign,
              variant_label: blast.variant_label,
              is_ab_test: blast.is_ab_test,
              total_sent: 0,
              total_clicks: 0,
              city: blast.city,
              job_type: blast.job_type,
              sent_at: blast.sent_at,
              blast_id: blast.id
            });
          }
          campaignMap.get(key).total_sent++;
        });

        // Count clicks
        clickData.forEach(click => {
          const matchingBlast = blastData.find(b => 
            b.utm_campaign === click.utm_campaign && 
            b.phone_number === click.phone_number
          );
          
          if (matchingBlast) {
            const key = `${click.utm_campaign}_${matchingBlast.variant_label || 'single'}`;
            if (campaignMap.has(key)) {
              campaignMap.get(key).total_clicks++;
            }
          }
        });

        // Calculate click rates
        const analytics = Array.from(campaignMap.values()).map(item => ({
          ...item,
          click_rate: item.total_sent > 0 ? (item.total_clicks / item.total_sent) * 100 : 0
        }));

        setClickAnalytics(analytics);
      }
    } catch (error) {
      console.error('Error loading click analytics:', error);
    }
  };

  const viewClickLogs = async (campaign: string) => {
    const { data, error } = await supabase
      .from('sms_clicks')
      .select('*')
      .eq('utm_campaign', campaign)
      .order('clicked_at', { ascending: false });

    if (error) {
      console.error('Error fetching click logs:', error);
      return;
    }

    setSelectedBlastClicks(data || []);
    setShowClickModal(true);
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
      const shortLink = `https://hireloop.ai/s/CLICK_ID`;
      
      const generatedMessage = `${toneMap[tone as keyof typeof toneMap]} ${jobDetails.substring(0, 100)}... Apply now → ${shortLink}`;
      
      setMessage(generatedMessage);

      if (isABTest) {
        const alternativeMessage = generatedMessage.replace(
          toneMap[tone as keyof typeof toneMap],
          tone === 'friendly' ? '🔥 Hot jobs!' : 
          tone === 'professional' ? 'Opportunities available:' : 
          '⚡ LIMITED TIME:'
        );
        setMessageB(alternativeMessage);
      }
      
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
    if (!message.trim() || (isABTest && !messageB.trim())) {
      toast({
        title: "❌ No Message",
        description: isABTest ? "Please provide both message variants." : "Please generate or write a message first.",
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
      const abTestId = isABTest ? crypto.randomUUID() : null;
      
      // Split audience for A/B test
      const shuffledUsers = [...matchedUsers].sort(() => Math.random() - 0.5);
      const splitPoint = Math.floor(shuffledUsers.length / 2);
      const variantAUsers = isABTest ? shuffledUsers.slice(0, splitPoint) : shuffledUsers;
      const variantBUsers = isABTest ? shuffledUsers.slice(splitPoint) : [];

      // Send Variant A
      const variantAPromises = variantAUsers.map(async (user) => {
        const clickId = `${Math.random().toString(36).substr(2, 9)}`;
        const trackedMessage = message.replace('CLICK_ID', clickId);
        
        const { data, error } = await supabase.functions.invoke('send-sms-blast', {
          body: {
            phone_number: user.phone_number,
            message: trackedMessage,
            city: user.city,
            job_type: user.job_type,
            utm_campaign: campaignName,
            redirect_url: redirectUrl,
            click_id: clickId,
            variant_label: isABTest ? variantALabel : null,
            ab_test_id: abTestId,
            is_ab_test: isABTest
          }
        });

        if (error) throw error;
        return data;
      });

      // Send Variant B (if A/B testing)
      const variantBPromises = variantBUsers.map(async (user) => {
        const clickId = `${Math.random().toString(36).substr(2, 9)}`;
        const trackedMessage = messageB.replace('CLICK_ID', clickId);
        
        const { data, error } = await supabase.functions.invoke('send-sms-blast', {
          body: {
            phone_number: user.phone_number,
            message: trackedMessage,
            city: user.city,
            job_type: user.job_type,
            utm_campaign: campaignName,
            redirect_url: redirectUrl,
            click_id: clickId,
            variant_label: variantBLabel,
            ab_test_id: abTestId,
            is_ab_test: isABTest
          }
        });

        if (error) throw error;
        return data;
      });

      await Promise.all([...variantAPromises, ...variantBPromises]);

      toast({
        title: "🚀 Blast Sent!",
        description: isABTest 
          ? `A/B test sent: ${variantAUsers.length} got ${variantALabel}, ${variantBUsers.length} got ${variantBLabel}`
          : `Successfully sent ${matchedUsers.length} SMS messages with click tracking.`,
      });

      // Reload logs
      loadBlastLogs();
      loadClickAnalytics();
      fetchAttributionData();

      // Clear message
      setMessage("");
      setMessageB("");
      setJobDetails("");
      setCampaignName("");
      setIsABTest(false);

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
            📲 Smart SMS Blaster with A/B Testing
          </h1>
        </div>
      </div>

      <div className="container px-4 py-6 max-w-7xl">
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

                {/* A/B Test Toggle */}
                <div className="flex items-center space-x-2">
                  <Switch
                    id="ab-test"
                    checked={isABTest}
                    onCheckedChange={setIsABTest}
                  />
                  <Label htmlFor="ab-test">Run A/B Test</Label>
                </div>
                
                {isABTest && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="variant-a-label">Variant A Label</Label>
                      <Input
                        id="variant-a-label"
                        value={variantALabel}
                        onChange={(e) => setVariantALabel(e.target.value)}
                        placeholder="Variant A"
                      />
                    </div>
                    <div>
                      <Label htmlFor="variant-b-label">Variant B Label</Label>
                      <Input
                        id="variant-b-label"
                        value={variantBLabel}
                        onChange={(e) => setVariantBLabel(e.target.value)}
                        placeholder="Variant B"
                      />
                    </div>
                  </div>
                )}

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
                  <Label>{isABTest ? `Message ${variantALabel}` : "Final Message"}</Label>
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

                {isABTest && (
                  <div>
                    <Label>Message {variantBLabel}</Label>
                    <Textarea
                      placeholder="Alternative message variant..."
                      value={messageB}
                      onChange={(e) => setMessageB(e.target.value)}
                      rows={4}
                    />
                    <div className="text-xs text-muted-foreground mt-1">
                      {messageB.length}/160 characters
                    </div>
                  </div>
                )}

                <Button 
                  onClick={sendBlast} 
                  disabled={isSending || !message.trim() || userCount === 0 || (isABTest && !messageB.trim())}
                  className="w-full"
                  variant="destructive"
                >
                  {isSending ? "Sending..." : `🚀 Send ${isABTest ? 'A/B Test' : 'Blast'} to ${userCount} Recipients`}
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
                        <TableHead>Campaign</TableHead>
                        <TableHead>Variant</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blastLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="text-xs">
                            {new Date(log.sent_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-xs">
                            {log.utm_campaign || 'Unnamed'}
                          </TableCell>
                          <TableCell className="text-xs">
                            {log.variant_label || '-'}
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
          </div>
        </div>

        {/* Attribution & A/B Test Dashboard */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>📈 Attribution & A/B Test Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {attributionData.filter(a => a.event_type === 'apply').length}
                  </div>
                  <div className="text-sm text-blue-700">Total Applications</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {attributionData.filter(a => a.event_type === 'signup').length}
                  </div>
                  <div className="text-sm text-green-700">Total Signups</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    ${attributionData.reduce((sum, a) => sum + (a.value || 0), 0).toFixed(2)}
                  </div>
                  <div className="text-sm text-purple-700">Total Revenue</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">
                    {clickAnalytics.reduce((sum, c) => sum + c.total_clicks, 0)}
                  </div>
                  <div className="text-sm text-orange-700">Total Clicks</div>
                </div>
              </div>
              
              <Button
                onClick={() => setShowAttributionModal(true)}
                variant="outline"
                className="mb-4"
              >
                View Full Attribution Report
              </Button>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Campaign</TableHead>
                      <TableHead>Variant</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>Clicks</TableHead>
                      <TableHead>Click Rate</TableHead>
                      <TableHead>Conversions</TableHead>
                      <TableHead>Conv. Rate</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clickAnalytics.map((analytics, index) => {
                      const conversions = attributionData.filter(
                        a => a.sms_blast_logs?.utm_campaign === analytics.utm_campaign &&
                             (!analytics.variant_label || a.sms_blast_logs?.variant_label === analytics.variant_label)
                      );
                      const revenue = conversions.reduce((sum, c) => sum + (c.value || 0), 0);
                      
                      return (
                        <TableRow key={index}>
                          <TableCell>{analytics.utm_campaign || 'Unnamed'}</TableCell>
                          <TableCell>
                            <Badge variant={analytics.is_ab_test ? 'default' : 'secondary'}>
                              {analytics.variant_label || 'Single'}
                            </Badge>
                          </TableCell>
                          <TableCell>{analytics.total_sent}</TableCell>
                          <TableCell>{analytics.total_clicks}</TableCell>
                          <TableCell>
                            <Badge variant={analytics.click_rate > 5 ? 'default' : 'secondary'}>
                              {analytics.click_rate.toFixed(1)}%
                            </Badge>
                          </TableCell>
                          <TableCell>{conversions.length}</TableCell>
                          <TableCell>
                            {analytics.total_sent > 0 
                              ? `${((conversions.length / analytics.total_sent) * 100).toFixed(1)}%`
                              : '0%'
                            }
                          </TableCell>
                          <TableCell>${revenue.toFixed(2)}</TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => viewClickLogs(analytics.utm_campaign)}
                            >
                              View Clicks
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Click Logs Modal */}
      <Dialog open={showClickModal} onOpenChange={setShowClickModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Click Logs</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto max-h-96">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phone</TableHead>
                  <TableHead>Clicked At</TableHead>
                  <TableHead>Redirect URL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedBlastClicks.map((click, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {click.phone_number.replace(/.(?=.{4})/g, '*')}
                    </TableCell>
                    <TableCell>
                      {new Date(click.clicked_at).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm">
                      {click.redirect_url}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Attribution Report Modal */}
      <Dialog open={showAttributionModal} onOpenChange={setShowAttributionModal}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Full Attribution Report</DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto max-h-96">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Phone</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Variant</TableHead>
                  <TableHead>Event Type</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attributionData.map((attribution, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {attribution.phone_number.replace(/.(?=.{4})/g, '*')}
                    </TableCell>
                    <TableCell>
                      {attribution.sms_blast_logs?.utm_campaign || 'Unknown'}
                    </TableCell>
                    <TableCell>
                      {attribution.sms_blast_logs?.variant_label || '-'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        attribution.event_type === 'apply' ? 'default' :
                        attribution.event_type === 'signup' ? 'secondary' : 'destructive'
                      }>
                        {attribution.event_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(attribution.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm">
                      {attribution.converted_url}
                    </TableCell>
                    <TableCell>
                      ${(attribution.value || 0).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SMSBlastPage;