import pkg from '@supabase/supabase-js'
const { createClient } = pkg
import { faker } from '@faker-js/faker'

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

export async function runSeed(numberOfEntries = 20) {
  const { data: projects, error: projectError } = await supabase.from('projects').select('id')

  if (projectError) {
    console.error('❌ Failed to fetch projects:', projectError)
    process.exit(1)
  }

  const projectIds = projects.map((p) => p.id)

  const tasks = Array.from({ length: numberOfEntries }).map(() => ({
    name: faker.hacker.phrase(),
    status: faker.helpers.arrayElement(['in-progress', 'completed']),
    description: faker.lorem.paragraph(),
    due_date: faker.date.future().toISOString().split('T')[0],
    project_id: faker.helpers.arrayElement([...projectIds, null]),
    collaborators: Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() =>
      faker.internet.email().toLowerCase(),
    ),
  }))

  const { error } = await supabase.from('tasks').insert(tasks)
  if (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }

  console.log('✅ Seed completed successfully')
}
