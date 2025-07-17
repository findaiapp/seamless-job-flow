import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, ArrowRight, Home } from 'lucide-react';

const JobNotFound = () => {
  const navigate = useNavigate();

  const handleBrowseJobs = () => {
    navigate('/search');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardContent className="p-8 text-center">
            {/* Warning Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
              </div>
              
              {/* Main Message */}
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Job No Longer Available
              </h1>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                This job posting has been removed or filled. Don't worry - there are plenty of other opportunities waiting for you!
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleBrowseJobs}
                className="w-full h-12 text-base font-semibold bg-foreground text-background hover:bg-foreground/90"
                size="lg"
              >
                Browse All Jobs
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleBackToHome}
                className="w-full h-12 text-base text-muted-foreground hover:text-foreground"
              >
                Return to Homepage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobNotFound;