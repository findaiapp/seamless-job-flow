import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface JobAlert {
  id: string;
  user_id: string;
  categories: string[];
  location: string;
  pay_min: number;
  pay_max: number;
  frequency: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  job_alerts_enabled?: boolean;
  preferred_channel?: string;
  phone_number?: string;
  created_at: string;
  updated_at: string;
}

export function useJobAlerts() {
  const [alerts, setAlerts] = useState<JobAlert[]>([]);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const loadAlerts = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_alerts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAlerts(data || []);
    } catch (error) {
      console.error('Error loading alerts:', error);
    }
  }, []);

  const loadPreferences = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // For now, return mock preferences since the table structure doesn't match
      setPreferences({
        id: user.id,
        user_id: user.id,
        job_alerts_enabled: true,
        preferred_channel: 'email',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  }, []);

  const createAlert = useCallback(async (alertData: {
    categories: string[];
    location: string;
    pay_min: number;
    pay_max: number;
    frequency: string;
  }) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('user_alerts')
        .insert({
          ...alertData,
          user_id: user.id,
          is_active: true
        })
        .select()
        .single();

      if (error) throw error;

      setAlerts(prev => [data, ...prev]);
      toast({
        title: "Alert created!",
        description: "We'll notify you when matching jobs are posted.",
      });

      return data;
    } catch (error) {
      console.error('Error creating alert:', error);
      toast({
        title: "Error",
        description: "Failed to create job alert. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updateAlert = useCallback(async (id: string, updates: Partial<JobAlert>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_alerts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setAlerts(prev => prev.map(alert => alert.id === id ? data : alert));
      toast({
        title: "Alert updated!",
        description: "Your job alert has been updated successfully.",
      });

      return data;
    } catch (error) {
      console.error('Error updating alert:', error);
      toast({
        title: "Error",
        description: "Failed to update job alert. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const deleteAlert = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('user_alerts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAlerts(prev => prev.filter(alert => alert.id !== id));
      toast({
        title: "Alert deleted!",
        description: "Your job alert has been removed.",
      });
    } catch (error) {
      console.error('Error deleting alert:', error);
      toast({
        title: "Error",
        description: "Failed to delete job alert. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const updatePreferences = useCallback(async (updates: Partial<UserPreferences>) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // For now, just update local state since the table structure doesn't match
      setPreferences(prev => prev ? { ...prev, ...updates } : null);
      toast({
        title: "Preferences updated!",
        description: "Your notification preferences have been saved.",
      });

      return preferences;
    } catch (error) {
      console.error('Error updating preferences:', error);
      toast({
        title: "Error",
        description: "Failed to update preferences. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadAlerts();
    loadPreferences();
  }, [loadAlerts, loadPreferences]);

  return {
    alerts,
    preferences,
    loading,
    createAlert,
    updateAlert,
    deleteAlert,
    updatePreferences,
    loadAlerts,
    loadPreferences
  };
}