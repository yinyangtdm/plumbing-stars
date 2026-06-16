'use client'

import { useState, useEffect } from 'react'

interface Lead {
  id: number; name: string; phone: string; email: string; address: string;
  service: string; preferred_date: string; preferred_time: string;
  message: string; status: string; notes: string; created_at: string;
}

const STATUSES = ['new', 'contacted', 'booked', 'completed']
const STATUS_BADGE: Record<string, string> = {
  new: 'badge-new', contacted: 'badge-contacted', booked: 'badge-booked', completed: 'badge-completed',
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [selected, setSelected] = useState<Lead | null>(null)
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState('')
  const [saving, setSaving] = useState(false)
  const [filter, setFilter] = useState('all')

  async function load() {
    const res = await fetch('/api/admin/leads')
    setLeads(await res.json())
  }

  useEffect(() => { load() }, [])

  function openLead(lead: Lead) {
    setSelected(lead)
    setNotes(lead.notes || '')
    setStatus(lead.status || 'new')
  }

  async function saveLead() {
    if (!selected) return
    setSaving(true)
    const res = await fetch('/api/admin/leads', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: selected.id, status, notes }),
    })
    if (res.ok) {
      await load()
      setSelected(null)
    }
    setSaving(false)
  }

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter)

  return (
    <>
      <div className="admin-topbar">
        <h1>Leads / CRM</h1>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-barlow-condensed)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em', color: '#7e94b6' }}>Filter:</span>
          {['all', ...STATUSES].map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              style={{
                padding: '5px 14px', borderRadius: 20, border: 'none', cursor: 'pointer', fontSize: 12,
                fontFamily: 'var(--font-barlow-condensed)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em',
                background: filter === s ? 'var(--blue)' : '#eef0f6',
                color: filter === s ? '#fff' : '#5a6a86',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 20 }}>
        {/* List */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2>All Leads ({filtered.length})</h2>
          </div>
          {filtered.length === 0 ? (
            <div className="admin-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              </svg>
              <p>No leads {filter !== 'all' ? `with status "${filter}"` : 'yet'}.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th><th>Phone</th><th>Service</th><th>Date Req.</th><th>Status</th><th>Received</th><th></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(lead => (
                    <tr key={lead.id} style={{ cursor: 'pointer' }} onClick={() => openLead(lead)}>
                      <td style={{ fontWeight: 600 }}>{lead.name}</td>
                      <td><a href={`tel:${lead.phone}`} onClick={e => e.stopPropagation()} style={{ color: 'var(--blue)' }}>{lead.phone}</a></td>
                      <td>{lead.service}</td>
                      <td style={{ fontSize: 13, color: '#7e94b6' }}>{lead.preferred_date || '—'}</td>
                      <td><span className={`badge ${STATUS_BADGE[lead.status] || 'badge-new'}`}>{lead.status}</span></td>
                      <td style={{ fontSize: 13, color: '#7e94b6' }}>{new Date(lead.created_at).toLocaleDateString()}</td>
                      <td><button className="admin-btn admin-btn-primary admin-btn-sm">Open</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="admin-card" style={{ alignSelf: 'start', position: 'sticky', top: 24 }}>
            <div className="admin-card-header">
              <h2>{selected.name}</h2>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7e94b6', fontSize: 20 }}>✕</button>
            </div>
            <div className="admin-card-body">
              {[
                ['Phone', <a href={`tel:${selected.phone}`} style={{ color: 'var(--blue)' }}>{selected.phone}</a>],
                ['Email', selected.email || '—'],
                ['Address', selected.address],
                ['Service', selected.service],
                ['Preferred Date', selected.preferred_date || '—'],
                ['Preferred Time', selected.preferred_time || '—'],
                ['Received', new Date(selected.created_at).toLocaleString()],
              ].map(([label, value]) => (
                <div key={String(label)} style={{ marginBottom: 12 }}>
                  <div className="admin-label">{label}</div>
                  <div style={{ fontSize: 15, color: 'var(--ink)' }}>{value}</div>
                </div>
              ))}

              {selected.message && (
                <div style={{ marginBottom: 16, padding: 14, background: '#f5f7fb', borderRadius: 4, borderLeft: '3px solid var(--blue)' }}>
                  <div className="admin-label">Customer Message</div>
                  <p style={{ margin: 0, fontSize: 14, color: '#3e4a66', lineHeight: 1.6 }}>{selected.message}</p>
                </div>
              )}

              <div style={{ marginBottom: 14 }}>
                <label className="admin-label">Status</label>
                <select className="admin-select" value={status} onChange={e => setStatus(e.target.value)}>
                  {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 16 }}>
                <label className="admin-label">Internal Notes</label>
                <textarea className="admin-textarea" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Add notes about this customer…" />
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button className="admin-btn admin-btn-primary" onClick={saveLead} disabled={saving} style={{ flex: 1 }}>
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <a href={`tel:${selected.phone}`} className="admin-btn" style={{ background: '#e6f4ea', color: '#065f46' }}>
                  📞 Call
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
