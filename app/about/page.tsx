import Link from 'next/link'
import HeaderWrapper from '@/components/HeaderWrapper'
import Footer from '@/components/Footer'
import MobileCallbar from '@/components/MobileCallbar'

export const metadata = {
  title: 'About Us — The Plumbing Stars | Los Angeles Sewer & Drain',
  description: 'Family-owned drain & sewer specialists serving Los Angeles for 25+ years. CA Contractor License #998456. Licensed, bonded & insured.',
}

export default function AboutPage() {
  return (
    <>
      <HeaderWrapper />

      <section className="page-hero">
        <div className="chev" />
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--sky)' }}>Est. 2001 · Los Angeles</div>
          <h1>The Stars <span className="out">Behind</span><br />The Drain.</h1>
          <p className="page-hero-sub">Family-owned. California-licensed. 25 years fixing the drains other plumbers won&apos;t touch.</p>
        </div>
      </section>

      <section className="section lt">
        <div className="container">
          <div className="about-story-grid">
            <div>
              <div className="eyebrow">Our Story</div>
              <h2 style={{ fontSize: 'clamp(34px, 5vw, 56px)', color: 'var(--blue)', margin: '12px 0' }}>
                Built on the <span style={{ color: 'var(--red)' }}>streets of LA.</span>
              </h2>
              <p style={{ fontSize: 17, color: '#3e4a66', marginBottom: 14, lineHeight: 1.7 }}>
                The Plumbing Stars started in 2001 with one truck and one promise: show up on time, fix it right, and never leave a homeowner guessing about the price. Two and a half decades later, that&apos;s still how we run every job.
              </p>
              <p style={{ fontSize: 17, color: '#3e4a66', marginBottom: 14, lineHeight: 1.7 }}>
                We specialize in drain and sewer work — the dirty jobs most plumbers would rather skip. It&apos;s not glamorous, but when your main line backs up at midnight, you want someone who has seen it a thousand times. We have.
              </p>
              <p style={{ fontSize: 17, color: '#3e4a66', marginBottom: 24, lineHeight: 1.7 }}>
                Now expanding into Ventura County, we bring the same licensed, flat-rate, guarantee-backed service that made us a household name across LA.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="tel:+17474631853" className="btn btn-red">Call (747) 463-1853</a>
                <Link href="/booking" className="btn btn-blue">Book Online</Link>
              </div>
            </div>
            <div>
              <div className="cred-card">
                <div className="cred-inner">
                  <div className="eyebrow" style={{ color: 'var(--sky)', marginBottom: 16 }}>License &amp; Credentials</div>
                  <ul className="cred-list">
                    {[
                      'CA Contractor License #998456',
                      'Licensed & Bonded — State of California',
                      '25+ Years Serving Los Angeles',
                      '24/7 Emergency Dispatch',
                      'BBB Accredited — A+ Rating',
                      'Flat-Rate Pricing — No Surprises',
                      '5-Year Written Guarantee',
                    ].map(item => (
                      <li key={item}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M3 12l4 4L21 4" />
                        </svg>
                        {item}
                      </li>
                    ))}
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
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">How We Work</div>
            <h2>The <span className="accent">Plumbing Stars</span> difference.</h2>
            <p>Four things that separate us from every other plumber in the phone book.</p>
          </div>
          <div className="reasons-grid">
            {[
              { num: '01', title: 'We Arrive On Time', body: 'Our dispatch team texts you when your tech is 30 minutes out. No 4-hour windows, no radio silence.' },
              { num: '02', title: 'Flat-Rate Pricing', body: "You get the price before any work starts. It doesn't change when we open the wall or find a harder problem." },
              { num: '03', title: 'Licensed Technicians Only', body: "Every tech carries a valid California contractor license. We don't send apprentices alone to your home." },
              { num: '04', title: 'We Back Our Work', body: 'Every job comes with a written guarantee. If the drain backs up again within the warranty period, we come back at no charge.' },
            ].map(r => (
              <div className="reason-card" key={r.num}>
                <div className="num">{r.num}</div>
                <div>
                  <h4>{r.title}</h4>
                  <p>{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="chev" />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="eyebrow" style={{ color: 'var(--sky)' }}>Ready to book?</div>
          <h2 style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#fff', margin: '12px 0 14px' }}>
            Let the Stars handle it.
          </h2>
          <p style={{ color: '#b6c6e3', maxWidth: 480, margin: '0 auto 28px' }}>
            Call for same-day service or book online. We serve all of Los Angeles and Ventura County.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+17474631853" className="btn btn-red">Call (747) 463-1853</a>
            <Link href="/booking" className="btn btn-ghost">Book Online</Link>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCallbar />
    </>
  )
}
