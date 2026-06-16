'use client'

import dynamic from 'next/dynamic'
import { City } from '@/lib/city'

const ServiceAreaMap = dynamic(() => import('./ServiceAreaMap'), { ssr: false })

interface ServiceAreaMapClientProps {
  city?: City
}

export default function ServiceAreaMapClient({ city = 'los-angeles' }: ServiceAreaMapClientProps) {
  return <ServiceAreaMap city={city} />
}
