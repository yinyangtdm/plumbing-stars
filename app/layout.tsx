import { Anton, Barlow, Barlow_Condensed } from 'next/font/google'
import { pageMetadata } from '@/lib/metadata'
import './globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})
const barlow = Barlow({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
})
const barlowCondensed = Barlow_Condensed({
  weight: ['500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

export function generateMetadata() {
  return pageMetadata(city => ({
    title: `The Plumbing Stars — Drain & Sewer Experts | ${city}`,
    description:
      `Licensed drain and sewer specialists serving ${city}. 25+ years experience, ` +
      '24/7 emergency service, flat-rate pricing, written guarantee on every job.',
  }))
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${anton.variable} ${barlow.variable} ${barlowCondensed.variable}`}>
        {children}
      </body>
    </html>
  )
}
