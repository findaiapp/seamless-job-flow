import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Copy, Share2, MessageCircle, Gift, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReferralCTAProps {
  userName: string;
  jobId: string;
}

const ReferralCTA = ({ userName, jobId }: ReferralCTAProps) => {
  const [referralLink, setReferralLink] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const { toast } = useToast();

  React.useEffect(() => {
    // Generate referral code and link
    const code = `${userName.split(' ')[0].toUpperCase()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/apply/${jobId}/step-1?ref=${code}`;
    
    setReferralCode(code);
    setReferralLink(link);
  }, [userName, jobId]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied! 📋",
        description: "Link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const shareViaSMS = () => {
    const message = `Hey! I just applied for a job and thought you might be interested too. Check it out: ${referralLink} 💼`;
    const smsUrl = `sms:?body=${encodeURIComponent(message)}`;
    window.open(smsUrl, '_blank');
  };

  const shareViaWhatsApp = () => {
    const message = `Hey! I just applied for a job and thought you might be interested too. Check it out: ${referralLink} 💼`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="mt-6 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          Know someone else looking? Get $10 when they apply.
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Share this opportunity with friends and earn rewards when they get hired!
        </p>
        
        {/* Referral Link */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Your Referral Link:
          </label>
          <div className="flex gap-2">
            <Input
              value={referralLink}
              readOnly
              className="text-xs bg-background"
            />
            <Button
              onClick={() => copyToClipboard(referralLink)}
              size="sm"
              variant="outline"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Referral Code */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground">
            Your Referral Code:
          </label>
          <div className="flex gap-2">
            <Input
              value={referralCode}
              readOnly
              className="text-sm font-mono bg-background text-center"
            />
            <Button
              onClick={() => copyToClipboard(referralCode)}
              size="sm"
              variant="outline"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={shareViaSMS}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            📲 SMS
          </Button>
          <Button
            onClick={shareViaWhatsApp}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Share2 className="h-4 w-4 mr-2" />
            📤 WhatsApp
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          They'll see your referral code when they apply, and you'll both benefit! 🎉
        </p>
      </CardContent>
    </Card>
  );
};

export default ReferralCTA;