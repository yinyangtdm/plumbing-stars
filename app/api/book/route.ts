import { NextResponse } from 'next/server'
import { getDb, initDb, isDbConfigured } from '@/lib/db'
import { sendLeadEmail, isEmailConfigured } from '@/lib/mailer'

export async function POST(request: Request) {
  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request.' }, { status: 400 })
  }

  const { name, phone, email, address, service, date, time, message } = body

  if (!name?.trim() || !phone?.trim() || !address?.trim() || !service?.trim()) {
    return NextResponse.json({ success: false, error: 'Please fill in all required fields.' }, { status: 400 })
  }

  let savedToDb = false

  // Save to the database when one is configured (Tier 3). Skipped entirely in
  // email-only mode so there's no failed connection attempt on every booking.
  if (isDbConfigured()) {
    try {
      await initDb()
      const db = getDb()
      await db`
        INSERT INTO bookings (name, phone, email, address, service, preferred_date, preferred_time, message)
        VALUES (${name.trim()}, ${phone.trim()}, ${email?.trim() || ''}, ${address.trim()},
                ${service.trim()}, ${date?.trim() || ''}, ${time?.trim() || ''}, ${message?.trim() || ''})
      `
      savedToDb = true
    } catch (err) {
      console.error('[book] DB error:', err)
      // Fall through — still try to email the lead.
    }
  }

  // Email the lead (Tier 2). Works with no database at all.
  let emailed = false
  if (isEmailConfigured()) {
    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#083E85;padding:24px 30px;border-radius:6px 6px 0 0">
          <h2 style="color:#fff;margin:0;font-size:22px">New Booking Request</h2>
          <p style="color:#B4DAFB;margin:6px 0 0;font-size:14px">The Plumbing Stars Website</p>
        </div>
        <div style="background:#fff;padding:30px;border:1px solid #dde4f0;border-top:none;border-radius:0 0 6px 6px">
          <table style="width:100%;border-collapse:collapse">
            ${[
              ['Name', name],
              ['Phone', phone],
              ['Email', email || '—'],
              ['Address', address],
              ['Service', service],
              ['Preferred Date', date || '—'],
              ['Preferred Time', time || '—'],
            ].map(([label, value]) => `
              <tr>
                <td style="padding:10px 0;font-size:13px;font-weight:bold;color:#7e94b6;text-transform:uppercase;letter-spacing:.06em;width:140px;border-bottom:1px solid #eef0f6">${label}</td>
                <td style="padding:10px 0;font-size:15px;color:#0a1530;border-bottom:1px solid #eef0f6">${value}</td>
              </tr>
            `).join('')}
          </table>
          ${message ? `<div style="margin-top:20px;padding:16px;background:#f5f7fb;border-radius:4px;border-left:4px solid #083E85"><p style="margin:0;font-size:14px;color:#3e4a66"><strong>Message:</strong><br/>${message}</p></div>` : ''}
          <div style="margin-top:24px;padding:16px;background:#CB2431;border-radius:4px;text-align:center">
            <p style="margin:0;color:#fff;font-size:15px;font-weight:bold">Reply to this customer promptly to confirm their appointment.</p>
          </div>
        </div>
      </div>
    `
    try {
      emailed = await sendLeadEmail(`New Booking Request — ${name} (${service})`, html)
    } catch (err) {
      console.error('[book] Email error:', err)
      // Booking is still saved in the DB if that succeeded.
    }
  }

  // If the lead was neither stored nor emailed, make sure it's recoverable from
  // server logs rather than silently lost (e.g. before delivery is configured).
  if (!savedToDb && !emailed) {
    console.warn('[book] Lead not stored or emailed:', { name, phone, email, address, service, date, time, message })
  }

  return NextResponse.json({ success: true })
}
