import Link from 'next/link'
import HeaderWrapper from '@/components/HeaderWrapper'
import Footer from '@/components/Footer'
import MobileCallbar from '@/components/MobileCallbar'
import ServiceAreaMapClientWrapper from '@/components/ServiceAreaMapClientWrapper'
import { CITY } from '@/lib/city'
import { pageMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/site'

export function generateMetadata() {
  return pageMetadata(city => ({
    title: `Service Areas — The Plumbing Stars | ${city} County`,
    description: `The Plumbing Stars covers everything north of the 10 and west of the 110 — the San Fernando Valley, the Westside, Central LA, and the foothills up to La Crescenta, La Cañada, Altadena and Pasadena. Drain cleaning, sewer repair, hydro jetting — same-day available.`,
    alternates: { canonical: '/service-areas' },
  }))
}

const VALLEY_AREAS = [
  'Westlake Village', 'Agoura Hills', 'Calabasas', 'Hidden Hills', 'Bell Canyon',
  'West Hills', 'Woodland Hills', 'Canoga Park',
  'Winnetka', 'Chatsworth', 'Northridge', 'Porter Ranch', 'Granada Hills',
  'Mission Hills', 'North Hills', 'Sylmar', 'San Fernando', 'Pacoima',
  'Arleta', 'Panorama City', 'Sun Valley', 'Sunland-Tujunga', 'Reseda',
  'Lake Balboa', 'Tarzana', 'Encino', 'Van Nuys', 'Valley Glen',
  'Sherman Oaks', 'Studio City', 'Valley Village', 'North Hollywood', 'Toluca Lake',
]

const WEST_AREAS = [
  'Malibu', 'Topanga', 'Pacific Palisades', 'Brentwood', 'Santa Monica', 'Westwood', 'Bel Air',
  'Holmby Hills', 'Beverly Hills', 'Century City', 'West Los Angeles', 'Sawtelle',
  'Rancho Park', 'Cheviot Hills', 'Palms', 'Culver City', 'Venice', 'Mar Vista',
  'West Hollywood', 'Hollywood', 'East Hollywood', 'Los Feliz', 'Silver Lake',
  'Echo Park', 'Hancock Park', 'Larchmont', 'Fairfax', 'Mid-Wilshire',
  'Koreatown', 'Mid-City',
]

const EAST_AREAS = [
  'Glendale', 'Burbank', 'La Cañada Flintridge', 'La Crescenta', 'Montrose',
  'Altadena', 'Pasadena', 'South Pasadena', 'Eagle Rock', 'Highland Park',
  'Mount Washington', 'Glassell Park', 'Cypress Park', 'Atwater Village',
]

export default function ServiceAreasPage() {
  const city = CITY

  return (
    <>
      <HeaderWrapper />

      <section className="section lt">
        <div className="container">
          <div className="section-head">
            <div className="eyebrow">Coverage Area</div>
            <h1>{city.name} <span className="accent">Service Areas.</span></h1>
            <p>We cover everything north of the 10 and west of the 110 — north to the foothills of La Crescenta, La Cañada Flintridge, Altadena and Pasadena, and everything west of there to the Ventura county line: the whole San Fernando Valley, the Westside, and Central LA. Same-day available, no extra charge for most zip codes.</p>
          </div>

          <div className="areas-grid">
            <div className="area-card">
              <h3>San Fernando Valley</h3>
              <div className="area-sub">Same-day service</div>
              <ul className="area-neighborhoods">
                {VALLEY_AREAS.map(area => <li key={area}>{area}</li>)}
              </ul>
            </div>
            <div className="area-card">
              <h3>Westside &amp; Central LA</h3>
              <div className="area-sub">Beverly Hills, Hollywood &amp; the Westside</div>
              <ul className="area-neighborhoods">
                {WEST_AREAS.map(area => <li key={area}>{area}</li>)}
              </ul>
            </div>
            <div className="area-card">
              <h3>Eastside &amp; Pasadena</h3>
              <div className="area-sub">Glendale, Burbank &amp; the foothills</div>
              <ul className="area-neighborhoods">
                {EAST_AREAS.map(area => <li key={area}>{area}</li>)}
              </ul>
              <p className="area-note">
                Don&apos;t see your city? Call us — our coverage is always expanding.
              </p>
            </div>
          </div>

          <div className="mt-50">
            <ServiceAreaMapClientWrapper />
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="chev" />
        <div className="container section-cta-center">
          <div className="eyebrow eyebrow-light">Same-Day Service</div>
          <h2 className="cta-title">
            In your neighborhood<br /><span className="text-red">today.</span>
          </h2>
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
