'use client'

import { useState } from 'react'

const SERVICES = [
  'Drain Cleaning',
  'Sewer Line Repair',
  'Hydro Jetting',
  'Pipe Lining',
  'Camera Inspection',
  'Trenchless Replacement',
  'General Question',
  'Other / Not Sure',
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')
  const [errMsg, setErrMsg] = useState('')

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('ok')
      } else {
        setErrMsg(data.error || 'Something went wrong.')
        setStatus('err')
      }
    } catch {
      setErrMsg('Network error — please call us directly.')
      setStatus('err')
    }
  }

  if (status === 'ok') {
    return (
      <div style={{ padding: '60px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, color: '#F5C518', marginBottom: 16 }}>★</div>
        <h3 style={{ fontSize: 28, color: 'var(--blue)', marginBottom: 10 }}>Message Received!</h3>
        <p style={{ color: '#3e4a66', fontSize: 16 }}>We&apos;ll get back to you within 1 business hour. For emergencies, call us directly.</p>
        <a href="tel:+17474631853" className="btn btn-red" style={{ marginTop: 20 }}>Call (747) 463-1853</a>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row two">
        <div className="form-field">
          <label>Full Name *</label>
          <input placeholder="John Smith" value={form.name} onChange={e => set('name', e.target.value)} required />
        </div>
        <div className="form-field">
          <label>Phone Number *</label>
          <input type="tel" placeholder="(323) 555-0100" value={form.phone} onChange={e => set('phone', e.target.value)} required />
        </div>
      </div>
      <div className="form-field">
        <label>Email Address</label>
        <input type="email" placeholder="john@email.com" value={form.email} onChange={e => set('email', e.target.value)} />
      </div>
      <div className="form-field">
        <label>Service Needed</label>
        <select value={form.service} onChange={e => set('service', e.target.value)}>
          <option value="">— Select a service —</option>
          {SERVICES.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>
      <div className="form-field">
        <label>Message *</label>
        <textarea
          placeholder="Describe what's going on — we'll get back to you quickly."
          value={form.message}
          onChange={e => set('message', e.target.value)}
          required
        />
      </div>
      {status === 'err' && <div className="form-msg error">{errMsg}</div>}
      <button type="submit" className="btn btn-red" style={{ width: '100%' }} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
