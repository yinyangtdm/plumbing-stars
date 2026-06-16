import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MobileCallbar from '@/components/MobileCallbar'

export const metadata = {
  title: 'Service Areas — The Plumbing Stars | LA & Ventura County',
  description: 'The Plumbing Stars serves all of Los Angeles and Ventura County. Drain cleaning, sewer repair, hydro jetting — same-day available.',
}

const LA_AREAS = [
  'Los Angeles', 'Hollywood', 'Burbank', 'Glendale', 'Pasadena',
  'Sherman Oaks', 'Studio City', 'Van Nuys', 'Northridge', 'Encino',
  'Woodland Hills', 'Reseda', 'North Hollywood', 'Culver City', 'Santa Monica',
  'West Hollywood', 'Silver Lake', 'Atwater Village', 'Eagle Rock', 'Alhambra',
  'Arcadia', 'Monrovia', 'Long Beach', 'Torrance', 'El Monte',
  'Covina', 'West Covina', 'Whittier', 'Norwalk', 'Downey',
]

const VENTURA_AREAS = [
  'Oxnard', 'Ventura', 'Thousand Oaks', 'Camarillo', 'Simi Valley',
  'Moorpark', 'Newbury Park', 'Westlake Village', 'Oak Park', 'Agoura Hills',
  'Port Hueneme', 'Santa Paula', 'Fillmore', 'Ojai', 'Calabasas',
]

export default function ServiceAreasPage() {
  return (
    <>
      <Header />

      <section className="page-hero">
        <div className="chev" />
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--sky)' }}>Southern California</div>
          <h1>We Come <span className="out">To</span><br />You.</h1>
          <p className="page-hero-sub">Serving Los Angeles and Ventura County — same-day available, no extra charge for most zip codes.</p>
        </div>
      </section>

      <section className="section lt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Coverage Area</div>
            <h2>From the Valley to <span className="accent">the Coast.</span></h2>
            <p>Two service zones. One licensed, flat-rate, guarantee-backed team. Call to confirm same-day availability in your city.</p>
          </div>

          <div className="areas-grid">
            <div className="area-card">
              <h3>Los Angeles County</h3>
              <div className="area-sub">plumbingstarslosangeles.com</div>
              <ul className="area-neighborhoods">
                {LA_AREAS.map(city => <li key={city}>{city}</li>)}
              </ul>
            </div>
            <div className="area-card">
              <h3>Ventura County</h3>
              <div className="area-sub">plumbingstarsventura.com</div>
              <ul className="area-neighborhoods">
                {VENTURA_AREAS.map(city => <li key={city}>{city}</li>)}
              </ul>
              <p style={{ marginTop: 20, fontSize: 13, color: '#5a6a86', fontStyle: 'italic' }}>
                Don&apos;t see your city? Call us — our coverage is always expanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="chev" />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div className="eyebrow" style={{ color: 'var(--sky)' }}>Same-Day Service</div>
          <h2 style={{ fontSize: 'clamp(36px, 6vw, 64px)', color: '#fff', margin: '12px 0 14px' }}>
            In your neighborhood<br /><span style={{ color: 'var(--red)' }}>today.</span>
          </h2>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+18885557827" className="btn btn-red">Call (888) 555-7827</a>
            <Link href="/booking" className="btn btn-ghost">Book Online</Link>
          </div>
        </div>
      </section>

      <Footer />
      <MobileCallbar />
    </>
  )
}
