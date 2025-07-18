import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Database, Bug, PlayCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const DebugBanner = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [applicationCount, setApplicationCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchApplicationCount();
  }, []);

  const fetchApplicationCount = async () => {
    try {
      setIsLoading(true);
      const { count, error } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error('Error fetching application count:', error);
        setApplicationCount(0);
      } else {
        setApplicationCount(count || 0);
      }
    } catch (error) {
      console.error('Error in fetchApplicationCount:', error);
      setApplicationCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 w-80">
      <Card className="bg-card/95 backdrop-blur border-border/50 shadow-xl">
        <CardHeader 
          className="cursor-pointer pb-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bug className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm">Debug Info</CardTitle>
              <Badge variant="secondary" className="text-xs">
                {process.env.NODE_ENV}
              </Badge>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        </CardHeader>
        
        {isExpanded && (
          <CardContent className="pt-0 space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Database className="h-4 w-4 text-green-500" />
              <span className="text-muted-foreground">Applications:</span>
              <Badge variant="outline" className="text-xs">
                {isLoading ? '...' : applicationCount}
              </Badge>
            </div>
            
            <Link to="/apply/43c97bb7-dcf0-4302-a445-805091309dd6" className="block">
              <Button 
                variant="default" 
                size="sm" 
                className="w-full text-xs bg-foreground text-background hover:bg-foreground/90"
              >
                <PlayCircle className="h-3 w-3 mr-1" />
                🚧 Test Application Flow
              </Button>
            </Link>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchApplicationCount}
              className="w-full text-xs"
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh Count'}
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default DebugBanner;