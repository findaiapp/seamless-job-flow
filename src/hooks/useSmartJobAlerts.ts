// 🦄 Smart Job Alerts Hook - Personal job-seeking sidekick
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";

export interface JobAlert {
  id: string;
  user_id: string;
  title: string;
  city: string;
  min_pay: number;
  schedule: string;
  frequency: string;
  is_active: boolean;
  created_at: string;
}

export interface CreateJobAlertData {
  title: string;
  city: string;
  min_pay: number;
  schedule: string;
  frequency?: string;
}

export function useSmartJobAlerts(user: User | null) {
  const [alerts, setAlerts] = useState<JobAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  // Load user's alerts (mock implementation)
  const loadAlerts = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Mock alerts data
      const mockAlerts: JobAlert[] = [
        {
          id: '1',
          user_id: 'mock-user',
          title: 'Delivery Driver',
          city: 'Brooklyn, NY',
          min_pay: 18,
          schedule: 'Part-time',
          frequency: 'daily',
          is_active: true,
          created_at: new Date().toISOString()
        }
      ];
      setAlerts(mockAlerts);
    } catch (error) {
      console.error('Error loading alerts:', error);
      toast({
        title: "Error",
        description: "Failed to load job alerts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Save new alert (mock implementation)
  const saveAlert = async (alertData: CreateJobAlertData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save job alerts",
        variant: "destructive",
      });
      return false;
    }

    setSaving(true);
    try {
      const newAlert: JobAlert = {
        id: Date.now().toString(),
        user_id: 'mock-user',
        title: alertData.title,
        city: alertData.city,
        min_pay: alertData.min_pay,
        schedule: alertData.schedule,
        frequency: alertData.frequency || 'daily',
        is_active: true,
        created_at: new Date().toISOString()
      };

      setAlerts(prev => [newAlert, ...prev]);
      toast({
        title: "Alert Saved! 🎯",
        description: "We'll notify you when jobs match your criteria.",
      });
      return true;
    } catch (error) {
      console.error('Error saving alert:', error);
      toast({
        title: "Error",
        description: "Failed to save job alert. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Delete alert (mock implementation)
  const deleteAlert = async (alertId: string) => {
    try {
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
      toast({
        title: "Alert deleted",
        description: "Job alert has been removed.",
      });
    } catch (error) {
      console.error('Error deleting alert:', error);
      toast({
        title: "Error",
        description: "Failed to delete alert",
        variant: "destructive",
      });
    }
  };

  // Toggle alert active status (mock implementation)
  const toggleAlert = async (alertId: string, isActive: boolean) => {
    try {
      setAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId 
            ? { ...alert, is_active: isActive }
            : alert
        )
      );

      toast({
        title: isActive ? "Alert activated" : "Alert paused",
        description: isActive 
          ? "You'll receive notifications for this alert" 
          : "Notifications paused for this alert",
      });
    } catch (error) {
      console.error('Error toggling alert:', error);
      toast({
        title: "Error",
        description: "Failed to update alert",
        variant: "destructive",
      });
    }
  };

  // Load alerts when user changes
  useEffect(() => {
    if (user) {
      loadAlerts();
    } else {
      setAlerts([]);
    }
  }, [user]);

  return {
    alerts,
    loading,
    saving,
    saveAlert,
    deleteAlert,
    toggleAlert,
    loadAlerts,
    hasAlerts: alerts.length > 0,
    activeAlertsCount: alerts.filter(alert => alert.is_active).length,
  };
}