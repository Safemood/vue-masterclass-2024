import pkg from '@supabase/supabase-js'
const { createClient } = pkg
import { faker } from '@faker-js/faker'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

export async function runSeed(numberOfEntries = 20) {
  const projects = Array.from({ length: numberOfEntries }).map(() => ({
    name: faker.commerce.productName(),
    slug: faker.helpers.slugify(faker.commerce.productName().toLowerCase()),
    status: faker.helpers.arrayElement(['in-progress', 'completed']),
    collaborators: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() =>
      faker.internet.email().toLowerCase(),
    ),
  }))

  const { error } = await supabase.from('projects').insert(projects)
  if (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }

  console.log('✅ Seed completed successfully')
}
