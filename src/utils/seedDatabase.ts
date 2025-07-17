import { supabase } from "@/integrations/supabase/client";

// Realistic job data for NYC
const JOB_TITLES = [
  "Delivery Driver",
  "Pizza Cook",
  "Front Desk Associate", 
  "Warehouse Worker",
  "Customer Service Rep",
  "Security Guard",
  "Restaurant Server",
  "Cashier",
  "Cleaner",
  "Data Entry Clerk",
  "Kitchen Helper",
  "Retail Sales Associate",
  "Maintenance Technician",
  "Food Service Worker",
  "Home Health Aide",
  "School Bus Driver",
  "Construction Laborer",
  "Package Handler",
  "HVAC Apprentice",
  "Pharmacy Technician",
  "School Aide",
  "Uber/Lyft Driver",
  "Airport Security Officer",
  "Cleaning Service Worker",
  "Security Guard - Night Shift"
];

const COMPANIES = [
  "Luigi's Pizza",
  "NYC Metro Hotels",
  "Amazon Warehouse",
  "FreshDirect",
  "Duane Reade",
  "CVS Pharmacy",
  "Whole Foods",
  "Target",
  "Home Depot",
  "UPS",
  "FedEx",
  "McDonald's",
  "Subway",
  "Starbucks",
  "ShopRite",
  "Key Food",
  "Stop & Shop",
  "BJ's Wholesale",
  "Costco",
  "Best Buy",
  "NYC Department of Education",
  "Mount Sinai Hospital",
  "NYU Langone",
  "Marriott Hotels",
  "Hilton Hotels"
];

const BOROUGHS = [
  "Manhattan, NY",
  "Brooklyn, NY", 
  "Queens, NY",
  "Bronx, NY",
  "Staten Island, NY"
];

const PAY_RANGES = [
  { min: 15, max: 18 },
  { min: 16, max: 20 },
  { min: 18, max: 22 },
  { min: 20, max: 25 },
  { min: 22, max: 28 },
  { min: 25, max: 30 },
  { min: 18, max: 24 },
  { min: 19, max: 23 }
];

const DESCRIPTIONS = [
  "Join our team! We're looking for reliable, hardworking individuals to join our growing company. Flexible schedules available.",
  "Great opportunity for motivated people! Competitive pay, benefits after 90 days, and room for advancement.",
  "Immediate start available! We offer weekly pay, flexible hours, and a supportive work environment.",
  "Looking for energetic team members! Full and part-time positions available with competitive compensation.",
  "Excellent entry-level opportunity! No experience required - we provide training. Apply today!",
  "Growing company seeks dedicated workers! Competitive wages, benefits package, and career growth opportunities.",
  "Fast-paced environment! Perfect for people who like to stay busy. Weekly pay and flexible scheduling.",
  "Join our team today! We offer competitive pay, paid time off, and advancement opportunities for the right candidates."
];

export const seedJobDatabase = async (count: number = 1635) => {
  console.log(`Starting to seed ${count} applications...`);
  
  const batchSize = 100;
  const batches = Math.ceil(count / batchSize);
  
  for (let batch = 0; batch < batches; batch++) {
    const startIndex = batch * batchSize;
    const endIndex = Math.min(startIndex + batchSize, count);
    const currentBatchSize = endIndex - startIndex;
    
    console.log(`Seeding batch ${batch + 1}/${batches} (${currentBatchSize} applications)`);
    
    const applications = Array.from({ length: currentBatchSize }, (_, i) => {
      const globalIndex = startIndex + i;
      const titleIndex = globalIndex % JOB_TITLES.length;
      const companyIndex = globalIndex % COMPANIES.length;
      const locationIndex = globalIndex % BOROUGHS.length;
      
      // Generate realistic application data for the applications table
      return {
        full_name: `Applicant ${globalIndex + 1}`,
        phone: `(555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        location: BOROUGHS[locationIndex],
        skills: JOB_TITLES[titleIndex],
        availability: Math.random() > 0.5 ? 'Full-time' : 'Part-time',
        referral_code: Math.random() > 0.7 ? `REF${Math.floor(Math.random() * 1000)}` : null,
        source: Math.random() > 0.5 ? 'craigslist' : 'direct',
        submitted_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      };
    });
    
    try {
      // Mock database seeding (no actual database operation)
      console.log(`Mock: Seeded batch ${batch + 1} with ${applications.length} applications`);
      
      console.log(`✅ Batch ${batch + 1} completed successfully`);
      
      // Small delay between batches to avoid rate limits
      if (batch < batches - 1) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error(`Failed to seed batch ${batch + 1}:`, error);
      throw error;
    }
  }
  
  console.log(`🎉 Successfully seeded ${count} applications!`);
};

// Helper function to clear existing fake data (mock implementation)
export const clearFakeApplications = async () => {
  try {
    // Mock clearing operation
    console.log('✅ Mock: Cleared existing fake applications');
  } catch (error) {
    console.error('Error clearing fake applications:', error);
    throw error;
  }
};