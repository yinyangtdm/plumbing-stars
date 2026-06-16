import Link from 'next/link'
import HeaderWrapper from '@/components/HeaderWrapper'
import Footer from '@/components/Footer'
import MobileCallbar from '@/components/MobileCallbar'

export const metadata = {
  title: 'Drain & Sewer Services — The Plumbing Stars | Los Angeles',
  description: 'Drain cleaning, sewer line repair, hydro jetting, camera inspection, pipe lining & trenchless replacement. Flat-rate pricing, written guarantee.',
}

const SERVICES = [
  {
    num: '01',
    title: 'Drain Cleaning',
    intro: 'Clogged drain? We clear kitchen sinks, bathroom drains, laundry lines, and main sewer lines at a flat price — with a 30-day guarantee.',
    how: 'Our tech runs an electric auger through the affected drain to break up and pull out the clog. For stubborn blockages, we follow up with a high-flow flush. The job is usually complete within an hour, and you get a written 30-day guarantee — if it backs up again, we return at no charge.',
    tags: ['Same-Day Available', 'Flat-Rate Pricing', '30-Day Guarantee'],
  },
  {
    num: '02',
    title: 'Sewer Line Repair',
    intro: 'Cracked, offset, or fully collapsed sewer pipe? We do targeted spot repairs and full line replacements — always with camera diagnosis first.',
    how: "We start every sewer repair with a camera inspection so you see exactly what's wrong before any shovels come out. For spot repairs, we excavate only the affected section. For full-line replacements, we can go traditional trench or no-dig depending on your yard. Every repair includes a written warranty.",
    tags: ['Camera Diagnosis Included', 'Spot Repair Available', 'Written Warranty'],
  },
  {
    num: '03',
    title: 'Hydro Jetting',
    intro: 'The strongest drain cleaning available. High-pressure water blasts roots, grease, scale, and debris out of the pipe entirely — not just through it.',
    how: 'A specialized jetting nozzle pushes water at up to 4,000 PSI through your sewer or drain line, cutting through root intrusion, heavy grease buildup, and mineral scale. Unlike snaking, which punches a hole through a clog, hydro jetting cleans the entire interior wall of the pipe back to near-original flow capacity.',
    tags: ['Up to 4,000 PSI', 'Root & Grease Removal', 'Full Pipe-Wall Clean'],
  },
  {
    num: '04',
    title: 'Camera Inspection',
    intro: "See exactly what's in your sewer line before buying or before a big repair. HD video, recorded and sent to you.",
    how: "We insert a waterproof HD camera on a flexible push rod into your sewer line from a cleanout or toilet. The live feed shows us every crack, offset joint, root intrusion, or blockage in real time. We record the full inspection and give you the footage — useful for real estate transactions, insurance claims, or simply knowing what you're dealing with before a repair.",
    tags: ['HD Video Recording', 'Full Report Provided', 'Pre-Purchase Inspections'],
  },
  {
    num: '05',
    title: 'Pipe Lining (CIPP)',
    intro: 'A new pipe inside your old one — with zero excavation. Cured-in-place pipelining is the gold standard for trenchless sewer repair.',
    how: 'A flexible felt liner saturated with epoxy resin is pulled into the damaged pipe, then inflated against the interior wall and held in place while the resin cures. Once cured, the result is a smooth, seamless new pipe that typically carries a 50-year design life. Your landscaping, driveway, and foundation stay untouched.',
    tags: ['No Excavation', '50-Year Design Life', 'Root & Crack Repair'],
  },
  {
    num: '06',
    title: 'Trenchless Replacement',
    intro: 'When a pipe is too far gone to line, pipe bursting replaces it entirely — without digging up your yard.',
    how: 'A hydraulic bursting head is pulled through the old pipe, shattering it outward while simultaneously pulling a new HDPE pipe into place behind it. The new pipe is seamless, corrosion-proof, and rated for 100+ years. Entry and exit pits at each end of the run are the only excavation required — your lawn, driveway, and concrete stay intact.',
    tags: ['No-Dig Replacement', 'HDPE Pipe (100-yr rated)', 'Lawn & Driveway Safe'],
  },
]

export default function ServicesPage() {
  return (
    <>
      <HeaderWrapper />

      <section className="page-hero">
        <div className="chev" />
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--sky)' }}>What We Do</div>
          <h1>Every drain &amp; sewer<br /><span className="out">service</span> you need.</h1>
          <p className="page-hero-sub">Flat-rate pricing. Written guarantee. Same-day available. Licensed tech every time.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="service-detail-grid">
            {SERVICES.map(svc => (
              <article className="service-detail-card" key={svc.num}>
                <div className="service-detail-body">
                  <span className="svc-num">SVC {svc.num}</span>
                  <h3>{svc.title}</h3>
                  <p style={{ fontWeight: 600, color: '#1a2a4a' }}>{svc.intro}</p>
                  <p>
                    <strong style={{ fontFamily: 'var(--font-barlow-condensed)', textTransform: 'uppercase', letterSpacing: '.1em', fontSize: 13, color: 'var(--blue)' }}>
                      How It Works
                    </strong>
                    <br />{svc.how}
                  </p>
                  <Link href="/booking" className="btn btn-red" style={{ marginTop: 8 }}>Book This Service</Link>
                </div>
                <div className="service-detail-meta">
                  {svc.tags.map(tag => (
                    <div className="meta-item" key={tag}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M3 12l4 4L21 4" />
                      </svg>
                      {tag}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="chev" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="section-head" style={{ marginBottom: 40 }}>
            <div className="eyebrow" style={{ color: 'var(--sky)' }}>Special Offers</div>
            <h2 style={{ color: '#fff' }}>Flat rates. <span style={{ color: 'var(--red)' }}>Real guarantees.</span></h2>
          </div>
          <div className="deals-grid">
            <div className="promo-ticket">
              <div className="ribbon">NO CLEAR = NO CHARGE</div>
              <div className="ptop">Drain Cleaning Guarantee</div>
              <h4>Main-Line Drain Cleaning</h4>
              <div className="price">$93</div>
              <div className="fine">If we can&apos;t unclog your drain, you pay nothing — no service fee, no trip charge. Applies to standard main-line drain cleaning. Limit one per household.</div>
              <div style={{ marginTop: 18 }}>
                <a href="tel:+17474631853" className="btn btn-red" style={{ width: '100%' }}>Claim by Phone</a>
              </div>
            </div>
            <div className="promo-ticket" style={{ borderLeftColor: 'var(--blue)' }}>
              <div className="ribbon" style={{ background: 'var(--red)' }}>HD VIDEO INCLUDED</div>
              <div className="ptop" style={{ color: 'var(--blue)' }}>Sewer Camera Inspection</div>
              <h4>Full Sewer Line Inspection</h4>
              <div className="price" style={{ color: 'var(--blue)' }}>$250</div>
              <div className="fine">HD video down your entire sewer line — we record it and send you the footage. Know exactly what&apos;s wrong before you spend a dollar on repairs. Includes written findings report.</div>
              <div style={{ marginTop: 18 }}>
                <Link href="/booking" className="btn btn-blue" style={{ width: '100%' }}>Book Inspection</Link>
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
