import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Bell, Smartphone, Mail, Shield, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  // Mock preferences since useJobAlerts doesn't have these properties
  const [preferences, setPreferences] = useState({
    job_alerts_enabled: true,
    preferred_channel: "email",
    phone_number: ""
  });
  
  const updatePreferences = (updates: any) => {
    setPreferences(prev => ({ ...prev, ...updates }));
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
            <h1 className="text-lg font-semibold">Settings</h1>
          </div>
        </div>
      </header>

      <div className="container px-4 py-6 max-w-2xl">
        {/* Notification Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Job Alerts</Label>
                <p className="text-xs text-muted-foreground">Get notified about new matching jobs</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs ${preferences?.job_alerts_enabled ? 'text-primary' : 'text-muted-foreground'}`}>
                  {preferences?.job_alerts_enabled ? '🔔 On' : '🔕 Off'}
                </span>
                <Switch 
                  checked={preferences?.job_alerts_enabled ?? true}
                  onCheckedChange={(checked) => updatePreferences({ job_alerts_enabled: checked })}
                />
              </div>
            </div>
            
            {preferences?.job_alerts_enabled && (
              <>
                <div>
                  <Label className="text-sm font-medium mb-2 block">Preferred Channel</Label>
                  <Select 
                    value={preferences?.preferred_channel ?? "email"}
                    onValueChange={(value) => updatePreferences({ preferred_channel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </div>
                      </SelectItem>
                      <SelectItem value="sms">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          SMS
                        </div>
                      </SelectItem>
                      <SelectItem value="push">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          Push Notifications
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {preferences?.preferred_channel === 'sms' && (
                  <div>
                    <Label className="text-sm font-medium mb-2 block">Phone Number</Label>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={preferences?.phone_number ?? ""}
                      onChange={(e) => updatePreferences({ phone_number: e.target.value })}
                    />
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/alerts">
              <Button variant="outline" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Manage Job Alerts
              </Button>
            </Link>
            
            <Button variant="outline" className="w-full justify-start" disabled>
              <Shield className="h-4 w-4 mr-2" />
              Privacy Settings
              <span className="ml-auto text-xs text-muted-foreground">Coming Soon</span>
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated</span>
              <span>Today</span>
            </div>
            <div className="pt-3 border-t">
              <p className="text-xs">
                Get fast access to the best job opportunities in NYC. 
                Start working today with our verified job listings.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}