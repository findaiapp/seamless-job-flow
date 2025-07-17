import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApplicationFormData } from '@/hooks/useApplicationFormData';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';

const StepFiveSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = useApplicationFormData();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Get name from location state, form data, or default to "there"
  const userName = (location.state as { name?: string })?.name || 
                   formData.fullName || 
                   "there";

  useEffect(() => {
    // Auto-scroll to top
    window.scrollTo(0, 0);

    // Handle window resize for confetti
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const handleReturnToJobs = () => {
    navigate('/search-jobs');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/10 flex items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
          colors={['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#FFD700', '#FF6B6B', '#4ECDC4']}
        />
      )}
      
      <div className="max-w-2xl mx-auto text-center animate-fade-in">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <CheckCircle className="w-24 h-24 text-primary animate-scale-in" />
            <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-primary/20 animate-pulse" />
          </div>
        </div>

        {/* Main Congratulations Message */}
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent mb-6 leading-tight">
          🎉 You did it, {userName}!
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8">
          Your application is complete.
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-lg mx-auto leading-relaxed">
          We've sent your info to our hiring team. You'll hear back soon!
        </p>

        {/* CTA Button */}
        <Button 
          onClick={handleReturnToJobs}
          size="lg"
          className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Return to Job Feed →
        </Button>

        {/* Success Badge */}
        <div className="mt-16 inline-flex items-center gap-2 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full text-primary font-medium">
          <span className="text-2xl">🎯</span>
          <span>Application Submitted Successfully</span>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>
  );
};

export default StepFiveSuccess;