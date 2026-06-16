/**
 * Multi-Domain City Detection
 *
 * One codebase serves two city sites. The active city is resolved from the
 * request hostname so the same components render city-correct content for
 * each domain. See lib/site.ts for business-wide (city-agnostic) constants.
 */

import { headers } from 'next/headers'

export type City = 'los-angeles' | 'ventura'

export interface CityConfig {
  /** Display name, e.g. "Los Angeles" */
  name: string
  /** URL/identifier slug */
  slug: City
  /** Production hostnames that map to this city */
  domains: string[]
}

/** Hostnames used during local development; always resolve to the default city. */
const DEV_HOSTS = ['localhost', '127.0.0.1']

/** The city served when no domain matches (local dev, previews, etc.). */
const DEFAULT_CITY: City = 'los-angeles'

const CITIES: Record<City, CityConfig> = {
  'los-angeles': {
    name: 'Los Angeles',
    slug: 'los-angeles',
    domains: ['plumbingstarslosangeles.com', 'www.plumbingstarslosangeles.com'],
  },
  ventura: {
    name: 'Ventura',
    slug: 'ventura',
    domains: ['plumbingstarsventura.com', 'www.plumbingstarsventura.com'],
  },
}

/**
 * Resolve the active city from the incoming request's hostname.
 * Falls back to the default city for dev hosts and unknown domains.
 */
export async function getCurrentCity(): Promise<CityConfig> {
  const host = (await headers()).get('host') ?? ''

  if (DEV_HOSTS.some(devHost => host.includes(devHost))) {
    return CITIES[DEFAULT_CITY]
  }

  const match = Object.values(CITIES).find(city =>
    city.domains.some(domain => host.includes(domain)),
  )

  return match ?? CITIES[DEFAULT_CITY]
}
