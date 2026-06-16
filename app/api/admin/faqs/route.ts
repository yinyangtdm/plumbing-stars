import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { getDb, initDb } from '@/lib/db'

async function requireAuth() {
  const session = await auth()
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return null
}

export async function GET() {
  const unauth = await requireAuth()
  if (unauth) return unauth
  await initDb()
  const db = getDb()
  const faqs = await db`SELECT * FROM faqs ORDER BY display_order ASC, id ASC`
  return NextResponse.json(faqs)
}

export async function POST(request: Request) {
  const unauth = await requireAuth()
  if (unauth) return unauth
  const { question, answer, display_order } = await request.json()
  if (!question?.trim() || !answer?.trim()) return NextResponse.json({ error: 'Question and answer required.' }, { status: 400 })
  await initDb()
  const db = getDb()
  const [faq] = await db`INSERT INTO faqs (question, answer, display_order) VALUES (${question.trim()}, ${answer.trim()}, ${display_order ?? 0}) RETURNING *`
  return NextResponse.json(faq, { status: 201 })
}

export async function PUT(request: Request) {
  const unauth = await requireAuth()
  if (unauth) return unauth
  const { id, question, answer, display_order } = await request.json()
  if (!id || !question?.trim() || !answer?.trim()) return NextResponse.json({ error: 'ID, question, and answer required.' }, { status: 400 })
  await initDb()
  const db = getDb()
  const [faq] = await db`UPDATE faqs SET question = ${question.trim()}, answer = ${answer.trim()}, display_order = ${display_order ?? 0} WHERE id = ${id} RETURNING *`
  return NextResponse.json(faq)
}

export async function DELETE(request: Request) {
  const unauth = await requireAuth()
  if (unauth) return unauth
  const { id } = await request.json()
  if (!id) return NextResponse.json({ error: 'ID required.' }, { status: 400 })
  await initDb()
  const db = getDb()
  await db`DELETE FROM faqs WHERE id = ${id}`
  return NextResponse.json({ success: true })
}
