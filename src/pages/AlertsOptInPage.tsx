import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const AlertsOptInPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    city: "",
    job_type: "",
    phone_number: "",
    email: "",
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const popularCities = [
    "New York, NY", "Brooklyn, NY", "Queens, NY", "Bronx, NY", "Manhattan, NY",
    "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Phoenix, AZ", "Philadelphia, PA",
    "San Antonio, TX", "San Diego, CA", "Dallas, TX", "Austin, TX", "Jacksonville, FL"
  ];

  const jobTypes = [
    "Warehouse", "Childcare", "Delivery", "Cleaning", "Food Service", "Other"
  ];

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(phone);
  };

  const formatPhoneToE164 = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return `+1${cleaned}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast({
        title: "❌ Consent Required",
        description: "Please agree to receive text messages to continue.",
        variant: "destructive"
      });
      return;
    }

    if (!validatePhoneNumber(formData.phone_number)) {
      toast({
        title: "❌ Invalid Phone Number",
        description: "Please enter a valid US phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('alert_optins')
        .insert({
          first_name: formData.first_name,
          city: formData.city,
          job_type: formData.job_type,
          phone_number: formatPhoneToE164(formData.phone_number),
          email: formData.email || null,
          consent: formData.consent,
          utm_source: new URLSearchParams(window.location.search).get('utm_source') || null
        });

      if (error) {
        if (error.code === '23505') { // Unique constraint violation
          toast({
            title: "📱 Already Signed Up",
            description: "This phone number is already receiving job alerts!",
            variant: "destructive"
          });
        } else {
          throw error;
        }
        return;
      }

      toast({
        title: "✅ You're in!",
        description: "We'll text you new jobs soon.",
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate('/search-jobs?joined_alerts=true');
      }, 2000);

    } catch (error) {
      console.error('Error submitting alert signup:', error);
      toast({
        title: "❌ Something went wrong",
        description: "Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            🚨 Get Hired Fast — Join the Smart Job Alert List
          </h1>
          <p className="text-muted-foreground">
            We'll text you new jobs in your area. No resume needed.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              type="text"
              required
              value={formData.first_name}
              onChange={(e) => setFormData({...formData, first_name: e.target.value})}
              placeholder="Enter your first name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select value={formData.city} onValueChange={(value) => setFormData({...formData, city: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select your city" />
              </SelectTrigger>
              <SelectContent>
                {popularCities.map((city) => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
                <SelectItem value="other">Other (please specify in email)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="job_type">Job Type</Label>
            <Select value={formData.job_type} onValueChange={(value) => setFormData({...formData, job_type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                {jobTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone_number">Phone Number</Label>
            <Input
              id="phone_number"
              type="tel"
              required
              value={formData.phone_number}
              onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
              placeholder="(555) 123-4567"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="your@email.com"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="consent"
              checked={formData.consent}
              onCheckedChange={(checked) => setFormData({...formData, consent: checked as boolean})}
            />
            <Label htmlFor="consent" className="text-sm">
              ✅ I agree to receive text messages from Hireloop. Msg & data rates may apply.
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !formData.first_name || !formData.city || !formData.job_type || !formData.phone_number || !formData.consent}
          >
            {isSubmitting ? "Joining..." : "🔔 Join Alert List"}
          </Button>
        </form>

        {/* Trust Message */}
        <p className="text-center text-sm text-muted-foreground">
          No spam. Only real jobs. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
};

export default AlertsOptInPage;