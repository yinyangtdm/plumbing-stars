import Link from 'next/link'
import HeaderWrapper from '@/components/HeaderWrapper'
import Footer from '@/components/Footer'
import MobileCallbar from '@/components/MobileCallbar'
import ServiceAreaMapClientWrapper from '@/components/ServiceAreaMapClientWrapper'
import { getCurrentCity } from '@/lib/city'

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

export default async function ServiceAreasPage() {
  const city = await getCurrentCity()
  const isLA = city.slug === 'los-angeles'
  const areas = isLA ? LA_AREAS : VENTURA_AREAS

  return (
    <>
      <HeaderWrapper />

      <section className="page-hero">
        <div className="chev" />
        <div className="container">
          <div className="eyebrow" style={{ color: 'var(--sky)' }}>{isLA ? 'Los Angeles County' : 'Ventura County'}</div>
          <h1>We Come <span className="out">To</span><br />You.</h1>
          <p className="page-hero-sub">Serving {city.name} County — same-day available, no extra charge for most zip codes.</p>
        </div>
      </section>

      <section className="section lt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Coverage Area</div>
            <h2>{city.name} <span className="accent">Service Areas.</span></h2>
            <p>We serve all neighborhoods in {city.name} County. Call to confirm same-day availability in your city.</p>
          </div>

          <div className="areas-grid">
            <div className="area-card">
              <h3>{isLA ? 'Los Angeles' : 'Ventura'} County</h3>
              <div className="area-sub">plumbingstars{isLA ? 'losangeles' : 'ventura'}.com</div>
              <ul className="area-neighborhoods">
                {areas.map(area => <li key={area}>{area}</li>)}
              </ul>
              <p style={{ marginTop: 20, fontSize: 13, color: '#5a6a86', fontStyle: 'italic' }}>
                Don&apos;t see your city? Call us — our coverage is always expanding.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 50 }}>
            <ServiceAreaMapClientWrapper />
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
