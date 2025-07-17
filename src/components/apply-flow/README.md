# Apply Flow - Portable Job Application System

A complete, exportable 5-step job application flow for React projects with Supabase backend.

## 🚀 Features

- **5-Step Application Process**: Personal Info → Skills → Resume → Referral → Review → Success
- **Auto-Save Progress**: Uses localStorage to persist form data between sessions
- **Resume Upload**: Direct integration with Supabase Storage
- **Job Context Loading**: Automatically loads job details from URL parameters
- **Mobile Responsive**: Works perfectly on all device sizes
- **TypeScript Support**: Fully typed for better developer experience
- **Success Celebration**: Confetti animation and user-friendly success page
- **Error Handling**: Graceful fallbacks for missing jobs or network issues

## 📋 Required Supabase Setup

### 1. Database Tables

**Applications Table:**
```sql
CREATE TABLE public.applications (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  phone text,
  email text,
  location text,
  skills text,
  availability text,
  resume_url text,
  referral_code text,
  ref_code text,
  job_id uuid,
  utm_ref text,
  source text,
  submitted_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS (optional - for public applications)
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (or customize based on your auth model)
CREATE POLICY "Anyone can submit applications" 
ON public.applications 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view applications" 
ON public.applications 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can update applications" 
ON public.applications 
FOR UPDATE 
USING (true);
```

**Jobs Table:**
```sql
CREATE TABLE public.jobs (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  description text NOT NULL,
  pay_range text,
  job_type text,
  requirements text,
  benefits text,
  is_verified boolean DEFAULT false,
  posted_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Allow public reads
CREATE POLICY "Anyone can view jobs" 
ON public.jobs 
FOR SELECT 
USING (true);
```

### 2. Storage Bucket

**Resume Storage:**
```sql
-- Create resumes bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false);

-- Storage policies for resume uploads
CREATE POLICY "Users can view their own resumes" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'resumes');

CREATE POLICY "Users can upload resumes" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'resumes');

CREATE POLICY "Users can update their resumes" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'resumes');
```

### 3. Edge Functions

**Submit Application Function:**
The flow requires a `submit-application` edge function. See `supabase/functions/submit-application/index.ts` in your project.

**Save Application Step Function (Optional):**
For auto-saving progress, implement `save-application-step` edge function.

## 🔧 Installation & Setup

### 1. Copy Apply Flow

Copy the entire `/components/apply-flow/` folder to your project:

```bash
cp -r /path/to/apply-flow ./src/components/
```

### 2. Install Dependencies

The apply flow requires these dependencies:
```json
{
  "@supabase/supabase-js": "^2.51.0",
  "@radix-ui/react-dialog": "^1.1.2",
  "@radix-ui/react-select": "^2.1.1",
  "@radix-ui/react-toast": "^1.2.1",
  "react-confetti": "^6.4.0",
  "react-router-dom": "^6.26.2",
  "lucide-react": "^0.462.0"
}
```

### 3. Add Route to Your App

```tsx
// App.tsx or your main router file
import { ApplyFlowRouter } from '@/components/apply-flow';

function App() {
  return (
    <Router>
      <Routes>
        {/* Your existing routes */}
        <Route path="/apply/:jobId/*" element={<ApplyFlowRouter />} />
      </Routes>
    </Router>
  );
}
```

### 4. Link to Jobs

```tsx
// In your job listings
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => (
  <div className="job-card">
    <h3>{job.title}</h3>
    <p>{job.company}</p>
    <Link to={`/apply/${job.id}`}>
      <button>Apply Now</button>
    </Link>
  </div>
);
```

## 🎯 Usage Examples

### Basic Integration
```tsx
import { ApplyFlowRouter } from '@/components/apply-flow';

// Add to your routes
<Route path="/apply/:jobId/*" element={<ApplyFlowRouter />} />
```

### Custom Context Access
```tsx
import { useApplicationForm } from '@/components/apply-flow';

const CustomComponent = () => {
  const { formData, isLoading, submitApplication } = useApplicationForm();
  
  return (
    <div>
      <p>Current step: {formData.step}</p>
      <p>Application for: {formData.jobTitle}</p>
    </div>
  );
};
```

### Job Preloading
```tsx
import { useJobPreloader } from '@/components/apply-flow';

const JobPreview = ({ jobId }) => {
  const { job, isLoading, error } = useJobPreloader(jobId);
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Job not found</div>;
  
  return <div>{job.title} at {job.company}</div>;
};
```

## 🔒 Authentication Models

### Public Applications (No Auth Required)
- Default setup allows anyone to submit applications
- Applications are stored with public RLS policies
- Perfect for job boards and recruiting sites

### Authenticated Applications
- Modify RLS policies to require authentication
- Add user_id column to applications table
- Link applications to authenticated users

```sql
-- Example: Auth-required applications
ALTER TABLE public.applications ADD COLUMN user_id uuid REFERENCES auth.users(id);

-- Update RLS policies
CREATE POLICY "Users can submit their own applications" 
ON public.applications 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);
```

## 🎨 Customization

### Styling
The flow uses Tailwind CSS with semantic tokens. Customize by:
- Modifying the design system in `index.css`
- Updating component styles in individual step files
- Adding your brand colors and fonts

### Form Fields
Add custom fields by:
1. Updating `ApplicationFormData` interface in `context/ApplicationFormContext.tsx`
2. Adding form inputs to relevant step pages
3. Updating the submit functions

### Steps
Modify the flow by:
- Adding/removing steps in the router
- Updating progress indicators
- Customizing step validation in `canAccessStep()`

## 📱 Mobile Optimization

The flow is fully mobile-responsive with:
- Touch-friendly form inputs
- Optimized layouts for small screens
- Swipe-friendly navigation
- Mobile-first design approach

## 🔍 SEO & Performance

- Lazy-loaded components for optimal bundle size
- Server-side compatible (SSR friendly)
- Semantic HTML for accessibility
- Fast form validation and submission

## 🛠️ Troubleshooting

### Common Issues

**"Job not found" errors:**
- Verify job exists in Supabase `jobs` table
- Check job ID format (should be UUID)
- Ensure RLS policies allow reading jobs

**Resume upload failures:**
- Verify `resumes` bucket exists
- Check storage RLS policies
- Confirm file size limits (5MB default)

**Form submission errors:**
- Check edge function deployment
- Verify Supabase connection
- Review application table schema

**TypeScript errors:**
- Ensure all dependencies are installed
- Check import paths are correct
- Verify Supabase types are generated

### Debug Mode
Enable debug logging by adding:
```tsx
console.log('Apply Flow Debug:', formData);
```

## 📄 License

This apply flow system is designed to be portable and reusable. Feel free to modify and adapt for your specific needs.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review Supabase setup requirements
3. Verify all dependencies are correctly installed
4. Test with sample job data

---

**Ready to use in 5 minutes!** 🚀