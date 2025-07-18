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
import CraigslistPostGenerator from "./pages/CraigslistPostGenerator";
import CraigslistAutoPage from "./pages/CraigslistAutoPage";
import AlertsPage from "./pages/AlertsPage";
import AlertsOptInPage from "./pages/AlertsOptInPage";
import AdminJobsPage from "./pages/AdminJobsPage";
import SettingsPage from "./pages/SettingsPage";
import AdminDashboard from "./pages/AdminDashboard";
import GenerateFakeJobsPage from "./pages/GenerateFakeJobsPage";
import ReferralsDashboard from "./pages/ReferralsDashboard";
import RepostEngine from "./pages/RepostEngine";
import PostTracker from "./pages/PostTracker";
import ApplyFlowRouter from "./components/apply-flow/ApplyFlowRouter";
import NotFound from "./pages/NotFound";
import DebugBanner from "./components/DebugBanner";
import ErrorBoundary from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <DebugBanner />
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/search-jobs" element={<SearchJobsPage />} />
              <Route path="/apply/:job_id/*" element={<ApplyFlowRouter />} />
              <Route path="/apply" element={<ApplyFallback />} />
              <Route path="/apply/*" element={<ApplyFlowRouter />} />
              <Route path="/post-job" element={<PostJobPage />} />
              <Route path="/craigslist-generator" element={<CraigslistPostGenerator />} />
              <Route path="/craigslist-auto" element={<CraigslistAutoPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/alerts-optin" element={<AlertsOptInPage />} />
              <Route path="/admin/jobs" element={<AdminJobsPage />} />
              <Route path="/generate-fake-jobs" element={<GenerateFakeJobsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/referrals-dashboard" element={<ReferralsDashboard />} />
          <Route path="/repost-engine" element={<RepostEngine />} />
          <Route path="/post-job" element={<PostJobPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
