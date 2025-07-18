import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { User, Sparkles } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AutofillBarProps {
  onAutofill: (data: any) => void;
  currentFormData: any;
}

const AutofillBar = ({ onAutofill, currentFormData }: AutofillBarProps) => {
  const [showAutofill, setShowAutofill] = useState(false);
  const [previousData, setPreviousData] = useState<any>(null);
  const [useAutofill, setUseAutofill] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    checkForPreviousData();
  }, []);

  const checkForPreviousData = async () => {
    try {
      // Check for previous applications by phone number (most reliable identifier)
      const { data: applications, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error checking previous data:', error);
        return;
      }

      if (applications && applications.length > 0) {
        const lastApp = applications[0];
        if (lastApp.full_name && lastApp.phone) {
          setPreviousData(lastApp);
          setShowAutofill(true);
        }
      }
    } catch (error) {
      console.error('Error checking previous applications:', error);
    }
  };

  const handleAutofill = () => {
    if (previousData && useAutofill) {
      onAutofill({
        fullName: previousData.full_name,
        phoneNumber: previousData.phone,
        location: previousData.location || '',
        email: '', // Don't autofill email for privacy
      });

      toast({
        title: "Information Autofilled! 👀",
        description: "We've filled in your details from your last application",
      });
    }
  };

  useEffect(() => {
    if (useAutofill) {
      handleAutofill();
    }
  }, [useAutofill]);

  if (!showAutofill || !previousData) return null;

  return (
    <Card className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <User className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground mb-1">
            We remember you 👀 — want to autofill your info?
          </p>
          <p className="text-xs text-muted-foreground">
            Found: {previousData.full_name} • {previousData.phone}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="autofill-mode"
            checked={useAutofill}
            onCheckedChange={setUseAutofill}
          />
          <Label htmlFor="autofill-mode" className="text-xs font-medium">
            Use previous info
          </Label>
        </div>
      </div>
    </Card>
  );
};

export default AutofillBar;