import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const seedFolder = path.join(__dirname)

const seedFiles = fs
  .readdirSync(seedFolder)
  .filter((file) => file.endsWith('.js') && file !== 'runSeeds.js')

;(async () => {
  for (const file of seedFiles) {
    console.log(`🌱 Running seed: ${file}`)
    const modulePath = path.join(seedFolder, file)
    const seedModule = await import(modulePath)

    if (seedModule.default) {
      await seedModule.default()
    } else if (seedModule.runSeed) {
      await seedModule.runSeed()
    } else {
      console.warn(`⚠️ No export found in ${file}`)
    }
  }
  console.log('✅ All seeds completed successfully')
})()
