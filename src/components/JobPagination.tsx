import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JobPaginationProps {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  loading?: boolean;
}

export function JobPagination({ 
  currentPage, 
  totalPages, 
  onNextPage, 
  onPreviousPage, 
  loading = false 
}: JobPaginationProps) {
  return (
    <div className="sticky bottom-4 bg-background/95 backdrop-blur-sm border border-border rounded-xl p-4 mx-4 shadow-lg z-10">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={onPreviousPage}
          disabled={loading}
          className="flex items-center gap-2 hover:bg-primary/10 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Page <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
            <span className="font-semibold text-foreground">{totalPages}</span>
          </span>
        </div>
        
        <Button
          variant="default"
          onClick={onNextPage}
          disabled={loading}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground animate-pulse hover:animate-none transition-all"
        >
          Next Page
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      {loading && (
        <div className="mt-2 flex items-center justify-center">
          <div className="h-1 bg-primary/20 rounded-full overflow-hidden w-full">
            <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
        </div>
      )}
    </div>
  );
}