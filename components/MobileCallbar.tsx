import Link from 'next/link'

export default function MobileCallbar() {
  return (
    <div className="callbar">
      <a href="tel:+17474631853">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.1.78.27 1.55.5 2.3a2 2 0 0 1-.45 2.11L7.91 9.39a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.75.23 1.52.4 2.3.5A2 2 0 0 1 22 16.92z" />
        </svg>
        Call Now
      </a>
      <Link href="/booking" className="book-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        Book Online
      </Link>
    </div>
  )
}
