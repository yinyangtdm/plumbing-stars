/**
 * Per-City Metadata Helper
 *
 * Builds page <title>/<description> tags from the active city so each domain
 * serves location-correct SEO metadata instead of a hardcoded city name.
 *
 * Usage in a page:
 *   export function generateMetadata() {
 *     return pageMetadata(city => ({
 *       title: `About — The Plumbing Stars | ${city}`,
 *       description: `Drain & sewer specialists serving ${city}.`,
 *     }))
 *   }
 */

import type { Metadata } from 'next'
import { getCurrentCity } from './city'

export async function pageMetadata(
  build: (cityName: string) => Metadata,
): Promise<Metadata> {
  const city = await getCurrentCity()
  return build(city.name)
}
