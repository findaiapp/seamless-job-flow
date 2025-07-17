import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bell, MapPin, DollarSign, Clock, Plus, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { useJobAlerts } from "@/hooks/useJobAlerts";
import { useToast } from "@/hooks/use-toast";

const JOB_CATEGORIES = [
  "All Jobs",
  "Delivery",
  "Warehouse",
  "Security",
  "Cleaning",
  "Construction",
  "Food Service",
  "Customer Service",
  "Retail",
  "Healthcare"
];

const NYC_LOCATIONS = [
  "All NYC",
  "Manhattan",
  "Brooklyn",
  "Queens",
  "Bronx",
  "Staten Island"
];

export default function AlertsPage() {
  const { alerts, loading, createAlert, updateAlert, deleteAlert } = useJobAlerts();
  const { toast } = useToast();
  
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newAlert, setNewAlert] = useState({
    categories: [] as string[],
    location: "",
    pay_min: 15,
    pay_max: 30,
    frequency: "daily",
    is_active: true
  });

  // Mock preferences
  const [preferences, setPreferences] = useState({
    job_alerts_enabled: true,
    preferred_channel: "email"
  });

  const updatePreferences = (updates: any) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  };

  const handleCreateAlert = async () => {
    try {
      await createAlert(newAlert);
      setShowCreateDialog(false);
      setNewAlert({
        categories: [],
        location: "",
        pay_min: 15,
        pay_max: 30,
        frequency: "daily",
        is_active: true
      });
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  const toggleCategory = (category: string) => {
    setNewAlert(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const formatCategories = (categories: string[]) => {
    if (categories.length === 0) return "All Jobs";
    if (categories.length === 1) return categories[0];
    if (categories.length === 2) return categories.join(" & ");
    return `${categories[0]} +${categories.length - 1} more`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link to="/search-jobs">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Job Alerts</h1>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create Job Alert</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">Job Categories</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {JOB_CATEGORIES.slice(1).map((category) => (
                      <Button
                        key={category}
                        variant={newAlert.categories.includes(category) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleCategory(category)}
                        className="justify-start text-xs"
                      >
                        {newAlert.categories.includes(category) && <Check className="h-3 w-3 mr-1" />}
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Location</Label>
                  <Select value={newAlert.location} onValueChange={(value) => setNewAlert(prev => ({ ...prev, location: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      {NYC_LOCATIONS.map((location) => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Pay Range: ${newAlert.pay_min} - ${newAlert.pay_max}/hr
                  </Label>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-muted-foreground">Minimum: ${newAlert.pay_min}/hr</Label>
                      <Slider
                        value={[newAlert.pay_min]}
                        onValueChange={([value]) => setNewAlert(prev => ({ ...prev, pay_min: value }))}
                        max={50}
                        min={10}
                        step={1}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Maximum: ${newAlert.pay_max}/hr</Label>
                      <Slider
                        value={[newAlert.pay_max]}
                        onValueChange={([value]) => setNewAlert(prev => ({ ...prev, pay_max: value }))}
                        max={50}
                        min={10}
                        step={1}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">Frequency</Label>
                  <Select value={newAlert.frequency} onValueChange={(value) => setNewAlert(prev => ({ ...prev, frequency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleCreateAlert} 
                  disabled={loading || !newAlert.location}
                  className="w-full"
                >
                  {loading ? "Creating..." : "Create Alert"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="container px-4 py-6 max-w-2xl">
        {/* Notification Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Job Alerts Enabled</Label>
                <p className="text-xs text-muted-foreground">Receive notifications for new matching jobs</p>
              </div>
              <Switch 
                checked={preferences.job_alerts_enabled}
                onCheckedChange={(checked) => updatePreferences({ job_alerts_enabled: checked })}
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Preferred Method</Label>
              <Select 
                value={preferences.preferred_channel}
                onValueChange={(value) => updatePreferences({ preferred_channel: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="push">Push Notifications</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Your Alerts ({alerts.length})</h2>
          
          {alerts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No job alerts yet</h3>
                <p className="text-muted-foreground mb-4">
                  Create your first alert to get notified about matching jobs
                </p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Alert
                </Button>
              </CardContent>
            </Card>
          ) : (
            alerts.map((alert) => (
              <Card key={alert.id} className="relative">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">
                          {formatCategories(alert.categories)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          daily
                        </Badge>
                        {!alert.is_active && (
                          <Badge variant="destructive" className="text-xs">Paused</Badge>
                        )}
                      </div>
                      
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{alert.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          <span>${alert.pay_min} - ${alert.pay_max}/hr</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Created {new Date(alert.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={alert.is_active}
                        onCheckedChange={(checked) => updateAlert(alert.id, { is_active: checked })}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteAlert(alert.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Tips */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <h3 className="font-medium mb-3">💡 Pro Tips</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Set up multiple alerts for different job types and locations</li>
              <li>• Daily alerts get you the freshest opportunities</li>
              <li>• We'll send you a summary of the top 3 matching jobs each time</li>
              <li>• You can pause alerts anytime and resume them later</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}