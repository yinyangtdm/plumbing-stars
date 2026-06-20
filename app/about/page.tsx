import Link from 'next/link'
import HeaderWrapper from '@/components/HeaderWrapper'
import Footer from '@/components/Footer'
import MobileCallbar from '@/components/MobileCallbar'
import { pageMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/site'
import { CITY } from '@/lib/city'

export function generateMetadata() {
  return pageMetadata(city => ({
    title: `About Us — The Plumbing Stars | ${city} Sewer & Drain`,
    description: `Family-owned drain & sewer specialists serving ${city} for ${SITE.yearsInBusiness} years. CA Contractor License #${SITE.license}. Licensed, bonded & insured.`,
    alternates: { canonical: '/about' },
  }))
}

export default function AboutPage() {
  const city = CITY
  return (
    <>
      <HeaderWrapper />

      <section className="page-hero">
        <div className="chev" />
        <div className="container">
          <div className="eyebrow eyebrow-light">Est. 2001 · {city.name}</div>
          <h1>The Stars <span className="out">Behind</span><br />The Drain.</h1>
          <p className="page-hero-sub">Family-owned. California-licensed. 25 years fixing the drains other plumbers won&apos;t touch.</p>
        </div>
      </section>

      <section className="section lt">
        <div className="container">
          <div className="about-story-grid">
            <div>
              <div className="eyebrow">Our Story</div>
              <h2 className="about-story-title">
                Built on the <span className="text-red">streets of LA.</span>
              </h2>
              <p className="story-text">
                The Plumbing Stars started in 2001 with one truck and one promise: show up on time, fix it right, and never leave a homeowner guessing about the price. Two and a half decades later, that&apos;s still how we run every job.
              </p>
              <p className="story-text">
                We specialize in drain and sewer work — the dirty jobs most plumbers would rather skip. It&apos;s not glamorous, but when your main line backs up at midnight, you want someone who has seen it a thousand times. We have.
              </p>
              <p className="story-text mb-24">
                We bring the same licensed, flat-rate, guarantee-backed service that has made us a trusted name across LA.
              </p>
              <div className="btn-row">
                <a href={SITE.phone.href} className="btn btn-red">Call {SITE.phone.display}</a>
                <Link href="/booking" className="btn btn-blue">Book Online</Link>
              </div>
            </div>
            <div>
              <div className="cred-card">
                <div className="cred-inner">
                  <div className="eyebrow eyebrow-light mb-16">License &amp; Credentials</div>
                  <ul className="cred-list">
                    {[
                      `CA Contractor License #${SITE.license}`,
                      'Licensed & Bonded — State of California',
                      `25+ Years Serving ${city.name}`,
                      '24/7 Emergency Dispatch',
                      'Family-Owned &amp; Operated',
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
                      Highly Rated on Google
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
        <div className="container section-cta-center">
          <div className="eyebrow eyebrow-light">Ready to book?</div>
          <h2 className="cta-title">
            Let the Stars handle it.
          </h2>
          <p className="cta-sub">
            Call for same-day service or book online. We serve all of Los Angeles and Ventura County.
          </p>
          <div className="btn-row-center">
            <a href={SITE.phone.href} className="btn btn-red">Call {SITE.phone.display}</a>
            <Link href="/booking" className="btn btn-ghost">Book Online</Link>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCallbar />
    </>
  )
}
