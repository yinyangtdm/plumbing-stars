import { DM_Serif_Display, Manrope } from 'next/font/google'
import { pageMetadata } from '@/lib/metadata'
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
      <body className={`${dmSerif.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  )
}
