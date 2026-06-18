import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://plumbingstarslosangeles.com'

/** Public, indexable routes. Admin and API are excluded (see robots.ts). */
const ROUTES = ['', '/about', '/services', '/service-areas', '/contact', '/booking']

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: path === '' ? 'monthly' : 'yearly',
    priority: path === '' ? 1 : 0.7,
  }))
}
