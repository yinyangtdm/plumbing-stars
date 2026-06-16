import { headers } from 'next/headers'

export type City = 'los-angeles' | 'ventura'

export interface CityConfig {
  name: string
  slug: City
  domains: string[]
}

const CITIES: CityConfig[] = [
  {
    name: 'Los Angeles',
    slug: 'los-angeles',
    domains: ['localhost:3001', 'localhost:3000', 'plumbingstars-la.com', 'www.plumbingstars-la.com', 'theplumbingstars.com', 'www.theplumbingstars.com'],
  },
  {
    name: 'Ventura',
    slug: 'ventura',
    domains: ['plumbingstars-ventura.com', 'www.plumbingstars-ventura.com', 'ventura.theplumbingstars.com'],
  },
]

export async function getCurrentCity(): Promise<CityConfig> {
  const h = await headers()
  const host = h.get('host') || ''

  const city = CITIES.find(c => c.domains.some(domain => host.includes(domain)))
  return city || CITIES[0] // Default to LA
}

export function getCityBySlug(slug: City): CityConfig {
  return CITIES.find(c => c.slug === slug) || CITIES[0]
}
