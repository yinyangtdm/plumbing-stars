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
  const leads = await db`SELECT * FROM bookings ORDER BY created_at DESC`
  return NextResponse.json(leads)
}

export async function PUT(request: Request) {
  const unauth = await requireAuth()
  if (unauth) return unauth
  const { id, status, notes } = await request.json()
  if (!id) return NextResponse.json({ error: 'ID required.' }, { status: 400 })
  await initDb()
  const db = getDb()
  const [lead] = await db`UPDATE bookings SET status = ${status}, notes = ${notes ?? ''} WHERE id = ${id} RETURNING *`
  return NextResponse.json(lead)
}
