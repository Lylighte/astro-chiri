/**
 * Resume Update Script
 *
 * Usage:
 *   pnpm exec tsx scripts/update-resume.ts          # Interactive mode (default)
 *   pnpm exec tsx scripts/update-resume.ts info      # Show current resume info
 *   pnpm exec tsx scripts/update-resume.ts validate  # Validate resume data
 *
 * Edit src/data/resume.json directly for full control.
 * This script provides quick helpers for common updates.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { createInterface } from 'node:readline/promises'

const RESUME_PATH = resolve(import.meta.dirname, '../src/data/resume.json')

interface ResumeData {
  basics: {
    name: string
    label: string
    email?: string
    website?: string
    summary: string
  }
  education?: Array<{
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    highlights?: string[]
  }>
  skills?: Array<{
    name: string
    keywords: string[]
  }>
  projects?: Array<{
    name: string
    description: string
    url?: string
    highlights?: string[]
    keywords?: string[]
  }>
  interests?: Array<{
    name: string
    keywords?: string[]
  }>
  [key: string]: unknown
}

function loadResume(): ResumeData {
  return JSON.parse(readFileSync(RESUME_PATH, 'utf-8'))
}

function saveResume(data: ResumeData): void {
  writeFileSync(RESUME_PATH, JSON.stringify(data, null, 2) + '\n', 'utf-8')
  console.log('✅ Resume saved to src/data/resume.json')
}

function showInfo(data: ResumeData): void {
  console.log(`\n📋 Resume: ${data.basics.name}`)
  console.log(`   Label:    ${data.basics.label}`)
  console.log(`   Email:    ${data.basics.email || '(not set)'}`)
  console.log(`   Website:  ${data.basics.website || '(not set)'}`)
  console.log(`   Summary:  ${data.basics.summary.slice(0, 60)}...`)

  if (data.education?.length) {
    console.log(`\n🎓 Education (${data.education.length}):`)
    for (const edu of data.education) {
      console.log(`   - ${edu.degree} @ ${edu.institution}`)
    }
  }

  if (data.skills?.length) {
    console.log(`\n🔧 Skills (${data.skills.length} categories):`)
    for (const sk of data.skills) {
      console.log(`   - ${sk.name}: ${sk.keywords.join(', ')}`)
    }
  }

  if (data.projects?.length) {
    console.log(`\n🚀 Projects (${data.projects.length}):`)
    for (const proj of data.projects) {
      console.log(`   - ${proj.name}`)
    }
  }

  if (data.interests?.length) {
    console.log(`\n💡 Interests (${data.interests.length}):`)
    for (const int of data.interests) {
      console.log(`   - ${int.name}: ${int.keywords?.join(', ') || ''}`)
    }
  }
}

function validate(data: ResumeData): boolean {
  const errors: string[] = []

  if (!data.basics?.name) errors.push('basics.name is required')
  if (!data.basics?.label) errors.push('basics.label is required')
  if (!data.basics?.summary) errors.push('basics.summary is required')

  if (data.education) {
    for (let i = 0; i < data.education.length; i++) {
      const edu = data.education[i]
      if (!edu.institution) errors.push(`education[${i}].institution is required`)
      if (!edu.degree) errors.push(`education[${i}].degree is required`)
      if (!edu.field) errors.push(`education[${i}].field is required`)
    }
  }

  if (data.skills) {
    for (let i = 0; i < data.skills.length; i++) {
      if (!data.skills[i].name) errors.push(`skills[${i}].name is required`)
      if (!data.skills[i].keywords?.length) errors.push(`skills[${i}].keywords is required`)
    }
  }

  if (errors.length === 0) {
    console.log('✅ Resume data is valid!')
    return true
  }

  console.log('❌ Validation errors:')
  for (const err of errors) {
    console.log(`   - ${err}`)
  }
  return false
}

async function interactiveMode(): Promise<void> {
  const rl = createInterface({ input: process.stdin, output: process.stdout })
  const data = loadResume()

  console.log('\n📝 Resume Update Helper')
  console.log('   Edit src/data/resume.json directly for full control.\n')

  console.log('Choose an action:')
  console.log('  1) Update summary')
  console.log('  2) Add/update a project')
  console.log('  3) Add a skill')
  console.log('  4) Show current resume info')
  console.log('  5) Validate resume data')
  console.log('  0) Exit')

  const choice = await rl.question('\n> ')

  switch (choice.trim()) {
    case '1': {
      const summary = await rl.question('New summary: ')
      data.basics.summary = summary
      saveResume(data)
      break
    }
    case '2': {
      const name = await rl.question('Project name: ')
      const desc = await rl.question('Project description: ')
      const url = await rl.question('Project URL (optional): ')
      if (!data.projects) data.projects = []
      data.projects.push({
        name,
        description: desc,
        ...(url ? { url } : {}),
        highlights: [],
        keywords: []
      })
      saveResume(data)
      break
    }
    case '3': {
      const category = await rl.question('Skill category (e.g. "Languages"): ')
      const keywords = await rl.question('Skills (comma-separated): ')
      if (!data.skills) data.skills = []
      data.skills.push({
        name: category,
        keywords: keywords.split(',').map((s) => s.trim())
      })
      saveResume(data)
      break
    }
    case '4':
      showInfo(data)
      break
    case '5':
      validate(data)
      break
    default:
      console.log('Bye!')
  }

  rl.close()
}

// ── Main ──
const arg = process.argv[2]

if (arg === 'info') {
  showInfo(loadResume())
} else if (arg === 'validate') {
  validate(loadResume())
} else {
  interactiveMode()
}
