import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, Copy, MessageCircle, Share2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [countdown, setCountdown] = useState(7);
  const [showConfetti, setShowConfetti] = useState(false);

  // Get referral code from URL or generate basic share link
  const referralCode = searchParams.get('ref') || '';
  const baseUrl = window.location.origin;
  const shareLink = referralCode 
    ? `${baseUrl}/search-jobs?ref=${referralCode}`
    : `${baseUrl}/search-jobs`;

  useEffect(() => {
    // Trigger confetti animation
    setShowConfetti(true);
    
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/search-jobs');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      toast({
        title: "Link copied!",
        description: "Share link copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const shareViaSMS = () => {
    const message = encodeURIComponent(`Check out these job opportunities: ${shareLink}`);
    window.open(`sms:?body=${message}`, '_blank');
  };

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(`Check out these job opportunities: ${shareLink}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const shareViaFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
    window.open(fbUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-6">
        {/* Success Animation */}
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4 transition-all duration-500 ${showConfetti ? 'scale-110' : 'scale-100'}`}>
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            ✅ Application Received!
          </h1>
          <p className="text-lg text-muted-foreground">
            You're one step closer to landing the job.
          </p>
        </div>

        {/* Main Success Card */}
        <Card>
          <CardHeader className="text-center">
            <h2 className="text-xl font-semibold">What happens next?</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium">Employer Review</p>
                  <p className="text-sm text-muted-foreground">Your application will be reviewed within 24-48 hours</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-primary">2</span>
                </div>
                <div>
                  <p className="font-medium">Interview Setup</p>
                  <p className="text-sm text-muted-foreground">If you're a good fit, they'll reach out to schedule an interview</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-primary">3</span>
                </div>
                <div>
                  <p className="font-medium">Get Hired!</p>
                  <p className="text-sm text-muted-foreground">Complete the interview process and start your new job</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Share Section */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              Know someone else looking for work?
            </h3>
            <p className="text-sm text-muted-foreground">
              Share this link and help them find opportunities too!
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy Link
              </Button>
              
              <Button 
                variant="outline" 
                onClick={shareViaSMS}
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                SMS
              </Button>
              
              <Button 
                variant="outline" 
                onClick={shareViaFacebook}
                className="flex items-center gap-2"
              >
                <span className="text-blue-600">f</span>
                Facebook
              </Button>
              
              <Button 
                variant="outline" 
                onClick={shareViaWhatsApp}
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-green-600" />
                WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Auto Redirect Notice */}
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Loading more job options for you now…</p>
                <p className="text-sm text-muted-foreground">
                  Redirecting in {countdown} seconds
                </p>
              </div>
              <Button 
                onClick={() => navigate('/search-jobs')}
                className="flex items-center gap-2"
              >
                Browse Jobs <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThankYouPage;