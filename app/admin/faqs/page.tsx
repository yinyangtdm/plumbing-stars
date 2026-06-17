'use client'

import { useState, useEffect } from 'react'

interface Faq { id: number; question: string; answer: string; display_order: number }

const EMPTY: Omit<Faq, 'id'> = { question: '', answer: '', display_order: 0 }

export default function FaqManagerPage() {
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [form, setForm] = useState<Omit<Faq, 'id'> & { id?: number }>(EMPTY)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  async function load() {
    const res = await fetch('/api/admin/faqs')
    setFaqs(await res.json())
  }

  useEffect(() => { load() }, [])

  function startNew() {
    setForm(EMPTY)
    setEditing(true)
    setMsg('')
  }

  function startEdit(faq: Faq) {
    setForm({ id: faq.id, question: faq.question, answer: faq.answer, display_order: faq.display_order })
    setEditing(true)
    setMsg('')
  }

  function cancel() {
    setEditing(false)
    setForm(EMPTY)
  }

  async function save() {
    if (!form.question.trim() || !form.answer.trim()) { setMsg('Both fields required.'); return }
    setSaving(true)
    const method = form.id ? 'PUT' : 'POST'
    const res = await fetch('/api/admin/faqs', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    if (res.ok) {
      await load()
      setEditing(false)
      setForm(EMPTY)
      setMsg('')
    } else {
      setMsg('Could not save. Please try again.')
    }
    setSaving(false)
  }

  async function deleteFaq(id: number) {
    if (!confirm('Delete this FAQ?')) return
    await fetch('/api/admin/faqs', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    await load()
  }

  return (
    <>
      <div className="admin-topbar">
        <h1>FAQ Manager</h1>
        {!editing && (
          <button className="admin-btn admin-btn-primary" onClick={startNew}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-16"><path d="M12 5v14M5 12h14" /></svg>
            Add FAQ
          </button>
        )}
      </div>

      {editing && (
        <div className="admin-card mb-24">
          <div className="admin-card-header">
            <h2>{form.id ? 'Edit FAQ' : 'New FAQ'}</h2>
          </div>
          <div className="admin-card-body">
            <div className="admin-form-row mb-16">
              <div>
                <label className="admin-label">Question</label>
                <input className="admin-input" value={form.question} onChange={e => setForm(f => ({ ...f, question: e.target.value }))} placeholder="e.g. How quickly can you get to me?" />
              </div>
            </div>
            <div className="admin-form-row mb-16">
              <div>
                <label className="admin-label">Answer</label>
                <textarea className="admin-textarea textarea-tall" value={form.answer} onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} placeholder="Write your answer here…" />
              </div>
            </div>
            <div className="admin-form-row two mb-16">
              <div>
                <label className="admin-label">Display Order (lower = first)</label>
                <input className="admin-input" type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: Number(e.target.value) }))} />
              </div>
            </div>
            {msg && <p className="admin-form-msg">{msg}</p>}
            <div className="flex-gap-10">
              <button className="admin-btn admin-btn-primary" onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save FAQ'}</button>
              <button className="admin-btn admin-btn-neutral" onClick={cancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-card">
        <div className="admin-card-header">
          <h2>All FAQs ({faqs.length})</h2>
        </div>
        {faqs.length === 0 ? (
          <div className="admin-empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" /></svg>
            <p>No FAQs yet. Add your first one above.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Order</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {faqs.map((faq, i) => (
                <tr key={faq.id}>
                  <td className="cell-muted">{i + 1}</td>
                  <td className="cell-strong cell-w280">{faq.question}</td>
                  <td className="cell-answer">{faq.answer.length > 100 ? faq.answer.slice(0, 100) + '…' : faq.answer}</td>
                  <td className="text-muted">{faq.display_order}</td>
                  <td>
                    <div className="flex-gap-8">
                      <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => startEdit(faq)}>Edit</button>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => deleteFaq(faq.id)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  )
}
