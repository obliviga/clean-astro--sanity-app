import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './src/schemaTypes'
import {presentationTool} from 'sanity/presentation'

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// Determine preview URL based on environment
const isProd = process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production'
const defaultProdPreview = 'https://astro-sanity-test-l312otkqm-coforma.vercel.app/'
const defaultDevPreview = 'http://localhost:4321/'
// Allow override via env var SANITY_STUDIO_PREVIEW_URL
const previewUrl = isProd
  ? process.env.SANITY_STUDIO_PREVIEW_URL || defaultProdPreview
  : process.env.SANITY_STUDIO_PREVIEW_URL || defaultDevPreview

export default defineConfig({
  name: 'sanity-template-astro-clean',
  title: 'Sanity Astro Starter',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
})
