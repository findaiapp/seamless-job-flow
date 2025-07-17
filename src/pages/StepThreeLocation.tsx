import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { MapPin } from "lucide-react";

const StepThreeLocation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    city: "",
    neighborhood: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [cityError, setCityError] = useState("");

  const predefinedCities = [
    "New York City, NY",
    "Brooklyn, NY", 
    "Bronx, NY",
    "Queens, NY",
    "Staten Island, NY",
    "Newark, NJ",
    "Jersey City, NJ",
    "Hoboken, NJ",
    "Yonkers, NY",
    "White Plains, NY",
    "Mount Vernon, NY",
    "New Rochelle, NY",
    "Long Island City, NY",
    "Flushing, NY",
    "Jamaica, NY",
    "Astoria, NY",
    "Williamsburg, NY",
    "Park Slope, NY",
    "Manhattan, NY",
    "Harlem, NY"
  ];

  useEffect(() => {
    if (formData.city.length > 0) {
      const filtered = predefinedCities.filter(city =>
        city.toLowerCase().includes(formData.city.toLowerCase())
      );
      setFilteredCities(filtered);
      setShowSuggestions(filtered.length > 0 && formData.city.length > 1);
    } else {
      setShowSuggestions(false);
      setFilteredCities([]);
    }
  }, [formData.city]);

  const handleCityChange = (value: string) => {
    setFormData(prev => ({ ...prev, city: value }));
    setCityError("");
  };

  const handleCitySelect = (city: string) => {
    setFormData(prev => ({ ...prev, city }));
    setShowSuggestions(false);
    setCityError("");
  };

  const handleNeighborhoodChange = (value: string) => {
    setFormData(prev => ({ ...prev, neighborhood: value }));
  };

  const validateForm = () => {
    if (!formData.city.trim()) {
      setCityError("Please enter a city or zip code");
      return false;
    }
    return true;
  };

  const updateApplication = async () => {
    try {
      // Get the most recent application with in_progress status
      const { data: applications, error: fetchError } = await supabase
        .from('applications')
        .select('*')
        .eq('status', 'in_progress')
        .order('created_at', { ascending: false })
        .limit(1);

      if (fetchError) {
        console.error("❌ Error fetching application:", fetchError);
        toast({
          title: "❌ Error finding your application",
          description: fetchError.message,
          variant: "destructive",
        });
        return { success: false };
      }

      if (!applications || applications.length === 0) {
        toast({
          title: "❌ No application found",
          description: "Please start from Step 1",
          variant: "destructive",
        });
        navigate("/step-one-personal-info");
        return { success: false };
      }

      const applicationId = applications[0].id;

      // Update the application with location preferences
      const { data, error } = await supabase
        .from('applications')
        .update({
          location: formData.neighborhood ? 
            `${formData.city}, ${formData.neighborhood}` : 
            formData.city,
          updated_at: new Date().toISOString(),
        })
        .eq('id', applicationId)
        .select()
        .single();

      if (error) {
        console.error("❌ Supabase update error:", error);
        toast({
          title: "❌ Update failed",
          description: error.message,
          variant: "destructive",
        });
        return { success: false };
      }

      console.log("✅ Application location updated", data);
      return { success: true, id: data.id };
    } catch (e) {
      console.error("🔥 Unexpected error:", e);
      toast({
        title: "⚠️ Something went wrong",
        description: e instanceof Error ? e.message : "Unknown error",
        variant: "destructive",
      });
      return { success: false };
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const result = await updateApplication();
      
      if (result.success) {
        toast({
          title: "🎉 Location saved!",
          description: "Let's review your application",
        });
        navigate("/step-four-review");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.city.trim();

  return (
    <div className="min-h-screen bg-background flex flex-col p-6 relative">
      {/* Header */}
      <div className="pt-8 pb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2 animate-fade-in">
          Where Are You Looking to Work?
        </h1>
        <p className="text-muted-foreground text-lg animate-fade-in">
          We'll prioritize jobs closest to you.
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6">
        {/* City Input */}
        <div className="space-y-2 animate-fade-in relative">
          <Label htmlFor="city" className="text-foreground font-medium">
            City or Zip Code *
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground transition-all duration-200" />
            <Input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) => handleCityChange(e.target.value)}
              placeholder="Enter city or zip code"
              className="h-12 text-lg pl-12 transition-all duration-200 focus:scale-[1.02] hover-scale"
              onFocus={() => formData.city.length > 1 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
          </div>
          
          {/* City Suggestions */}
          {showSuggestions && filteredCities.length > 0 && (
            <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto animate-fade-in">
              {filteredCities.slice(0, 8).map((city, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full text-left px-4 py-3 hover:bg-accent transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                  onClick={() => handleCitySelect(city)}
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground">{city}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
          
          {cityError && (
            <p className="text-destructive text-sm animate-fade-in">{cityError}</p>
          )}
        </div>

        {/* Neighborhood Input */}
        <div className="space-y-2 animate-fade-in">
          <Label htmlFor="neighborhood" className="text-foreground font-medium">
            Neighborhood or Borough <span className="text-muted-foreground">(Optional)</span>
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="neighborhood"
              type="text"
              value={formData.neighborhood}
              onChange={(e) => handleNeighborhoodChange(e.target.value)}
              placeholder="e.g., Downtown, Midtown, etc."
              className="h-12 text-lg pl-12 transition-all duration-200 focus:scale-[1.02] hover-scale"
            />
          </div>
        </div>

        {/* Validation Prompt */}
        {!formData.city && (
          <p className="text-muted-foreground text-sm animate-fade-in">
            📍 Please enter your preferred work location
          </p>
        )}
      </div>

      {/* Next Button - Pinned to bottom */}
      <div className="pt-8 pb-6">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          className="w-full h-14 text-lg font-semibold transition-all duration-200 hover:scale-[1.02] disabled:opacity-50"
          size="lg"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Saving...
            </div>
          ) : (
            "Next →"
          )}
        </Button>
      </div>
    </div>
  );
};

export default StepThreeLocation;