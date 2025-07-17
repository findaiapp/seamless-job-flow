import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MapPin, DollarSign, Flame } from 'lucide-react';

interface JobsYoullLoveProps {
  onJobClick: (jobId: string) => void;
}

export function JobsYoullLove({ onJobClick }: JobsYoullLoveProps) {
  // Mock data for demonstration
  const mockJobs = [
    {
      id: '1',
      title: 'Delivery Driver',
      company: 'QuickDelivery Inc',
      location: 'Brooklyn, NY',
      pay_range: '$18-22/hr',
      matchScore: 95,
      is_hot: true,
    },
    {
      id: '2',
      title: 'Warehouse Associate',
      company: 'StorageCorp',
      location: 'Queens, NY',
      pay_range: '$16-20/hr',
      matchScore: 88,
      is_hot: false,
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">🔥 Matched for You</h2>
          </div>
          <p className="text-sm text-muted-foreground">Based on your preferences</p>
        </div>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {mockJobs.map((job) => (
          <Card 
            key={job.id} 
            className="min-w-[280px] cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-primary"
            onClick={() => onJobClick(job.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                  {job.matchScore}% Match
                </Badge>
                {job.is_hot && (
                  <Badge variant="destructive" className="text-xs">
                    🔥 Hot
                  </Badge>
                )}
              </div>
              
              <h3 className="font-medium text-sm mb-1 line-clamp-1">{job.title}</h3>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{job.company}</p>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <DollarSign className="h-3 w-3" />
                  <span>{job.pay_range}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <Badge variant="outline" className="text-xs px-1 py-0">
                  Perfect Match
                </Badge>
                <Heart className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors cursor-pointer" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}