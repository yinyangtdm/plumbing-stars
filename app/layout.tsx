import { DM_Serif_Display, Manrope } from 'next/font/google'
import { pageMetadata } from '@/lib/metadata'
import { SITE } from '@/lib/site'
import './globals.css'

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://plumbingstarslosangeles.com'

export function generateMetadata() {
  return pageMetadata(city => ({
    metadataBase: new URL(SITE_URL),
    title: `The Plumbing Stars — Drain & Sewer Experts | ${city}`,
    description:
      `Licensed drain and sewer specialists serving ${city}. 25+ years experience, ` +
      '24/7 emergency service, flat-rate pricing, written guarantee on every job.',
    alternates: { canonical: '/' },
    openGraph: {
      title: `The Plumbing Stars — Drain & Sewer Experts | ${city}`,
      description:
        `Licensed drain and sewer specialists serving ${city}. 24/7 emergency ` +
        'service, flat-rate pricing, written guarantee.',
      url: SITE_URL,
      siteName: 'The Plumbing Stars',
      locale: 'en_US',
      type: 'website',
    },
  }))
}

/** LocalBusiness structured data — high-value local-SEO signal. */
function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    name: `${SITE.name} — Los Angeles`,
    telephone: SITE.phone.display,
    email: SITE.email.display,
    url: SITE_URL,
    image: `${SITE_URL}/logo.svg`,
    priceRange: '$$',
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Los Angeles County' },
      { '@type': 'City', name: 'Los Angeles' },
      { '@type': 'City', name: 'Pasadena' },
      { '@type': 'City', name: 'Burbank' },
      { '@type': 'City', name: 'Glendale' },
      { '@type': 'City', name: 'Santa Monica' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
      </head>
      <body className={`${dmSerif.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  )
}
