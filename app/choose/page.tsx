import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'The Plumbing Stars — Choose Your Location',
  description: 'Drain & sewer specialists serving Los Angeles and Ventura County.',
}

export default function ChoosePage() {
  return (
    <div className="choose-page">
      <div className="choose-inner">
        <div className="choose-logo">
          <Image src="/logo.svg" alt="The Plumbing Stars" width={140} height={140} priority />
        </div>
        <h1 className="choose-heading">Select Your Location</h1>
        <p className="choose-sub">Drain &amp; sewer specialists serving Southern California</p>

        <div className="choose-grid">
          <Link href="https://plumbingstarslosangeles.com" className="choose-card">
            <div className="choose-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <div className="choose-card-city">Los Angeles</div>
            <div className="choose-card-sub">LA County &amp; Surrounding Cities</div>
            <div className="choose-card-cta">Visit Site →</div>
          </Link>

          <div className="choose-card choose-card--soon">
            <div className="choose-card-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </div>
            <div className="choose-card-city">Ventura County</div>
            <div className="choose-card-sub">Oxnard · Thousand Oaks · Camarillo</div>
            <div className="choose-card-cta coming">Coming Soon</div>
          </div>
        </div>

        <p className="choose-phone">
          <a href="tel:+18885557827">(888) 555-7827</a> · Available 24/7
        </p>
      </div>
    </div>
  )
}
