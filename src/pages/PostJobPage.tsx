import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";

const PostJobPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    jobTitle: "",
    pay: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Job posting submitted:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/search-jobs" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Jobs
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 max-w-md text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Thanks!</h1>
          <p className="text-muted-foreground mb-8">
            We'll review your job listing and get back to you soon.
          </p>
          <Link to="/search-jobs">
            <Button className="w-full">
              Browse Jobs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/search-jobs" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <Link to="/search-jobs">
            <Button variant="outline" size="sm">
              Browse Jobs
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Post a Job</h1>
          <p className="text-muted-foreground">
            Reach thousands of qualified candidates instantly
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Business Name *
                </label>
                <Input 
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                  placeholder="Your company name"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Job Title *
                </label>
                <Input 
                  required
                  value={formData.jobTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                  placeholder="e.g. Sales Associate, Delivery Driver"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Pay *
                </label>
                <Input 
                  required
                  value={formData.pay}
                  onChange={(e) => setFormData(prev => ({ ...prev, pay: e.target.value }))}
                  placeholder="e.g. $15/hour, $50,000/year"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Job Description *
                </label>
                <Textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the role, requirements, and benefits"
                  rows={6}
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Post Job
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostJobPage;