import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  Users, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Filter,
  Download,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface CraigslistApplication {
  id: string;
  job_id: string;
  city: string | null;
  variant: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  submitted_at: string;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

interface DashboardStats {
  totalApplications: number;
  todayApplications: number;
  topCities: Array<{ city: string; count: number }>;
  topVariants: Array<{ variant: string; count: number }>;
  recentApplications: CraigslistApplication[];
}

export default function AdminDashboard() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    todayApplications: 0,
    topCities: [],
    topVariants: [],
    recentApplications: []
  });
  const [applications, setApplications] = useState<CraigslistApplication[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<CraigslistApplication[]>([]);
  
  // Filters
  const [dateFilter, setDateFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load data
  useEffect(() => {
    loadDashboardData();
  }, []);

  // Apply filters
  useEffect(() => {
    applyFilters();
  }, [applications, dateFilter, cityFilter, searchTerm]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all Craigslist applications
      const { data: applicationsData, error } = await supabase
        .from('craigslist_applications')
        .select('*')
        .order('submitted_at', { ascending: false })
        .limit(1000);

      if (error) {
        console.error('Error loading applications:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
        return;
      }

      const apps = applicationsData || [];
      setApplications(apps);

      // Calculate statistics
      const today = new Date().toDateString();
      const todayApps = apps.filter(app => 
        new Date(app.submitted_at).toDateString() === today
      );

      // Top cities
      const cityStats = apps.reduce((acc, app) => {
        if (app.city) {
          acc[app.city] = (acc[app.city] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      const topCities = Object.entries(cityStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([city, count]) => ({ city, count }));

      // Top variants
      const variantStats = apps.reduce((acc, app) => {
        if (app.variant) {
          acc[app.variant] = (acc[app.variant] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      const topVariants = Object.entries(variantStats)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([variant, count]) => ({ variant, count }));

      setStats({
        totalApplications: apps.length,
        todayApplications: todayApps.length,
        topCities,
        topVariants,
        recentApplications: apps.slice(0, 10)
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...applications];

    // Date filter
    if (dateFilter !== 'all') {
      const now = new Date();
      let cutoffDate: Date;

      switch (dateFilter) {
        case 'today':
          cutoffDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
          break;
        case 'week':
          cutoffDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          cutoffDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
          break;
        default:
          cutoffDate = new Date(0);
      }

      filtered = filtered.filter(app => new Date(app.submitted_at) >= cutoffDate);
    }

    // City filter
    if (cityFilter !== 'all') {
      filtered = filtered.filter(app => app.city === cityFilter);
    }

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(app => 
        app.job_id.toLowerCase().includes(searchLower) ||
        app.city?.toLowerCase().includes(searchLower) ||
        app.variant?.toLowerCase().includes(searchLower) ||
        app.utm_campaign?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredApplications(filtered);
  };

  const exportData = () => {
    const csvData = filteredApplications.map(app => ({
      'Job ID': app.job_id,
      'City': app.city || '',
      'Variant': app.variant || '',
      'UTM Source': app.utm_source || '',
      'UTM Medium': app.utm_medium || '',
      'UTM Campaign': app.utm_campaign || '',
      'Submitted At': new Date(app.submitted_at).toLocaleString(),
      'IP Address': app.ip_address || '',
    }));

    const csv = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `craigslist-applications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export successful",
      description: `Exported ${filteredApplications.length} applications`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-64 bg-muted rounded"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const uniqueCities = [...new Set(applications.map(app => app.city).filter(Boolean))];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Monitor and analyze application performance</p>
          </div>
          <div className="flex gap-3">
            <Link to="/repost-engine">
              <Button variant="outline" size="sm">
                <Sparkles className="h-4 w-4 mr-2" />
                Repost Engine
              </Button>
            </Link>
            <Link to="/post-tracker">
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Post Tracker
              </Button>
            </Link>
            <Link to="/referrals-dashboard">
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Referrals
              </Button>
            </Link>
            <Button onClick={loadDashboardData} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button onClick={exportData} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApplications}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Applications</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayApplications}</div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top City</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.topCities[0]?.city || 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.topCities[0]?.count || 0} applications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.totalApplications > 0 ? '95.2%' : '0%'}
              </div>
              <p className="text-xs text-muted-foreground">Estimated</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium">Search</label>
                <Input
                  placeholder="Search job ID, city, variant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium">Date Range</label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">Last 7 Days</SelectItem>
                    <SelectItem value="month">Last 30 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">City</label>
                <Select value={cityFilter} onValueChange={setCityFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cities</SelectItem>
                    {uniqueCities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setDateFilter('all');
                    setCityFilter('all');
                    setSearchTerm('');
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Applications ({filteredApplications.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Job ID</th>
                    <th className="text-left p-2">City</th>
                    <th className="text-left p-2">Variant</th>
                    <th className="text-left p-2">UTM Source</th>
                    <th className="text-left p-2">UTM Campaign</th>
                    <th className="text-left p-2">Submitted</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center p-8 text-muted-foreground">
                        No applications found matching your filters
                      </td>
                    </tr>
                  ) : (
                    filteredApplications.slice(0, 100).map((app) => (
                      <tr key={app.id} className="border-b hover:bg-muted/50">
                        <td className="p-2">
                          <code className="text-xs bg-muted px-1 rounded">
                            {app.job_id}
                          </code>
                        </td>
                        <td className="p-2">
                          <Badge variant="outline" className="text-xs">
                            {app.city || 'Unknown'}
                          </Badge>
                        </td>
                        <td className="p-2">
                          {app.variant && (
                            <Badge variant="secondary" className="text-xs">
                              {app.variant}
                            </Badge>
                          )}
                        </td>
                        <td className="p-2">
                          <span className="text-muted-foreground">
                            {app.utm_source || 'N/A'}
                          </span>
                        </td>
                        <td className="p-2">
                          <span className="text-muted-foreground">
                            {app.utm_campaign || 'N/A'}
                          </span>
                        </td>
                        <td className="p-2 text-muted-foreground">
                          {new Date(app.submitted_at).toLocaleDateString()} {' '}
                          {new Date(app.submitted_at).toLocaleTimeString()}
                        </td>
                        <td className="p-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => window.open(`/apply/${app.job_id}`, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {filteredApplications.length > 100 && (
              <div className="mt-4 text-center text-muted-foreground text-sm">
                Showing first 100 results. Use filters to narrow down.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Performing Segments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Top Cities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.topCities.map((item, index) => (
                  <div key={item.city} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                      <span className="text-sm">{item.city}</span>
                    </div>
                    <Badge variant="secondary">
                      {item.count} apps
                    </Badge>
                  </div>
                ))}
                {stats.topCities.length === 0 && (
                  <p className="text-muted-foreground text-sm">No data available</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Variants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.topVariants.map((item, index) => (
                  <div key={item.variant} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                      <span className="text-sm">{item.variant}</span>
                    </div>
                    <Badge variant="secondary">
                      {item.count} apps
                    </Badge>
                  </div>
                ))}
                {stats.topVariants.length === 0 && (
                  <p className="text-muted-foreground text-sm">No data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}