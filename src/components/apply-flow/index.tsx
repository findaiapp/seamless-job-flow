// Apply Flow - Portable 5-Step Job Application System
// 
// This is a complete, exportable job application flow that can be integrated
// into any React project with minimal setup. It includes:
//
// ✅ 5-step application process (Personal Info → Skills → Resume → Referral → Review)
// ✅ Auto-saving and progress persistence via localStorage
// ✅ Supabase integration for data storage
// ✅ Resume upload to Supabase Storage
// ✅ Success page with confetti celebration
// ✅ Job context auto-loading from URL params
// ✅ Mobile-responsive design
// ✅ TypeScript support
//
// Usage:
// 1. Import: import { ApplyFlowRouter } from '@/components/apply-flow'
// 2. Add route: <Route path="/apply/:jobId/*" element={<ApplyFlowRouter />} />
// 3. Link to jobs: <Link to={`/apply/${jobId}`}>Apply Now</Link>
//
// Requirements:
// - Supabase project with 'applications', 'jobs' tables
// - Supabase 'resumes' storage bucket
// - See README.md for complete setup instructions

export { default as ApplyFlowRouter } from './ApplyFlowRouter';
export { ApplicationFormProvider, useApplicationForm } from './context/ApplicationFormContext';
export { useJobPreloader } from './hooks/useJobPreloader';

// Individual page exports (optional, for custom routing)
export { default as StepOne } from './pages/StepOne';
export { default as StepTwo } from './pages/StepTwo';
export { default as StepThree } from './pages/StepThree';
export { default as StepFour } from './pages/StepFour';
export { default as StepFive } from './pages/StepFive';
export { default as SuccessPage } from './pages/SuccessPage';
export { default as JobNotFound } from './pages/JobNotFound';

// Default export for easy integration
export { default } from './ApplyFlowRouter';