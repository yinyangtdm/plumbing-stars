'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid email or password.')
      setLoading(false)
    } else {
      router.push('/admin')
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-logo">
          <Image src="/logo.svg" alt="The Plumbing Stars" width={72} height={72} />
          <div className="brand">
            <span>The Plumbing Stars</span>
            <small>Admin Portal · Los Angeles</small>
          </div>
        </div>

        <h2>Sign In</h2>
        <p className="login-sub">Access the admin dashboard</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-field mb-16">
            <label className="admin-label" htmlFor="email">Email Address</label>
            <input
              className="admin-input"
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@theplumbingstars.com"
              required
              autoComplete="username"
            />
          </div>
          <div className="form-field mb-24">
            <label className="admin-label" htmlFor="password">Password</label>
            <input
              className="admin-input"
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="login-divider" />
        <div className="login-back">
          <Link href="/">← Back to main site</Link>
        </div>
      </div>
    </div>
  )
}
