import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const locations = [
  'Brooklyn, NY', 'Bronx, NY', 'Queens, NY', 'Staten Island, NY', 'Manhattan, NY',
  'Newark, NJ', 'Jersey City, NJ', 'Philadelphia, PA', 'Boston, MA', 'Miami, FL'
]

const companies = [
  'NextWave Staffing', 'FastDrop Inc', 'QuickHire Solutions', 'Metro Workforce',
  'CityJobs LLC', 'RapidStaff Co', 'Urban Talent Group', 'FlexWork Partners',
  'ProStaff NYC', 'Elite Temp Agency', 'WorkForce Plus', 'TalentBridge Co'
]

const jobCategories = [
  {
    category: 'childcare',
    titles: ['Nanny', 'Babysitter', 'Preschool Teacher', 'Child Care Assistant'],
    descriptions: [
      'Caring for children ages 2-8. Must be reliable and have experience.',
      'Looking for responsible babysitter for evening hours. References required.',
      'Preschool teacher needed ASAP. Early childhood education preferred.',
      'Part-time child care assistant. Flexible schedule, great pay.'
    ]
  },
  {
    category: 'delivery',
    titles: ['Delivery Driver', 'DoorDash Driver', 'UberEats Driver', 'Amazon Flex Driver'],
    descriptions: [
      'Deliver food around the city. Make $20+/hr with tips. Start tomorrow!',
      'Amazon Flex driver needed. Use your own car. Flexible hours, good pay.',
      'DoorDash driver - earn $18-25/hr including tips. Sign up today!',
      'Food delivery driver. No experience needed. Bike or car required.'
    ]
  },
  {
    category: 'warehouse',
    titles: ['Warehouse Worker', 'Package Handler', 'Inventory Associate', 'Picker/Packer'],
    descriptions: [
      'Warehouse work - picking, packing, loading. $17/hr to start.',
      'Package handler needed immediately. Physical work but good benefits.',
      'Inventory associate for busy warehouse. Day and night shifts available.',
      'Picker/packer position. Fast-paced environment. Weekly pay!'
    ]
  },
  {
    category: 'cleaning',
    titles: ['Housekeeper', 'Janitor', 'Deep Cleaner', 'Office Cleaner'],
    descriptions: [
      'Housekeeper for residential cleaning. Reliable transportation needed.',
      'Janitor for office building. Evening shift. Competitive pay.',
      'Deep cleaning specialist. Experience preferred but will train.',
      'Office cleaner needed. Part-time, flexible hours. Good pay rate.'
    ]
  },
  {
    category: 'restaurant',
    titles: ['Cook', 'Server', 'Dishwasher', 'Kitchen Helper'],
    descriptions: [
      'Line cook needed for busy restaurant. Experience required.',
      'Server position available. Good tips, flexible schedule.',
      'Dishwasher needed ASAP. No experience necessary. Will train.',
      'Kitchen helper wanted. Food prep and cleaning. Start immediately.'
    ]
  },
  {
    category: 'retail',
    titles: ['Cashier', 'Store Associate', 'Stock Clerk', 'Sales Associate'],
    descriptions: [
      'Cashier position at local store. Customer service experience preferred.',
      'Store associate needed. Stocking, customer service, cleaning.',
      'Stock clerk for retail store. Early morning shifts available.',
      'Sales associate wanted. Commission opportunities available.'
    ]
  },
  {
    category: 'construction',
    titles: ['Construction Laborer', 'Helper', 'Apprentice', 'Site Worker'],
    descriptions: [
      'Construction laborer needed. Hard work but good pay. $20+/hr.',
      'Construction helper wanted. No experience needed. Will train.',
      'Apprentice position available. Learn while you earn!',
      'Site worker needed for construction project. Safety training provided.'
    ]
  },
  {
    category: 'driving',
    titles: ['Driver Helper', 'Box Truck Driver', 'CDL-B Driver', 'Delivery Associate'],
    descriptions: [
      'Driver helper needed for delivery route. Physical work required.',
      'Box truck driver with clean driving record. Local deliveries.',
      'CDL-B driver wanted. Competitive pay and benefits.',
      'Delivery associate for package delivery. Must lift 50+ lbs.'
    ]
  },
  {
    category: 'customer_service',
    titles: ['Customer Service Rep', 'Call Center Rep', 'Receptionist', 'CSR'],
    descriptions: [
      'Customer service rep for call center. Bilingual preferred.',
      'Call center representative. Full-time position with benefits.',
      'Receptionist needed for busy office. Professional appearance required.',
      'CSR position available. Data entry and phone skills needed.'
    ]
  },
  {
    category: 'admin',
    titles: ['Office Assistant', 'Data Entry Clerk', 'Administrative Assistant', 'File Clerk'],
    descriptions: [
      'Office assistant needed. Basic computer skills required.',
      'Data entry clerk for temporary assignment. Attention to detail important.',
      'Administrative assistant wanted. Multi-tasking skills essential.',
      'File clerk position available. Organizing and filing documents.'
    ]
  }
]

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)]
}

function getRandomPay(): { min: number, max: number, range: string } {
  const min = Math.floor(Math.random() * 8) + 15 // $15-22
  const max = min + Math.floor(Math.random() * 8) + 3 // $3-10 above min
  return {
    min,
    max,
    range: `$${min}-${max}/hr`
  }
}

function getRandomDate(): string {
  const now = new Date()
  const daysAgo = Math.floor(Math.random() * 14) // 0-14 days ago
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
  return date.toISOString()
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { count = 1500 } = await req.json()
    
    console.log(`Generating ${count} fake jobs...`)

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const jobs = []
    
    for (let i = 0; i < count; i++) {
      const category = getRandomItem(jobCategories)
      const location = getRandomItem(locations)
      const company = getRandomItem(companies)
      const title = getRandomItem(category.titles)
      const description = getRandomItem(category.descriptions)
      const pay = getRandomPay()
      const isVerified = Math.random() < 0.5 // 50% verified
      const createdAt = getRandomDate()

      jobs.push({
        title,
        company,
        location,
        pay_range: pay.range,
        description,
        job_type: category.category,
        employer_name: company,
        is_approved: true,
        is_verified: isVerified,
        status: 'active',
        created_at: createdAt,
        posted_at: createdAt
      })
    }

    console.log(`Inserting ${jobs.length} jobs into database...`)
    
    // Insert jobs in batches of 100 to avoid timeout
    const batchSize = 100
    let totalInserted = 0
    
    for (let i = 0; i < jobs.length; i += batchSize) {
      const batch = jobs.slice(i, i + batchSize)
      const { data, error } = await supabase
        .from('jobs')
        .insert(batch)
        .select('id')
      
      if (error) {
        console.error(`Error inserting batch ${i / batchSize + 1}:`, error)
        throw error
      }
      
      totalInserted += batch.length
      console.log(`Inserted batch ${i / batchSize + 1}/${Math.ceil(jobs.length / batchSize)} (${totalInserted}/${jobs.length} total)`)
    }

    console.log(`Successfully generated and inserted ${totalInserted} fake jobs!`)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully generated ${totalInserted} fake jobs`,
        totalJobs: totalInserted
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error generating fake jobs:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})