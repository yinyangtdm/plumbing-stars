/**
 * Header Component
 *
 * Main navigation and branding component.
 * - Sticky top bar with utility information (24/7, licensing)
 * - Navigation with logo centered on desktop
 * - Mobile menu drawer for navigation
 *
 * @param city - City name to display under logo (Los Angeles or Ventura)
 */

'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SITE } from '@/lib/site'

interface HeaderProps {
  city?: string
}

export default function Header({ city = 'Los Angeles' }: HeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      {/* =============================================
          UTILITY BAR - Top info bar
          ============================================= */}
      <div className="util">
        <span className="chev" />
        <div className="container">
          {/* Trust indicators on left side */}
          <div className="util-left">
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
              </svg>
              24/7 Emergency Dispatch
            </span>
            <span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 12l4 4L21 4" />
              </svg>
              Licensed · Bonded · Insured
            </span>
          </div>
        </div>
      </div>

      {/* =============================================
          HEADER - Main navigation
          ============================================= */}
      <header className="header">
        <div className="container">
          <div className="nav">
            {/* =============================================
                NAV LEFT - Mobile menu / Desktop navigation
                ============================================= */}
            <div className="nav-left">
              <button className="menu-btn" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 6h18M3 12h18M3 18h18" />
                </svg>
              </button>
              {/* Desktop navigation links (hidden on mobile) */}
              <nav className="nav-desk">
                <Link href="/services">Services</Link>
                <Link href="/about">About</Link>
                <Link href="/service-areas">Areas</Link>
                <Link href="/#faq">FAQ</Link>
                <Link href="/contact">Contact</Link>
              </nav>
            </div>

            {/* =============================================
                NAV CENTER - Logo and branding
                ============================================= */}
            <div className="nav-mid">
              <Link href="/" className="emblem">
                <Image src="/logo.svg" alt="The Plumbing Stars" width={96} height={96} priority />
                <span className="emblem-city">{city}</span>
              </Link>
            </div>

            {/* =============================================
                NAV RIGHT - Mobile call / Desktop CTA
                ============================================= */}
            <div className="nav-right">
              {/* Mobile call button (hidden on desktop) */}
              <a className="call-btn" href={SITE.phone.href} aria-label="Call us">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.1.78.27 1.55.5 2.3a2 2 0 0 1-.45 2.11L7.91 9.39a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.75.23 1.52.4 2.3.5A2 2 0 0 1 22 16.92z" />
                </svg>
              </a>

              {/* Desktop CTA section - phone + book button (hidden on mobile) */}
              <div className="nav-cta">
                <div className="phone">
                  <span>24/7 Hotline</span>
                  {SITE.phone.display}
                </div>
                <Link href="/booking" className="btn btn-red">Book Now</Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =============================================
          MOBILE DRAWER - Navigation menu for mobile
          ============================================= */}
      {drawerOpen && (
        <div className="drawer open" onClick={() => setDrawerOpen(false)}>
          <div className="panel" onClick={e => e.stopPropagation()}>
            {/* Close button */}
            <button className="close-btn" onClick={() => setDrawerOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            {/* Logo section in drawer */}
            <div className="logo-row">
              <Image src="/logo.svg" alt="The Plumbing Stars" width={74} height={74} />
            </div>

            {/* Navigation menu items */}
            <Link className="item" href="/" onClick={() => setDrawerOpen(false)}>Home <span>→</span></Link>
            <Link className="item" href="/services" onClick={() => setDrawerOpen(false)}>Services <span>→</span></Link>
            <Link className="item" href="/about" onClick={() => setDrawerOpen(false)}>About <span>→</span></Link>
            <Link className="item" href="/service-areas" onClick={() => setDrawerOpen(false)}>Service Areas <span>→</span></Link>
            <Link className="item" href="/#faq" onClick={() => setDrawerOpen(false)}>FAQ <span>→</span></Link>
            <Link className="item" href="/booking" onClick={() => setDrawerOpen(false)}>Book Online <span>→</span></Link>
            <Link className="item" href="/contact" onClick={() => setDrawerOpen(false)}>Contact <span>→</span></Link>

            {/* Action buttons section */}
            <div className="btn-stack">
              <a href={SITE.phone.href} className="btn btn-blue btn-full">Call {SITE.phone.display}</a>
              <Link href="/booking" className="btn btn-red btn-full" onClick={() => setDrawerOpen(false)}>Book Online</Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
