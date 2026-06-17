import { neon } from '@neondatabase/serverless'

let sql: ReturnType<typeof neon> | null = null

/**
 * True only when a real database connection string is configured. The repo
 * ships with a placeholder (host.neon.tech); until that's replaced with a real
 * Neon endpoint, the site runs fine in email-only mode (no database).
 */
export function isDbConfigured(): boolean {
  const url = process.env.DATABASE_URL
  return Boolean(url && !url.includes('host.neon.tech'))
}

export function getDb() {
  if (!sql) {
    const url = process.env.DATABASE_URL
    if (!url) throw new Error('DATABASE_URL is not set')
    sql = neon(url)
  }
  return sql
}

export async function initDb() {
  const db = getDb()
  await db`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      address TEXT,
      service TEXT,
      preferred_date TEXT,
      preferred_time TEXT,
      message TEXT,
      status TEXT DEFAULT 'new',
      notes TEXT DEFAULT '',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
  await db`
    CREATE TABLE IF NOT EXISTS faqs (
      id SERIAL PRIMARY KEY,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      display_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}
