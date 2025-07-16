import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SearchJobsPage from "./pages/SearchJobsPage";
import ApplyPage from "./pages/ApplyPage";
import ApplyFallback from "./pages/ApplyFallback";
import PostJobPage from "./pages/PostJobPage";
import ThankYouPage from "./pages/ThankYouPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/search-jobs" element={<SearchJobsPage />} />
          <Route path="/apply/:job_id" element={<ApplyPage />} />
          <Route path="/apply" element={<ApplyFallback />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
