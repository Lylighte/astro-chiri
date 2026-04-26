import type { CollectionEntry } from 'astro:content'

// Reading time interface
export interface ReadingTime {
  text: string
  minutes: number
  time: number
  words: number
}

// TOC item interface
export interface TOCItem {
  level: number
  text: string
  id: string
  index: number
}

// PostList component props interface
export interface PostListProps {
  posts: CollectionEntry<'posts'>[]
}

// ── Resume Types ──────────────────────────────────────────────
export interface ResumeBasics {
  name: string
  label: string
  email?: string
  website?: string
  summary: string
}

export interface ResumeEducation {
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  highlights?: string[]
}

export interface ResumeSkill {
  name: string
  keywords: string[]
}

export interface ResumeProject {
  name: string
  description: string
  url?: string
  highlights?: string[]
  keywords?: string[]
}

export interface ResumeInterest {
  name: string
  keywords?: string[]
}

export interface ResumeData {
  basics: ResumeBasics
  education?: ResumeEducation[]
  skills?: ResumeSkill[]
  projects?: ResumeProject[]
  interests?: ResumeInterest[]
}
