// 🦄 Smart Alerts Modal - Job-seeking sidekick
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Bell, MapPin, DollarSign, Clock, X, Trash2 } from "lucide-react";
import { useSmartJobAlerts, CreateJobAlertData, JobAlert } from "@/hooks/useSmartJobAlerts";
import { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";

interface SmartAlertsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
  defaultTitle?: string;
  defaultLocation?: string;
}

const NYC_LOCATIONS = [
  { value: "Manhattan", label: "Manhattan" },
  { value: "Brooklyn", label: "Brooklyn" },
  { value: "Queens", label: "Queens" },
  { value: "Bronx", label: "Bronx" },
  { value: "Staten Island", label: "Staten Island" },
  { value: "New York", label: "All NYC" },
];

const SCHEDULE_OPTIONS = [
  { value: "any", label: "Any Schedule" },
  { value: "day", label: "Day Shift (9AM-5PM)" },
  { value: "night", label: "Night Shift (5PM-1AM)" },
  { value: "weekend", label: "Weekends Only" },
  { value: "flexible", label: "Flexible Hours" },
];

export function SmartAlertsModal({ 
  open, 
  onOpenChange, 
  user,
  defaultTitle = "",
  defaultLocation = "Manhattan" 
}: SmartAlertsModalProps) {
  const {
    alerts,
    loading,
    saving,
    saveAlert,
    deleteAlert,
    toggleAlert,
    hasAlerts,
    activeAlertsCount
  } = useSmartJobAlerts(user);

  const [formData, setFormData] = useState<CreateJobAlertData>({
    title: defaultTitle,
    city: defaultLocation,
    min_pay: 18,
    schedule: "any",
    frequency: "daily"
  });

  const [showCreateForm, setShowCreateForm] = useState(!hasAlerts);

  // Update form when defaults change
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      title: defaultTitle || prev.title,
      city: defaultLocation || prev.city,
    }));
  }, [defaultTitle, defaultLocation]);

  // Show form by default if no alerts exist
  useEffect(() => {
    if (!hasAlerts && !loading) {
      setShowCreateForm(true);
    }
  }, [hasAlerts, loading]);

  const handleSaveAlert = async () => {
    if (!formData.title.trim() || !formData.city) return;
    
    const success = await saveAlert(formData);
    if (success) {
      setFormData({
        title: "",
        city: "Manhattan",
        min_pay: 18,
        schedule: "any",
        frequency: "daily"
      });
      setShowCreateForm(false);
    }
  };

  const getMissedJobsText = () => {
    if (!hasAlerts) return "Missed 4 jobs this week? Never again — set up a smart alert.";
    return `Watching ${activeAlertsCount} alert${activeAlertsCount === 1 ? '' : 's'} for you 24/7`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Bell className="w-5 h-5 text-primary" />
            Smart Job Alerts
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header with stats */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              {getMissedJobsText()}
            </p>
            {hasAlerts && (
              <div className="flex justify-center gap-2">
                <Badge variant="secondary">
                  {alerts.length} alert{alerts.length === 1 ? '' : 's'}
                </Badge>
                <Badge variant="default">
                  {activeAlertsCount} active
                </Badge>
              </div>
            )}
          </div>

          {/* Existing Alerts */}
          {hasAlerts && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Your Active Alerts</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCreateForm(!showCreateForm)}
                >
                  {showCreateForm ? "Cancel" : "+ New Alert"}
                </Button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {alerts.map((alert: JobAlert) => (
                  <Card key={alert.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{alert.title}</h4>
                            <Switch
                              checked={alert.is_active}
                              onCheckedChange={(checked) => toggleAlert(alert.id, checked)}
                            />
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {alert.city}
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              ${alert.min_pay}+/hr
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {alert.schedule}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteAlert(alert.id)}
                          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Create New Alert Form */}
          {showCreateForm && (
            <div className="space-y-4 border-t pt-6">
              <h3 className="font-medium">Create New Alert</h3>
              
              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Job Title / Keywords</Label>
                <Input
                  id="title"
                  placeholder="e.g., Cashier, Server, Driver, Delivery"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label>Location</Label>
                <Select
                  value={formData.city}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {NYC_LOCATIONS.map((location) => (
                      <SelectItem key={location.value} value={location.value}>
                        {location.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Pay Range */}
              <div className="space-y-3">
                <Label>Minimum Pay: ${formData.min_pay}/hour</Label>
                <div className="px-3">
                  <Slider
                    value={[formData.min_pay]}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, min_pay: value[0] }))}
                    max={40}
                    min={15}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$15/hr</span>
                    <span>$40/hr</span>
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-2">
                <Label>Schedule Preference</Label>
                <Select
                  value={formData.schedule}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, schedule: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SCHEDULE_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSaveAlert}
                disabled={!formData.title.trim() || !formData.city || saving}
                className="w-full"
                size="lg"
              >
                {saving ? "Saving..." : "Save Alert 🎯"}
              </Button>
            </div>
          )}

          {/* Call to Action */}
          {!user && (
            <div className="text-center p-4 bg-muted/30 rounded-lg border-2 border-dashed border-muted">
              <p className="text-sm text-muted-foreground">
                Sign in to save job alerts and never miss opportunities
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
