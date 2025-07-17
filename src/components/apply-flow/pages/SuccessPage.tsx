import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApplicationForm } from '../context/ApplicationFormContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Search, FileText } from 'lucide-react';
import Confetti from 'react-confetti';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, resetForm } = useApplicationForm();
  const { toast } = useToast();
  
  const [showConfetti, setShowConfetti] = useState(true);
  const [countdown, setCountdown] = useState(7);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Get name from location state, form data, or default
  const userName = (location.state as { name?: string })?.name || 
                   formData.fullName || 
                   "there";
  
  const jobTitle = formData.jobTitle || 'this position';
  const jobCompany = formData.jobCompany;

  useEffect(() => {
    window.scrollTo(0, 0);

    // Handle window resize for confetti
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Stop confetti after 4 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 4000);

    // Clean up application context after 1 second
    const contextCleanup = setTimeout(() => {
      resetForm();
    }, 1000);

    // Auto-redirect countdown
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          toast({
            title: "Redirecting you back to search...",
            description: "Find more opportunities!",
          });
          navigate('/search');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(confettiTimer);
      clearTimeout(contextCleanup);
      clearInterval(countdownInterval);
    };
  }, [navigate, resetForm, toast]);

  const handleBackToSearch = () => {
    navigate('/search');
  };

  const handleViewApplication = () => {
    toast({
      title: "Feature Coming Soon",
      description: "Application viewing will be available soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-background to-primary/5 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={['hsl(var(--primary))', '#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3']}
        />
      )}

      <div className="w-full max-w-lg mx-auto relative z-10">
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur animate-fade-in">
          <CardContent className="p-8 text-center">
            {/* Success Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-scale-in">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              
              {/* Main Headline */}
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent mb-2">
                Application Sent! 🎯
              </h1>
              
              {/* Personalized Message */}
              <p className="text-lg text-muted-foreground mb-4">
                Thanks {userName}! We'll text or email you if selected.
              </p>
            </div>

            {/* Job Details */}
            {jobTitle && (
              <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                <h3 className="font-semibold text-foreground mb-1">Applied for:</h3>
                <p className="text-lg font-bold text-primary">{jobTitle}</p>
                {jobCompany && (
                  <p className="text-sm text-muted-foreground">at {jobCompany}</p>
                )}
              </div>
            )}

            {/* What's Next */}
            <div className="mb-8 text-left">
              <h3 className="font-semibold text-foreground mb-3 text-center">What happens next?</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>We'll review your application within 24-48 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>If selected, we'll text or email you to schedule an interview</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                  <span>Keep applying to increase your chances!</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleBackToSearch}
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                <Search className="w-5 h-5 mr-2" />
                🔍 Back to Job Search
              </Button>
              
              <Button
                variant="outline"
                onClick={handleViewApplication}
                className="w-full h-12"
              >
                <FileText className="w-5 h-5 mr-2" />
                📄 View My Application
              </Button>
            </div>

            {/* Auto-redirect Notice */}
            <div className="mt-6 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Auto-redirecting to job search in {countdown} seconds...
              </p>
              <div className="w-full bg-muted rounded-full h-1 mt-2">
                <div 
                  className="bg-primary h-1 rounded-full transition-all duration-1000"
                  style={{ width: `${((7 - countdown) / 7) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Floating Success Elements */}
        <div className="absolute -top-4 -left-4 text-4xl animate-bounce">🎉</div>
        <div className="absolute -top-2 -right-6 text-3xl animate-pulse">✨</div>
        <div className="absolute -bottom-2 -left-6 text-3xl animate-bounce delay-500">🎊</div>
        <div className="absolute -bottom-4 -right-4 text-4xl animate-pulse delay-300">🎯</div>
      </div>
    </div>
  );
};

export default SuccessPage;