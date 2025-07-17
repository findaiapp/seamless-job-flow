import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  BarChart3, 
  Eye, 
  MousePointer, 
  TrendingUp,
  Calendar,
  MapPin,
  Briefcase,
  RefreshCw,
  Filter
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

interface CraigslistPost {
  id: string;
  variant_id: string;
  city: string;
  job_type: string;
  posted_at: string;
  repost_at: string | null;
  views: number;
  clicks: number;
  status: 'posted' | 'scheduled' | 'expired';
  post_variants: {
    variant_title: string;
    variant_body: string;
  };
}

interface PostStats {
  totalPosts: number;
  totalViews: number;
  totalClicks: number;
  avgCTR: number;
  activePosts: number;
}

export default function PostTracker() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<CraigslistPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<CraigslistPost[]>([]);
  const [stats, setStats] = useState<PostStats>({
    totalPosts: 0,
    totalViews: 0,
    totalClicks: 0,
    avgCTR: 0,
    activePosts: 0
  });

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobTypeFilter, setJobTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('ctr_desc');

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [posts, searchTerm, cityFilter, statusFilter, jobTypeFilter, sortBy]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      
      const { data: postsData, error } = await supabase
        .from('craigslist_posts')
        .select(`
          *,
          post_variants (
            variant_title,
            variant_body
          )
        `)
        .order('posted_at', { ascending: false });

      if (error) {
        throw error;
      }

      const posts = postsData || [];
      setPosts(posts);

      // Calculate stats
      const totalViews = posts.reduce((sum, post) => sum + post.views, 0);
      const totalClicks = posts.reduce((sum, post) => sum + post.clicks, 0);
      const avgCTR = totalViews > 0 ? (totalClicks / totalViews) * 100 : 0;
      const activePosts = posts.filter(post => post.status === 'posted').length;

      setStats({
        totalPosts: posts.length,
        totalViews,
        totalClicks,
        avgCTR,
        activePosts
      });

    } catch (error: any) {
      console.error('Error loading posts:', error);
      toast({
        title: "Error",
        description: "Failed to load post data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...posts];

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(post => 
        post.post_variants?.variant_title.toLowerCase().includes(searchLower) ||
        post.city.toLowerCase().includes(searchLower) ||
        post.job_type.toLowerCase().includes(searchLower)
      );
    }

    // City filter
    if (cityFilter !== 'all') {
      filtered = filtered.filter(post => post.city === cityFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => post.status === statusFilter);
    }

    // Job type filter
    if (jobTypeFilter !== 'all') {
      filtered = filtered.filter(post => post.job_type === jobTypeFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      const aCTR = a.views > 0 ? (a.clicks / a.views) * 100 : 0;
      const bCTR = b.views > 0 ? (b.clicks / b.views) * 100 : 0;

      switch (sortBy) {
        case 'ctr_desc':
          return bCTR - aCTR;
        case 'ctr_asc':
          return aCTR - bCTR;
        case 'views_desc':
          return b.views - a.views;
        case 'clicks_desc':
          return b.clicks - a.clicks;
        case 'date_desc':
          return new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime();
        case 'date_asc':
          return new Date(a.posted_at).getTime() - new Date(b.posted_at).getTime();
        default:
          return 0;
      }
    });

    setFilteredPosts(filtered);
  };

  const calculateCTR = (views: number, clicks: number): number => {
    return views > 0 ? (clicks / views) * 100 : 0;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'posted':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
      case 'expired':
        return <Badge className="bg-gray-100 text-gray-800">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
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

  const uniqueCities = [...new Set(posts.map(post => post.city))];
  const uniqueJobTypes = [...new Set(posts.map(post => post.job_type))];

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
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Post Performance Tracker</h1>
            <p className="text-muted-foreground">Monitor Craigslist post variants and optimize performance</p>
          </div>
          <Button onClick={loadPosts} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Posts</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activePosts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClicks.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgCTR.toFixed(1)}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters & Sorting
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="text-sm font-medium">Search</label>
                <Input
                  placeholder="Search titles, cities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
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

              <div>
                <label className="text-sm font-medium">Job Type</label>
                <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    {uniqueJobTypes.map(jobType => (
                      <SelectItem key={jobType} value={jobType}>{jobType}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="posted">Active</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Sort By</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ctr_desc">CTR (High to Low)</SelectItem>
                    <SelectItem value="ctr_asc">CTR (Low to High)</SelectItem>
                    <SelectItem value="views_desc">Views (High to Low)</SelectItem>
                    <SelectItem value="clicks_desc">Clicks (High to Low)</SelectItem>
                    <SelectItem value="date_desc">Newest First</SelectItem>
                    <SelectItem value="date_asc">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Table */}
        <Card>
          <CardHeader>
            <CardTitle>
              Post Performance ({filteredPosts.length} posts)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No posts found matching your filters
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const ctr = calculateCTR(post.views, post.clicks);
                  return (
                    <div key={post.id} className="border rounded-lg p-4 hover:bg-muted/50">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                        {/* Post Info */}
                        <div className="lg:col-span-6">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-sm">
                              {post.post_variants?.variant_title || 'No title'}
                            </h3>
                            {getStatusBadge(post.status)}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                            {post.post_variants?.variant_body || 'No description'}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {post.city}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {post.job_type}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(post.posted_at)}
                            </span>
                          </div>
                        </div>

                        {/* Metrics */}
                        <div className="lg:col-span-6 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold">{post.views}</div>
                            <div className="text-xs text-muted-foreground">Views</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold">{post.clicks}</div>
                            <div className="text-xs text-muted-foreground">Clicks</div>
                          </div>
                          <div>
                            <div className={`text-lg font-bold ${ctr > 5 ? 'text-green-600' : ctr > 2 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {ctr.toFixed(1)}%
                            </div>
                            <div className="text-xs text-muted-foreground">CTR</div>
                          </div>
                          <div>
                            <Badge variant={
                              ctr > 5 ? 'default' : 
                              ctr > 2 ? 'secondary' : 
                              'outline'
                            } className="text-xs">
                              {ctr > 5 ? 'High' : ctr > 2 ? 'Medium' : 'Low'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}