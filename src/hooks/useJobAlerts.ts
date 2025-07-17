import { useState, useCallback } from 'react';

export interface JobAlert {
  id: string;
  user_id: string;
  categories: string[];
  pay_min: number;
  pay_max: number;
  location: string;
  is_active: boolean;
  created_at: string;
}

interface UseJobAlertsReturn {
  alerts: JobAlert[];
  loading: boolean;
  createAlert: (alertData: Omit<JobAlert, 'id' | 'user_id' | 'created_at'>) => Promise<boolean>;
  updateAlert: (id: string, alertData: Partial<JobAlert>) => Promise<boolean>;
  deleteAlert: (id: string) => Promise<boolean>;
  loadAlerts: () => Promise<void>;
  preferences: {
    job_alerts_enabled: boolean;
    preferred_channel: string;
    phone_number?: string;
  };
  updatePreferences: (updates: any) => void;
}

export function useJobAlerts(): UseJobAlertsReturn {
  const [alerts, setAlerts] = useState<JobAlert[]>([]);
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    job_alerts_enabled: true,
    preferred_channel: "email"
  });

  const loadAlerts = useCallback(async () => {
    try {
      setLoading(true);
      // Mock alerts data
      const mockAlerts: JobAlert[] = [
        {
          id: '1',
          user_id: 'mock-user',
          categories: ['Delivery', 'Warehouse'],
          pay_min: 18,
          pay_max: 25,
          location: 'Brooklyn, NY',
          is_active: true,
          created_at: new Date().toISOString()
        }
      ];
      setAlerts(mockAlerts);
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createAlert = useCallback(async (alertData: Omit<JobAlert, 'id' | 'user_id' | 'created_at'>): Promise<boolean> => {
    try {
      setLoading(true);
      const newAlert: JobAlert = {
        ...alertData,
        id: Date.now().toString(),
        user_id: 'mock-user',
        created_at: new Date().toISOString()
      };
      setAlerts(prev => [...prev, newAlert]);
      return true;
    } catch (error) {
      console.error('Error creating alert:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateAlert = useCallback(async (id: string, alertData: Partial<JobAlert>): Promise<boolean> => {
    try {
      setLoading(true);
      setAlerts(prev => prev.map(alert => 
        alert.id === id ? { ...alert, ...alertData } : alert
      ));
      return true;
    } catch (error) {
      console.error('Error updating alert:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAlert = useCallback(async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setAlerts(prev => prev.filter(alert => alert.id !== id));
      return true;
    } catch (error) {
      console.error('Error deleting alert:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePreferences = useCallback((updates: any) => {
    setPreferences(prev => ({ ...prev, ...updates }));
  }, []);

  return {
    alerts,
    loading,
    createAlert,
    updateAlert,
    deleteAlert,
    loadAlerts,
    preferences,
    updatePreferences
  };
}