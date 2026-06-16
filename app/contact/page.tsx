import Link from 'next/link'
import HeaderWrapper from '@/components/HeaderWrapper'
import Footer from '@/components/Footer'
import MobileCallbar from '@/components/MobileCallbar'
import ContactForm from './ContactForm'

export const metadata = {
  title: 'Contact Us — The Plumbing Stars | Los Angeles',
  description: 'Get in touch with The Plumbing Stars. Call (747) 463-1853 for 24/7 emergency drain & sewer service in Los Angeles and Ventura County.',
}

export default function ContactPage() {
  return (
    <>
      <HeaderWrapper />

      <section className="page-hero">
        <div className="chev" />
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--sky)' }}>24/7 Emergency Service</div>
          <h1>Let&apos;s fix <span className="out">your</span><br />drain.</h1>
          <p className="page-hero-sub">Call for same-day service or send us a message — we respond within 1 business hour.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="booking-form-card">
              <h2>Send Us a Message</h2>
              <p className="sub">We&apos;ll respond within 1 business hour. For emergencies, call directly.</p>
              <ContactForm />
            </div>

            <div>
              <div className="contact-info-card">
                <div className="inner">
                  <div className="eyebrow" style={{ color: 'var(--sky)', marginBottom: 20 }}>Contact Info</div>

                  <div className="contact-info-item">
                    <div className="icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.1.78.27 1.55.5 2.3a2 2 0 0 1-.45 2.11L7.91 9.39a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.75.23 1.52.4 2.3.5A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <h4>24/7 Hotline</h4>
                      <a href="tel:+17474631853">(747) 463-1853</a>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <h4>Email</h4>
                      <a href="mailto:info@theplumbingstars.com">info@theplumbingstars.com</a>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
                      </svg>
                    </div>
                    <div>
                      <h4>Hours</h4>
                      <p>24 / 7 · 365 Days a Year</p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                    </div>
                    <div>
                      <h4>Service Area</h4>
                      <p>Los Angeles &amp; Ventura County</p>
                    </div>
                  </div>

                  <div style={{ marginTop: 24 }}>
                    <Link href="/booking" className="btn btn-red" style={{ width: '100%' }}>
                      Book Online Instead
                    </Link>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 20, padding: '20px 24px', background: 'var(--sky-2)', borderRadius: 6, borderLeft: '5px solid var(--blue)' }}>
                <div className="eyebrow" style={{ marginBottom: 6 }}>License</div>
                <p style={{ margin: 0, fontFamily: 'var(--font-barlow-condensed)', fontWeight: 700, fontSize: 16, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '.06em' }}>
                  CA Contractor Lic. #998456
                </p>
                <p style={{ margin: '6px 0 0', fontSize: 13, color: '#5a6a86' }}>Licensed · Bonded · Insured — State of California</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCallbar />
    </>
  )
}
