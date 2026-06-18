import HeaderWrapper from '@/components/HeaderWrapper'
import Footer from '@/components/Footer'
import MobileCallbar from '@/components/MobileCallbar'
import BookingForm from './BookingForm'
import { pageMetadata } from '@/lib/metadata'

export function generateMetadata() {
  return pageMetadata(city => ({
    title: `Book a Visit — The Plumbing Stars | ${city}`,
    description: `Schedule drain & sewer service in ${city}. Fast follow-up, free estimates, flat-rate pricing, and a written guarantee.`,
    alternates: { canonical: '/booking' },
  }))
}

export default function BookingPage() {
  return (
    <>
      <HeaderWrapper />
      <BookingForm />
      <Footer />
      <MobileCallbar />
    </>
  )
}
