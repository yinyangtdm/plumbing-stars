import Link from 'next/link'
import HeaderWrapper from '@/components/HeaderWrapper'
import Footer from '@/components/Footer'
import MobileCallbar from '@/components/MobileCallbar'
import ServiceAreaMapClientWrapper from '@/components/ServiceAreaMapClientWrapper'
import { getDb } from '@/lib/db'
import { SITE } from '@/lib/site'

async function getFaqs() {
  try {
    const db = getDb()
    return await db`SELECT * FROM faqs ORDER BY display_order ASC, id ASC` as {
      id: number; question: string; answer: string
    }[]
  } catch {
    return []
  }
}

export default async function HomePage() {
  const faqs = await getFaqs()

  return (
    <>
      <HeaderWrapper />

      {/* Hero */}
      <section className="hero">
        <div className="chev" />
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-tag">⭐ Drain &amp; Sewer Specialists — Los Angeles</div>
              <h1>
                <span style={{ display: 'block' }}>Expert</span>
                <span style={{ display: 'block' }} className="out">Drain &amp;</span>
                <span style={{ display: 'block' }}>Sewer <span className="accent">Pros.</span></span>
              </h1>
              <p className="lede">
                Licensed technicians with 25 years on the job. We show up fast, quote flat rates, and back every job with a written guarantee.
              </p>
              <div className="hero-cta">
                <a href={SITE.phone.href} className="btn btn-red">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ width: 18, height: 18 }}>
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.1.78.27 1.55.5 2.3a2 2 0 0 1-.45 2.11L7.91 9.39a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.75.23 1.52.4 2.3.5A2 2 0 0 1 22 16.92z" />
                  </svg>
                  Call Now
                </a>
                <Link href="/booking" className="btn btn-ghost">Book Online</Link>
              </div>
              <div className="hero-stats">
                <div><div className="n">25+</div><div className="l">Years Experience</div></div>
                <div><div className="n">2.4K</div><div className="l">5-Star Reviews</div></div>
                <div><div className="n">60 min</div><div className="l">Avg. Arrival</div></div>
              </div>
            </div>

            {/* Credential card */}
            <div className="cred-card">
              <div className="cred-inner">
                <div className="cred-divider" />
                <ul className="cred-list">
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12l4 4L21 4" /></svg>
                    Licensed &amp; Bonded — State of California
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12l4 4L21 4" /></svg>
                    25+ Years Serving Los Angeles
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12l4 4L21 4" /></svg>
                    24 / 7 Emergency Service
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12l4 4L21 4" /></svg>
                    5-Year Written Guarantee
                  </li>
                  <li>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12l4 4L21 4" /></svg>
                    Flat-Rate Pricing — No Surprises
                  </li>
                </ul>
                <div className="cred-rating">
                  <div className="stars">★★★★★</div>
                  <div className="info">
                    <strong>4.9</strong>
                    2,400+ Google Reviews
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="stats-strip">
        <div className="container">
          <div className="stats-row">
            <div className="stat-item">
              <div className="n"><span className="gold">★★★★★</span></div>
              <div className="l">4.9 / 2,400 Reviews</div>
            </div>
            <div className="stat-item">
              <div className="n">25+</div>
              <div className="l">Years in Business</div>
            </div>
            <div className="stat-item">
              <div className="n">24/7</div>
              <div className="l">Emergency Dispatch</div>
            </div>
            <div className="stat-item">
              <div className="n">A+</div>
              <div className="l">BBB Accredited</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section" id="services">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">What We Do</div>
            <h2>Every drain &amp; sewer <span className="accent">service</span> you need.</h2>
            <p>From a simple clogged drain to a full sewer main replacement — flat-rate pricing and a written guarantee on every job.</p>
          </div>
          <div className="services-grid">
            {[
              {
                num: '01', title: 'Drain Cleaning',
                desc: 'Kitchen, bath, laundry &amp; main lines cleared at a flat price — guaranteed 30 days or it\'s free.',
                icon: <path d="M12 2c3 4 5 7 5 11a5 5 0 1 1-10 0c0-4 2-7 5-11z" />,
              },
              {
                num: '02', title: 'Sewer Line Repair',
                desc: 'Spot fixes and full replacements done by techs with two decades of hands-on experience.',
                icon: <path d="M3 12h18M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6M5 12V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />,
              },
              {
                num: '03', title: 'Hydro Jetting',
                desc: 'High-pressure water that powers through roots, grease and scale until pipes run like new.',
                icon: <path d="M4 12c4-8 12-8 16 0M4 17c4-8 12-8 16 0M4 7c4-8 12-8 16 0" />,
              },
              {
                num: '04', title: 'Camera Inspection',
                desc: 'HD video down your line so you know exactly what\'s going on before any work begins.',
                icon: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></>,
              },
              {
                num: '05', title: 'Pipe Lining',
                desc: 'Trenchless CIPP lining creates a new pipe inside your old one — no excavation required.',
                icon: <><path d="M4 19l6-6 4 4 6-8" /><path d="M14 5h6v6" /></>,
              },
              {
                num: '06', title: 'Trenchless Replacement',
                desc: 'No-dig pipe bursting and lining. Your lawn and driveway stay untouched.',
                icon: <><path d="M4 19l6-6 4 4 6-8" /><path d="M14 5h6v6" /></>,
              },
            ].map(svc => (
              <article className="service-card" key={svc.num}>
                <span className="svc-num">SVC {svc.num}</span>
                <div className="ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {svc.icon}
                  </svg>
                </div>
                <h3>{svc.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: svc.desc }} />
                <Link href="/booking" className="more">Book This Service →</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Promo */}
      <section className="section dark">
        <div className="chev" />
        <div className="container">
          <div className="promo-wrap">
            <div className="promo-side">
              <div className="eyebrow" style={{ color: 'var(--sky)' }}>Special Offer</div>
              <h3>Drain cleared or<br />you <span className="accent">don&apos;t pay</span>.</h3>
              <p>Main-line drain cleaning for just $93 — and if we can&apos;t clear it, you owe us nothing. No fine print, no trip charge, no hassle.</p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href={SITE.phone.href} className="btn btn-red">Claim by Phone</a>
                <Link href="/booking" className="btn btn-ghost">Book Online</Link>
              </div>
            </div>
            <div className="promo-ticket">
              <div className="ribbon">NO CLEAR = NO CHARGE</div>
              <div className="ptop">Drain Cleaning Guarantee</div>
              <h4>Main-Line Drain Cleaning</h4>
              <div className="price">$93</div>
              <div className="fine">If we can&apos;t unclog your drain, you pay nothing — no service fee, no trip charge. Applies to standard main-line drain cleaning. Limit one per household.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="section lt" id="about">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Why Choose Us</div>
            <h2>Four reasons Los Angeles <span className="accent">calls us first</span>.</h2>
            <p>We&apos;ve been the first call for drain and sewer problems across the greater LA area since 1998.</p>
          </div>
          <div className="reasons-grid">
            <div className="reason-card">
              <div className="num">01</div>
              <div>
                <h4>Flat-Rate Pricing</h4>
                <p>You see the price in writing before any work begins. No surprise add-ons, no hourly billing traps.</p>
              </div>
            </div>
            <div className="reason-card">
              <div className="num">02</div>
              <div>
                <h4>True 24/7 Response</h4>
                <p>Emergency crews available every night, weekend, and holiday — no surcharges, no waiting until Tuesday.</p>
              </div>
            </div>
            <div className="reason-card">
              <div className="num">03</div>
              <div>
                <h4>HD Camera Documentation</h4>
                <p>Photo and video footage of every job — yours to keep. You know exactly what was done and why.</p>
              </div>
            </div>
            <div className="reason-card">
              <div className="num">04</div>
              <div>
                <h4>Written Guarantee</h4>
                <p>All workmanship backed up to 5 years. If it fails, we come back and make it right — no arguments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section" id="reviews">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Customer Reviews</div>
            <h2>What your neighbors <span className="accent">are saying</span>.</h2>
          </div>
          <div className="reviews-grid">
            {[
              { initials: 'MR', name: 'Maria R.', location: 'Los Angeles · Google', quote: 'Showed up 45 minutes after I called. Gave me a flat quote, showed me the camera footage of the root in my main line, and had it cleared before dinner. I will never call anyone else.' },
              { initials: 'DK', name: 'David K.', location: 'Pasadena · Yelp', quote: 'Three other plumbers tried to sell me a $14k excavation. The Plumbing Stars hydro-jetted it for $480 and it\'s been running perfectly for two years. Genuinely honest people.' },
              { initials: 'JL', name: 'Jennifer L.', location: 'Burbank · Google', quote: 'Saturday night, sewer backing up into the basement. They were the only company to answer. Two techs, two hours — problem completely gone. Worth every penny.' },
            ].map(r => (
              <article className="review-card" key={r.name}>
                <div className="stars">★★★★★</div>
                <p>&ldquo;{r.quote}&rdquo;</p>
                <footer>
                  <div className="avatar">{r.initials}</div>
                  <div>
                    <div className="rname">{r.name}</div>
                    <div className="rmeta">{r.location}</div>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section lt" id="faq">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">FAQ</div>
            <h2>Common <span className="accent">questions</span>.</h2>
          </div>
          <div className="faq-list">
            {faqs.length > 0 ? faqs.map(faq => (
              <details className="faq-item" key={faq.id}>
                <summary>{faq.question}</summary>
                <div className="faq-body">{faq.answer}</div>
              </details>
            )) : (
              <>
                {[
                  { q: 'How quickly can you get to me?', a: 'We typically arrive within 60 minutes for emergency calls in the Los Angeles area. For scheduled appointments we offer 2-hour arrival windows at a time that works for you.' },
                  { q: 'Do you charge for estimates?', a: 'No — estimates are always free. We\'ll diagnose the problem, explain what we found, and give you a flat-rate quote before any work begins.' },
                  { q: 'What areas do you serve?', a: 'We serve the greater Los Angeles area including Burbank, Pasadena, Glendale, Van Nuys, Sherman Oaks, Studio City, and surrounding communities.' },
                  { q: 'What is your guarantee?', a: 'All labor is backed by a written workmanship guarantee of up to 5 years. If the same issue returns within the guarantee period, we come back and fix it at no charge.' },
                  { q: 'Can you work on a weekend or holiday?', a: 'Yes. We operate 24 hours a day, 7 days a week, 365 days a year — including all holidays — with no additional surcharges for after-hours or weekend service.' },
                ].map(item => (
                  <details className="faq-item" key={item.q}>
                    <summary>{item.q}</summary>
                    <div className="faq-body">{item.a}</div>
                  </details>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="section lt" id="service-area">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Where We Work</div>
            <h2>Serving <span className="accent">LA &amp; Ventura</span> Counties.</h2>
            <p>From the San Fernando Valley to Oxnard — if you&apos;re in our service area, we&apos;re on our way.</p>
          </div>
          <ServiceAreaMapClientWrapper />
        </div>
      </section>

      {/* Book CTA */}
      <section className="section dark">
        <div className="chev" />
        <div className="container">
          <div className="book-cta-wrap">
            <div className="book-cta-side">
              <div className="eyebrow" style={{ color: 'var(--sky)' }}>Get On The Schedule</div>
              <h2>Ready to <span className="accent">get it fixed</span>?</h2>
              <p>Tell us what&apos;s going on. A real person follows up in under 5 minutes during business hours — crews go out 24/7.</p>
              <ul>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12l4 4L21 4" /></svg>
                  Free estimates, every visit
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12l4 4L21 4" /></svg>
                  2-hour arrival windows
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12l4 4L21 4" /></svg>
                  No trip charges, ever
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12l4 4L21 4" /></svg>
                  Up to 5-year written guarantee
                </li>
              </ul>
            </div>
            <div className="book-cta-card">
              <h3>Book An Appointment</h3>
              <p>Fill out our quick form and we&apos;ll be in touch right away.</p>
              <Link href="/booking" className="btn btn-red" style={{ width: '100%', justifyContent: 'center' }}>
                Schedule My Visit
              </Link>
              <div className="book-cta-or">— or —</div>
              <div className="phone-label">Call us anytime</div>
              <a href={SITE.phone.href} className="phone-big">{SITE.phone.display}</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCallbar />
    </>
  )
}
