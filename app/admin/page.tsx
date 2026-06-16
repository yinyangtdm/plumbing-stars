import { getDb, initDb } from '@/lib/db'
import Link from 'next/link'

async function getStats() {
  try {
    await initDb()
    const db = getDb()
    const [total] = await db`SELECT COUNT(*) as count FROM bookings` as [{ count: number }]
    const [newLeads] = await db`SELECT COUNT(*) as count FROM bookings WHERE status = 'new'` as [{ count: number }]
    const [booked] = await db`SELECT COUNT(*) as count FROM bookings WHERE status = 'booked'` as [{ count: number }]
    const [completed] = await db`SELECT COUNT(*) as count FROM bookings WHERE status = 'completed'` as [{ count: number }]
    const recent = await db`SELECT * FROM bookings ORDER BY created_at DESC LIMIT 5` as {
      id: number; name: string; phone: string; service: string; status: string; created_at: string
    }[]
    return { total: total.count, newLeads: newLeads.count, booked: booked.count, completed: completed.count, recent }
  } catch {
    return { total: 0, newLeads: 0, booked: 0, completed: 0, recent: [] }
  }
}

const STATUS_BADGE: Record<string, string> = {
  new: 'badge-new',
  contacted: 'badge-contacted',
  booked: 'badge-booked',
  completed: 'badge-completed',
}

export default async function AdminDashboard() {
  const stats = await getStats()

  return (
    <>
      <div className="admin-topbar">
        <h1>Dashboard</h1>
        <Link href="/booking" className="admin-btn admin-btn-primary" target="_blank">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: 16, height: 16 }}>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
          </svg>
          View Booking Page
        </Link>
      </div>

      <div className="stat-cards">
        <div className="stat-card">
          <div className="sc-value">{stats.total}</div>
          <div className="sc-label">Total Leads</div>
        </div>
        <div className="stat-card">
          <div className="sc-value">{stats.newLeads}</div>
          <div className="sc-label">New — Needs Follow-Up</div>
        </div>
        <div className="stat-card">
          <div className="sc-value">{stats.booked}</div>
          <div className="sc-label">Booked</div>
        </div>
        <div className="stat-card">
          <div className="sc-value">{stats.completed}</div>
          <div className="sc-label">Completed Jobs</div>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-header">
          <h2>Recent Leads</h2>
          <Link href="/admin/leads" className="admin-btn admin-btn-primary admin-btn-sm">View All →</Link>
        </div>
        <div style={{ overflowX: 'auto' }}>
          {stats.recent.length === 0 ? (
            <div className="admin-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              </svg>
              <p>No leads yet — they will appear here when customers book.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Received</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {stats.recent.map(lead => (
                  <tr key={lead.id}>
                    <td style={{ fontWeight: 600 }}>{lead.name}</td>
                    <td><a href={`tel:${lead.phone}`} style={{ color: 'var(--blue)' }}>{lead.phone}</a></td>
                    <td>{lead.service}</td>
                    <td><span className={`badge ${STATUS_BADGE[lead.status] || 'badge-new'}`}>{lead.status}</span></td>
                    <td style={{ color: '#7e94b6', fontSize: 13 }}>{new Date(lead.created_at).toLocaleDateString()}</td>
                    <td><Link href={`/admin/leads?id=${lead.id}`} className="admin-btn admin-btn-primary admin-btn-sm">View</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}
