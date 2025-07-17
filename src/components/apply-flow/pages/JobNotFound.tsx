import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Search, Home } from 'lucide-react';

const JobNotFound = () => {
  const navigate = useNavigate();

  const handleBackToJobs = () => {
    navigate('/search');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardContent className="p-8 text-center">
            {/* Error Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-destructive" />
              </div>
              
              {/* Error Message */}
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Job Not Found
              </h1>
              
              <p className="text-muted-foreground mb-6">
                The job you're looking for doesn't exist or has been removed. This could happen if the position has been filled or the link is outdated.
              </p>
            </div>

            {/* What to do next */}
            <div className="mb-8 text-left">
              <h3 className="font-semibold text-foreground mb-3 text-center">What you can do:</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Browse our current job openings</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Check the job URL for any typos</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Contact us if you think this is an error</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleBackToJobs}
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Available Jobs
              </Button>
              
              <Button
                variant="outline"
                onClick={handleBackToHome}
                className="w-full h-12"
              >
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobNotFound;