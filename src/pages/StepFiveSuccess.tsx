import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Confetti from "react-confetti";
import { Check, Rocket, Share2, Search } from "lucide-react";

const StepFiveSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const [userName, setUserName] = useState("Friend");
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Get window dimensions for confetti
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Stop confetti after 5 seconds
    const confettiTimer = setTimeout(() => {
      setShowConfetti(false);
    }, 5000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(confettiTimer);
    };
  }, []);

  useEffect(() => {
    // Get user name from location state or fetch from Supabase
    const fetchUserData = async () => {
      try {
        // Try to get name from location state first
        if (location.state?.name) {
          setUserName(location.state.name);
          return;
        }

        // Fallback: fetch from Supabase
        const { data: applications, error } = await supabase
          .from('applications')
          .select('name')
          .eq('status', 'submitted')
          .order('submitted_at', { ascending: false })
          .limit(1);

        if (!error && applications && applications.length > 0 && applications[0].name) {
          setUserName(applications[0].name);
        }
      } catch (e) {
        console.error("Error fetching user data:", e);
        // Keep default "Friend" if fetch fails
      }
    };

    fetchUserData();
  }, [location.state, navigate, toast]);

  const handleBrowseJobs = () => {
    navigate("/search-jobs");
  };

  const handleReferFriend = () => {
    // Simple share functionality
    if (navigator.share) {
      navigator.share({
        title: "Join me on this job platform!",
        text: "I just applied for jobs easily. You should try it too!",
        url: window.location.origin,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.origin);
      toast({
        title: "🔗 Link copied!",
        description: "Share this link with your friends",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={300}
          gravity={0.3}
        />
      )}

      {/* Success Content */}
      <div className="text-center space-y-6 animate-fade-in max-w-md w-full">
        {/* Success Badge */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full mb-4 animate-scale-in">
          <Check className="w-12 h-12 text-green-600 dark:text-green-400" />
        </div>

        {/* Main Title */}
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
            🎉 You're In!
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto rounded-full animate-fade-in" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Personalized Message */}
        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-xl text-muted-foreground">
            Thanks, <span className="font-semibold text-foreground">{userName}</span>!
          </p>
          <p className="text-lg text-muted-foreground">
            Your application has been submitted. We'll reach out shortly.
          </p>
        </div>

        {/* Success Details */}
        <div className="bg-accent/50 rounded-lg p-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="flex items-center gap-2 text-accent-foreground">
            <Rocket className="w-5 h-5" />
            <span className="font-medium">Application Status: Submitted</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4 animate-fade-in" style={{ animationDelay: '1s' }}>
          <Button
            onClick={handleBrowseJobs}
            className="w-full h-12 text-lg font-semibold transition-all duration-200 hover:scale-[1.02]"
            size="lg"
          >
            <Search className="w-5 h-5 mr-2" />
            Browse More Jobs
          </Button>
          
          <Button
            onClick={handleReferFriend}
            variant="outline"
            className="w-full h-12 text-lg font-semibold transition-all duration-200 hover:scale-[1.02]"
            size="lg"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Refer a Friend
          </Button>
        </div>

        {/* Footer Message */}
        <p className="text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '1.2s' }}>
          Keep an eye on your email and phone for updates!
        </p>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default StepFiveSuccess;
