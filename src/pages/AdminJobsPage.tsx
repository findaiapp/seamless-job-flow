import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Briefcase, Users, CheckCircle, XCircle, Edit, Trash2, Plus } from "lucide-react";

interface Job {
  id: string;
  employer_name: string;
  job_title?: string;
  title?: string; // Legacy field
  job_type: string;
  location: string;
  pay_range?: string;
  description: string;
  contact_method?: string;
  application_link?: string;
  is_approved: boolean;
  status: string;
  created_at: string;
  posted_by?: string;
}

const AdminJobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: "",
    job_type: "",
    approval_status: "all"
  });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [autoApprove, setAutoApprove] = useState(false);
  const { toast } = useToast();

  const jobTypes = ["All", "Warehouse", "Childcare", "Healthcare", "Retail", "Food Service", "Construction", "Administrative", "Delivery", "Security", "Cleaning", "Other"];
  const locations = ["All", "Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island", "Nassau County", "Suffolk County", "Westchester", "Other"];

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [jobs, filters]);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Normalize job titles for compatibility
      const normalizedJobs = (data || []).map((job: any) => ({
        ...job,
        job_title: job.job_title || job.title || 'Untitled Position'
      }));
      
      setJobs(normalizedJobs);
    } catch (error: any) {
      console.error('Error fetching jobs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch jobs",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...jobs];

    if (filters.location && filters.location !== "All") {
      filtered = filtered.filter(job => job.location === filters.location);
    }

    if (filters.job_type && filters.job_type !== "All") {
      filtered = filtered.filter(job => job.job_type === filters.job_type);
    }

    if (filters.approval_status !== "all") {
      if (filters.approval_status === "approved") {
        filtered = filtered.filter(job => job.is_approved);
      } else if (filters.approval_status === "pending") {
        filtered = filtered.filter(job => !job.is_approved);
      }
    }

    setFilteredJobs(filtered);
  };

  const toggleApproval = async (jobId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update({ 
          is_approved: !currentStatus,
          approved_at: !currentStatus ? new Date().toISOString() : null
        })
        .eq('id', jobId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Job ${!currentStatus ? 'approved' : 'unapproved'} successfully`,
      });

      fetchJobs();
    } catch (error: any) {
      console.error('Error updating job approval:', error);
      toast({
        title: "Error",
        description: "Failed to update job approval",
        variant: "destructive"
      });
    }
  };

  const updateJobStatus = async (jobId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update({ status })
        .eq('id', jobId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Job status updated to ${status}`,
      });

      fetchJobs();
    } catch (error: any) {
      console.error('Error updating job status:', error);
      toast({
        title: "Error",
        description: "Failed to update job status",
        variant: "destructive"
      });
    }
  };

  const deleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job deleted successfully",
      });

      fetchJobs();
    } catch (error: any) {
      console.error('Error deleting job:', error);
      toast({
        title: "Error",
        description: "Failed to delete job",
        variant: "destructive"
      });
    }
  };

  const saveJobEdit = async () => {
    if (!selectedJob) return;

    try {
      const { error } = await supabase
        .from('jobs')
        .update({
          employer_name: selectedJob.employer_name,
          job_title: selectedJob.job_title,
          job_type: selectedJob.job_type,
          location: selectedJob.location,
          pay_range: selectedJob.pay_range,
          description: selectedJob.description,
          contact_method: selectedJob.contact_method
        })
        .eq('id', selectedJob.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job updated successfully",
      });

      setShowEditModal(false);
      setSelectedJob(null);
      fetchJobs();
    } catch (error: any) {
      console.error('Error updating job:', error);
      toast({
        title: "Error",
        description: "Failed to update job",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg">Loading jobs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between px-4">
          <h1 className="text-lg font-semibold flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Job Management
          </h1>
          <Button onClick={() => window.open('/post-job', '_blank')}>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>
      </div>

      <div className="container px-4 py-6 max-w-7xl">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold">{jobs.length}</div>
                  <div className="text-sm text-muted-foreground">Total Jobs</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div>
                  <div className="text-2xl font-bold">{jobs.filter(j => j.is_approved).length}</div>
                  <div className="text-sm text-muted-foreground">Approved</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold">{jobs.filter(j => !j.is_approved).length}</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold">{jobs.filter(j => j.status === 'active').length}</div>
                  <div className="text-sm text-muted-foreground">Active</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Auto-approve */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filters & Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div>
                <Label>Location</Label>
                <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({ ...prev, location: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location === "All" ? "" : location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Job Type</Label>
                <Select value={filters.job_type} onValueChange={(value) => setFilters(prev => ({ ...prev, job_type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type === "All" ? "" : type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Approval Status</Label>
                <Select value={filters.approval_status} onValueChange={(value) => setFilters(prev => ({ ...prev, approval_status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    <SelectItem value="approved">Approved Only</SelectItem>
                    <SelectItem value="pending">Pending Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-approve"
                  checked={autoApprove}
                  onCheckedChange={setAutoApprove}
                />
                <Label htmlFor="auto-approve">Auto-approve new jobs</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Jobs ({filteredJobs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Employer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Pay</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Approval</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.job_title}</TableCell>
                      <TableCell>{job.employer_name}</TableCell>
                      <TableCell>{job.job_type}</TableCell>
                      <TableCell>{job.location}</TableCell>
                      <TableCell>{job.pay_range || 'Not specified'}</TableCell>
                      <TableCell>
                        <Select value={job.status} onValueChange={(value) => updateJobStatus(job.id, value)}>
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          size="sm"
                          variant={job.is_approved ? "default" : "outline"}
                          onClick={() => toggleApproval(job.id, job.is_approved)}
                        >
                          {job.is_approved ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approved
                            </>
                          ) : (
                            <>
                              <XCircle className="h-3 w-3 mr-1" />
                              Pending
                            </>
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(job.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedJob(job);
                              setShowEditModal(true);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteJob(job.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Job Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
          </DialogHeader>
          {selectedJob && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Employer Name</Label>
                  <Input
                    value={selectedJob.employer_name}
                    onChange={(e) => setSelectedJob(prev => prev ? {...prev, employer_name: e.target.value} : null)}
                  />
                </div>
                <div>
                  <Label>Job Title</Label>
                  <Input
                    value={selectedJob.job_title}
                    onChange={(e) => setSelectedJob(prev => prev ? {...prev, job_title: e.target.value} : null)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Job Type</Label>
                  <Select 
                    value={selectedJob.job_type} 
                    onValueChange={(value) => setSelectedJob(prev => prev ? {...prev, job_type: value} : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.filter(type => type !== "All").map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Location</Label>
                  <Select 
                    value={selectedJob.location} 
                    onValueChange={(value) => setSelectedJob(prev => prev ? {...prev, location: value} : null)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.filter(loc => loc !== "All").map((location) => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Pay Range</Label>
                  <Input
                    value={selectedJob.pay_range || ''}
                    onChange={(e) => setSelectedJob(prev => prev ? {...prev, pay_range: e.target.value} : null)}
                    placeholder="e.g., $18-$22/hr"
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={selectedJob.description}
                  onChange={(e) => setSelectedJob(prev => prev ? {...prev, description: e.target.value} : null)}
                  rows={4}
                />
              </div>
              <div>
                <Label>Contact Method</Label>
                <Input
                  value={selectedJob.contact_method || ''}
                  onChange={(e) => setSelectedJob(prev => prev ? {...prev, contact_method: e.target.value} : null)}
                  placeholder="How to apply"
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button onClick={saveJobEdit}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminJobsPage;