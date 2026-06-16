import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <footer className="footer" id="contact">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Image src="/logo.svg" alt="The Plumbing Stars" width={64} height={64} style={{ filter: 'brightness(0) invert(1)' }} />
                <div className="brand-name">
                  The Plumbing<br />Stars
                  <span className="brand-city">Los Angeles</span>
                </div>
              </div>
              <p style={{ margin: '20px 0', color: '#cfdcef', maxWidth: 300, fontFamily: 'var(--font-barlow)' }}>
                Family-owned. 25 years on the job. Licensed, insured, and proudly serving the greater Los Angeles area.
              </p>
              <div className="social">
                <a href="#" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5C10.5 7 12 5.7 14.2 5.7c1 0 2.1.2 2.1.2V8h-1.2c-1.2 0-1.6.7-1.6 1.5V12h2.7l-.4 3h-2.3v7A10 10 0 0 0 22 12z" /></svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /></svg>
                </a>
                <a href="#" aria-label="Google Reviews">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.4 2.3 7.2-6.3-4.5-6.3 4.5 2.3-7.2-6-4.4h7.6z" /></svg>
                </a>
              </div>
            </div>

            <div>
              <h4>Services</h4>
              <Link href="/services">Drain Cleaning</Link>
              <Link href="/services">Sewer Line Repair</Link>
              <Link href="/services">Hydro Jetting</Link>
              <Link href="/services">Pipe Lining</Link>
              <Link href="/services">Camera Inspection</Link>
              <Link href="/services">Trenchless Replacement</Link>
            </div>

            <div>
              <h4>Company</h4>
              <Link href="/about">About Us</Link>
              <Link href="/service-areas">Service Areas</Link>
              <Link href="/#faq">FAQ</Link>
              <Link href="/booking">Book Appointment</Link>
              <Link href="/contact">Contact</Link>
            </div>

            <div>
              <h4>Contact Us</h4>
              <div className="lbl">24/7 Hotline</div>
              <div className="v">(747) 463-1853</div>
              <div className="lbl">Email</div>
              <a href="mailto:info@theplumbingstars.com">info@theplumbingstars.com</a>
              <div className="lbl">Service Area</div>
              <div className="v" style={{ fontSize: 14, fontFamily: 'var(--font-barlow)' }}>Los Angeles &amp; Surrounding Cities</div>
              <div style={{ marginTop: 18 }}>
                <Link href="/booking" className="btn btn-red">Book Now</Link>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div>© 2026 The Plumbing Stars · Lic #998456</div>
            <div>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
