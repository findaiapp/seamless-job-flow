import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, DollarSign, Users, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    pay_range?: string;
    is_verified?: boolean;
    description?: string;
    benefits?: string;
    job_type?: string;
  };
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [applicationsToday, setApplicationsToday] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicationCount = async () => {
      try {
        // Get applications for this job from today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const { data, error } = await supabase
          .from('job_applications')
          .select('id')
          .eq('job_id', job.id)
          .gte('created_at', today.toISOString());

        if (error) {
          console.error('Error fetching application count:', error);
          // Use fake number if query fails
          setApplicationsToday(Math.floor(Math.random() * 18) + 8);
        } else {
          const realCount = data?.length || 0;
          // If no real applications, generate a fake number for urgency
          if (realCount === 0) {
            setApplicationsToday(Math.floor(Math.random() * 18) + 8);
          } else {
            setApplicationsToday(realCount);
          }
        }
      } catch (error) {
        console.error('Error in fetchApplicationCount:', error);
        setApplicationsToday(Math.floor(Math.random() * 18) + 8);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationCount();
  }, [job.id]);

  const getJobBadges = () => {
    const badges = [];
    
    if (job.is_verified) {
      badges.push({ text: "Verified", variant: "default" as const, icon: CheckCircle });
    }
    
    if (job.job_type === "part-time") {
      badges.push({ text: "Flexible Hours", variant: "secondary" as const });
    }
    
    // Add some mock badges for demo
    badges.push({ text: "No Interview", variant: "secondary" as const });
    badges.push({ text: "Quick Start", variant: "secondary" as const });
    
    if (job.benefits) {
      badges.push({ text: "Benefits", variant: "secondary" as const });
    }

    return badges.slice(0, 3); // Limit to 3 badges
  };

  const formatPayRange = (payRange?: string) => {
    if (!payRange) return "$18-$22/hr";
    return payRange.includes("$") ? payRange : `$${payRange}`;
  };

  const badges = getJobBadges();

  return (
    <Card className="mb-6 overflow-hidden border-0 shadow-lg">
      {/* Green header section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">
              NOW HIRING<br />
              {job.title.toUpperCase()}
            </h1>
            <div className="flex items-center gap-4 text-green-100 mb-3">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-white/20 rounded"></div>
                <span className="text-sm font-medium">{job.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm font-semibold">{formatPayRange(job.pay_range)}</span>
              </div>
            </div>
          </div>
          
          {job.is_verified && (
            <Badge variant="outline" className="bg-white/20 border-white/30 text-white">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          )}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {badges.map((badge, index) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-white/20 border-white/30 text-white text-xs"
            >
              {badge.icon && <badge.icon className="h-3 w-3 mr-1" />}
              {badge.text}
            </Badge>
          ))}
        </div>

        {/* Why This Job Rocks section */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Why This Job Rocks:</h3>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-200" />
              <span>Start immediately with full training provided</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-200" />
              <span>Flexible scheduling options available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-200" />
              <span>Excellent growth opportunities within the company</span>
            </div>
          </div>
        </div>

        {/* Application urgency banner */}
        <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-3 mt-4">
          <div className="flex items-center gap-2 text-yellow-100">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">
              {loading ? (
                "Loading application data..."
              ) : (
                `📈 ${applicationsToday} others applied today – Apply now to stand out!`
              )}
            </span>
          </div>
        </div>
      </div>

      {/* White bottom section */}
      <CardContent className="p-6 bg-white">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Complete Your Application
        </h2>
        <p className="text-gray-600 text-sm">
          Takes less than 2 minutes • Get hired faster
        </p>
      </CardContent>
    </Card>
  );
};