/**
 * Site Configuration — Single Source of Truth
 *
 * All business-wide constants live here. Never hardcode a phone number,
 * email, or license number in a component — import it from this file so
 * there is exactly one place to update when the business details change.
 */

const PHONE_DIGITS = '7474631853'

export const SITE = {
  /** Company name as displayed throughout the site */
  name: 'The Plumbing Stars',

  /** Primary contact phone, in display and tel:-href formats */
  phone: {
    display: '(747) 463-1853',
    href: `tel:+1${PHONE_DIGITS}`,
  },

  /** Contact email, in display and mailto:-href formats */
  email: {
    display: 'info@theplumbingstars.com',
    href: 'mailto:info@theplumbingstars.com',
  },

  /** California contractor license number */
  license: '998456',

  /** Operating hours summary */
  hours: '24 / 7 · 365 Days a Year',

  /** Social proof metrics (kept in one place for consistency) */
  rating: '4.9',
  reviewCount: '2,400+',
  yearsInBusiness: '25+',
} as const
