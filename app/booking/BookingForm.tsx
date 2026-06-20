'use client'

import { useState } from 'react'
import { SITE } from '@/lib/site'

const SERVICES = [
  'Drain Cleaning',
  'Sewer Line Repair',
  'Hydro Jetting',
  'Pipe Lining',
  'Epoxy Brush Coating',
  'Camera Inspection',
  'Trenchless Replacement',
  'Water Heater Replacement',
  'Other / Not Sure',
]

const TIME_WINDOWS = [
  'Morning (8am – 12pm)',
  'Afternoon (12pm – 4pm)',
  'Evening (4pm – 8pm)',
  'Emergency — ASAP',
]

export default function BookingForm() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '',
    service: '', date: '', time: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setForm({ name: '', phone: '', email: '', address: '', service: '', date: '', time: '', message: '' })
      } else {
        setStatus('error')
        setErrorMsg(data.error || 'Something went wrong. Please call us directly.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Could not send your request. Please call us directly.')
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="booking-hero">
        <div className="container">
          <div className="eyebrow eyebrow-light mb-14">Schedule Service</div>
          <h1>Book Your<br /><span className="text-outline">Appointment</span></h1>
          <p>A real person will follow up within 5 minutes during business hours. Emergency calls go out 24/7.</p>
        </div>
      </section>

      <section className="booking-form-section">
        <div className="container">
          <div className="booking-form-wrap">

            {/* Form */}
            <div className="booking-form-card">
              <h2>Request a Visit</h2>
              <div className="sub">No spam, no robocalls, no upsells.</div>

              {status === 'success' ? (
                <div className="form-msg success mt-0">
                  ✓ &nbsp;Request received! We&apos;ll call you back shortly. For emergencies call {SITE.phone.display}.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-row two">
                    <div className="form-field">
                      <label htmlFor="name">Full Name *</label>
                      <input id="name" name="name" type="text" placeholder="Jane Smith" required value={form.name} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="phone">Phone Number *</label>
                      <input id="phone" name="phone" type="tel" placeholder="(323) 555-0100" required value={form.phone} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-row two">
                    <div className="form-field">
                      <label htmlFor="email">Email Address</label>
                      <input id="email" name="email" type="email" placeholder="jane@example.com" value={form.email} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="address">Service Address / ZIP *</label>
                      <input id="address" name="address" type="text" placeholder="123 Main St, Los Angeles" required value={form.address} onChange={handleChange} />
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="service">What Do You Need Help With? *</label>
                    <select id="service" name="service" required value={form.service} onChange={handleChange}>
                      <option value="">Select a service…</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className="form-row two">
                    <div className="form-field">
                      <label htmlFor="date">Preferred Date</label>
                      <input id="date" name="date" type="date" value={form.date} onChange={handleChange} />
                    </div>
                    <div className="form-field">
                      <label htmlFor="time">Preferred Time</label>
                      <select id="time" name="time" value={form.time} onChange={handleChange}>
                        <option value="">Any time works</option>
                        {TIME_WINDOWS.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="message">Describe the Issue</label>
                    <textarea id="message" name="message" placeholder="Tell us what&#39;s happening — slow drain, backup, smell, anything helpful…" value={form.message} onChange={handleChange} />
                  </div>

                  {status === 'error' && (
                    <div className="form-msg error">{errorMsg}</div>
                  )}

                  <button type="submit" className="btn btn-red btn-full mt-4" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Sending…' : 'Send My Request'}
                  </button>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div className="booking-info-side">
              <h3>What to Expect</h3>

              {[
                {
                  icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
                  title: 'Fast Follow-Up',
                  desc: 'A real person calls or texts you back within 5 minutes during business hours — not a bot.',
                },
                {
                  icon: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
                  title: 'Free Estimate',
                  desc: 'We diagnose the problem at no charge and give you a flat-rate quote before any work begins.',
                },
                {
                  icon: <><path d="M3 12l4 4L21 4" /></>,
                  title: 'No Trip Charges',
                  desc: 'We never charge for showing up. The estimate is free and there\'s no minimum fee just for coming out.',
                },
                {
                  icon: <><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
                  title: 'Written Guarantee',
                  desc: 'All workmanship is backed in writing for up to 5 years. If it fails, we come back and fix it.',
                },
              ].map(item => (
                <div className="info-block" key={item.title}>
                  <div className="icon-wrap">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      {item.icon}
                    </svg>
                  </div>
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}

              <div className="emergency-callout">
                <div className="emergency-callout-label">Emergency? Call Now</div>
                <a href={SITE.phone.href} className="emergency-callout-phone">{SITE.phone.display}</a>
                <p className="emergency-callout-note">Available 24 hours a day, 7 days a week.</p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
