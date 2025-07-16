import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DebugBannerProps {
  isDev?: boolean;
}

const DebugBanner = ({ isDev = process.env.NODE_ENV === 'development' }: DebugBannerProps) => {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<{
    supabase: boolean;
    routing: boolean;
    errors: string[];
  }>({
    supabase: false,
    routing: true,
    errors: []
  });

  useEffect(() => {
    if (!isDev) return;
    
    const checkSystemHealth = async () => {
      const errors: string[] = [];
      let supabaseOk = false;
      
      try {
        // Test Supabase connection
        const { data, error } = await supabase
          .from('user_posted_jobs')
          .select('id')
          .limit(1);
        
        if (error) {
          errors.push(`Supabase: ${error.message}`);
        } else {
          supabaseOk = true;
        }
      } catch (error) {
        errors.push(`Supabase: Connection failed`);
      }
      
      // Check for common routing issues
      if (window.location.pathname === '/' && !window.location.hash) {
        // This is fine - index redirects
      }
      
      setStatus({
        supabase: supabaseOk,
        routing: true,
        errors
      });
      
      // Show banner if there are issues
      if (errors.length > 0) {
        setShow(true);
      }
    };
    
    checkSystemHealth();
  }, [isDev]);

  if (!isDev || !show) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-yellow-100 border-b border-yellow-300 p-2 text-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <span className="font-medium text-yellow-800">Dev Debug:</span>
          
          <div className="flex items-center gap-1">
            {status.supabase ? (
              <CheckCircle className="h-3 w-3 text-green-600" />
            ) : (
              <AlertTriangle className="h-3 w-3 text-red-600" />
            )}
            <span className={status.supabase ? "text-green-700" : "text-red-700"}>
              Supabase
            </span>
          </div>
          
          <div className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-600" />
            <span className="text-green-700">Routing</span>
          </div>
          
          {status.errors.length > 0 && (
            <div className="text-red-700 font-mono text-xs">
              {status.errors.join('; ')}
            </div>
          )}
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShow(false)}
          className="h-6 w-6 p-0 text-yellow-700 hover:text-yellow-900"
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default DebugBanner;