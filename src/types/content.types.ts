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
  skills?: string[]
}

export interface ResumeExperience {
  title: string
  organization: string
  startDate: string
  endDate: string
  highlights?: string[]
}

export interface ResumeActivity {
  role: string
  organization: string
  startDate: string
  endDate: string
  highlights?: string[]
}

export interface ResumeCertificate {
  name: string
  issuer?: string
  date: string
  url?: string
}

export interface ResumePublication {
  title: string
  authors?: string
  venue: string
  year: string
  url?: string
}

export interface ResumeInterest {
  name: string
  keywords?: string[]
}

export interface ResumeLink {
  label: string
  url: string
}

export interface ResumeData {
  basics: ResumeBasics
  experience?: ResumeExperience[]
  activity?: ResumeActivity[]
  certificates?: ResumeCertificate[]
  publications?: ResumePublication[]
  interests?: ResumeInterest[]
  links?: ResumeLink[]
}
