import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, MousePointer, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReferralStats {
  referral_code: string;
  total_clicks: number;
  total_applications: number;
  conversion_rate: number;
  latest_click: string;
  latest_application: string;
}

interface ReferralClick {
  id: string;
  referral_code: string;
  job_id: string;
  city: string;
  clicked_at: string;
}

interface ReferralAttribution {
  id: string;
  referral_code: string;
  job_id: string;
  city: string;
  submitted_at: string;
}

export default function ReferralsDashboard() {
  const [stats, setStats] = useState<ReferralStats[]>([]);
  const [recentClicks, setRecentClicks] = useState<ReferralClick[]>([]);
  const [recentAttributions, setRecentAttributions] = useState<ReferralAttribution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReferralData();
  }, []);

  const fetchReferralData = async () => {
    try {
      // Fetch aggregated stats by referral code
      const { data: clicks } = await supabase
        .from('referral_clicks')
        .select('referral_code, clicked_at');

      const { data: attributions } = await supabase
        .from('referral_attributions')
        .select('referral_code, submitted_at');

      // Fetch recent clicks
      const { data: recentClicksData } = await supabase
        .from('referral_clicks')
        .select('*')
        .order('clicked_at', { ascending: false })
        .limit(10);

      // Fetch recent attributions
      const { data: recentAttributionsData } = await supabase
        .from('referral_attributions')
        .select('*')
        .order('submitted_at', { ascending: false })
        .limit(10);

      // Calculate stats
      if (clicks && attributions) {
        const statsMap = new Map<string, ReferralStats>();

        // Process clicks
        clicks.forEach(click => {
          if (!statsMap.has(click.referral_code)) {
            statsMap.set(click.referral_code, {
              referral_code: click.referral_code,
              total_clicks: 0,
              total_applications: 0,
              conversion_rate: 0,
              latest_click: click.clicked_at,
              latest_application: ''
            });
          }
          const stat = statsMap.get(click.referral_code)!;
          stat.total_clicks++;
          if (click.clicked_at > stat.latest_click) {
            stat.latest_click = click.clicked_at;
          }
        });

        // Process attributions
        attributions.forEach(attribution => {
          if (statsMap.has(attribution.referral_code)) {
            const stat = statsMap.get(attribution.referral_code)!;
            stat.total_applications++;
            if (attribution.submitted_at > stat.latest_application) {
              stat.latest_application = attribution.submitted_at;
            }
          }
        });

        // Calculate conversion rates
        statsMap.forEach(stat => {
          stat.conversion_rate = stat.total_clicks > 0 ? (stat.total_applications / stat.total_clicks) * 100 : 0;
        });

        const sortedStats = Array.from(statsMap.values())
          .sort((a, b) => b.total_applications - a.total_applications);

        setStats(sortedStats);
      }

      setRecentClicks(recentClicksData || []);
      setRecentAttributions(recentAttributionsData || []);
    } catch (error) {
      console.error('Error fetching referral data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/admin-dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Referrals Dashboard</h1>
          </div>
          <div className="animate-pulse space-y-4">
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="h-32 bg-muted rounded-lg"></div>
            <div className="h-32 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  const totalClicks = stats.reduce((sum, stat) => sum + stat.total_clicks, 0);
  const totalApplications = stats.reduce((sum, stat) => sum + stat.total_applications, 0);
  const overallConversionRate = totalClicks > 0 ? (totalApplications / totalClicks) * 100 : 0;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Link to="/admin-dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Referrals Dashboard</h1>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClicks.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalApplications.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overallConversionRate.toFixed(1)}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing Referral Codes */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Referral Codes</CardTitle>
            <CardDescription>Ranked by total applications generated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No referral data available yet.</p>
              ) : (
                stats.map((stat, index) => (
                  <div key={stat.referral_code} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge variant={index < 3 ? "default" : "secondary"}>
                        #{index + 1}
                      </Badge>
                      <div>
                        <p className="font-semibold">{stat.referral_code}</p>
                        <p className="text-sm text-muted-foreground">
                          Last activity: {stat.latest_application || stat.latest_click ? 
                            formatDate(stat.latest_application || stat.latest_click) : 'Never'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-4 text-sm">
                        <span>{stat.total_clicks} clicks</span>
                        <span>{stat.total_applications} applications</span>
                        <Badge variant={stat.conversion_rate > 10 ? "default" : "outline"}>
                          {stat.conversion_rate.toFixed(1)}% conversion
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Clicks</CardTitle>
              <CardDescription>Latest referral link clicks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentClicks.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No clicks recorded yet.</p>
                ) : (
                  recentClicks.map((click) => (
                    <div key={click.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{click.referral_code}</p>
                        <p className="text-sm text-muted-foreground">Job: {click.job_id} • {click.city}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(click.clicked_at)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Attributions</CardTitle>
              <CardDescription>Latest successful referral conversions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAttributions.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">No attributions recorded yet.</p>
                ) : (
                  recentAttributions.map((attribution) => (
                    <div key={attribution.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{attribution.referral_code}</p>
                        <p className="text-sm text-muted-foreground">Job: {attribution.job_id} • {attribution.city}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(attribution.submitted_at)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}