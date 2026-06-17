import type { Metadata } from 'next'
import { CITY } from './city'

export function pageMetadata(build: (cityName: string) => Metadata): Metadata {
  return build(CITY.name)
}
