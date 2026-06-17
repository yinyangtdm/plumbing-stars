# Ventura Site — Design Spec

**Date:** 2026-06-17
**Status:** Approved for planning

## Goal

Stand up a second website for The Plumbing Stars — a single-page Ventura
County site — in its **own standalone repository**, deployed to its own
domain. The existing Los Angeles site is finished and must not be touched.

The Ventura page is realized from the existing static mockup
`mockup-4-editorial.html` (currently in the LA repo root): an "editorial /
newspaper" design (DM Serif Display + Manrope, paper-cream + navy + muted-red
palette, numbered sections, pull-quote testimonials, colophon footer).

## Context & reality

It is one operator covering two counties with two marketing sites. The
business facts (phone, email, license) are identical to LA. The two sites must
not be near-duplicate content, or local search will suppress one. The Ventura
site therefore reuses LA's *infrastructure patterns* but carries its own
*Ventura-localized content* and its own SEO metadata.

## Decisions (settled during brainstorming)

| Decision | Choice | Why |
|---|---|---|
| Repo strategy | **Separate standalone repo** | LA stays untouched; simplest deploy (new repo → new Vercel project → Ventura domain); strongest isolation; the only downside (duplicated constants) is ~4 values that rarely change |
| Deployment | **Own domain, own Vercel project** | Two markets, two domains; cleanest local-SEO posture |
| Page scope | **Single page, matching the mockup** | Described as a single-page template; anchor-scroll nav; footer/"Read →" links resolve to anchors, not sub-pages |
| Shared code | **Copied, not shared** | Standalone repo; mirror LA's `SITE` constants + mailer with a "keep in sync with LA" comment |
| NAP (name/address/phone) | **Same phone + same email as LA** | One operator; leads tagged "Ventura" so source is identifiable |
| Form delivery | **Email (Tier 2), city-tagged** | Reuse LA's mailer + book/contact route logic; no database |
| Admin / DB | **None** | Out of scope; Ventura is email-only |

### Repo location

New repo at `C:\Users\yinya\PlumbingStarsVentura` (sibling to the LA repo).

## Architecture

A fresh Next.js 15 App Router app (matching LA's stack: React 19, TypeScript
strict, `next/font` for DM Serif Display + Manrope). Structure:

```
PlumbingStarsVentura/
  app/
    layout.tsx          # fonts, metadata, JSON-LD
    page.tsx            # the editorial single page (from mockup-4)
    globals.css         # the mockup's stylesheet, scoped to this site
    api/
      book/route.ts     # mirror of LA book route, Ventura-tagged (the only form)
    sitemap.ts          # Next.js sitemap
    robots.ts           # Next.js robots
  components/
    BookingForm.tsx     # the inline booking card, made real (client component)
  lib/
    site.ts             # SITE constants — MIRROR of LA, marked "keep in sync"
    mailer.ts           # MIRROR of LA mailer
  public/
    logo.svg            # copied from LA
  package.json
  tsconfig.json
  next.config.ts
```

### Reused-by-copy from LA (mirrors, with sync comments)

- **`lib/site.ts`** — `SITE` object verbatim from LA: name "The Plumbing
  Stars", phone `(747) 463-1853`, email `info@theplumbingstars.com`, license
  `998456`, hours, rating `4.9`, reviewCount `2,400+`, years `25+`.
  Header comment: "Mirror of the LA site's lib/site.ts. Same business — keep
  phone/email/license in sync across both repos."
  Adds one Ventura-specific field: `googleReviewsUrl` (the operator's real
  Google reviews link; placeholder until supplied — see Testimonials section).
- **`lib/mailer.ts`** — verbatim from LA: `isEmailConfigured()`,
  `leadRecipient()` (uses `BOOKING_TO` → falls back to `SITE.email`),
  `sendLeadEmail(subject, html)` over Gmail. Same `GMAIL_USER` /
  `GMAIL_APP_PASSWORD` / `BOOKING_TO` env vars.

### The single page (`app/page.tsx` + `globals.css`)

Direct port of `mockup-4-editorial.html`:

- Static sections become server-rendered markup: utility bar, header (with a
  client island for the mobile drawer toggle), masthead/hero, info strip,
  services index (I–VI), feature/about, method, pull-quote testimonials,
  appointment section (the booking card), footer, fixed callbar, mobile drawer.
- The mockup's inline `<style>` becomes `app/globals.css` unchanged in spirit
  (CSS custom properties + classes). No inline styles in components (matches
  LA convention).
- The drawer open/close (mockup uses inline `onclick`) becomes a small
  `'use client'` interaction, mirroring LA's `Header` drawer pattern.
- Business facts (phone display/href, license, rating) are pulled from
  `SITE`, not hardcoded — even though copied, this keeps one source per repo.
  The mockup's placeholder `(888) 555·STAR` and
  `hello@plumbingstars.example` are replaced with the real `SITE` values.

### Navigation animation & scroll polish

The page is a single scroller with anchor nav (`#services`, `#about`, etc.).
Polished behavior:

- **Smooth section jump** — clicking a nav/drawer link glides to the section.
  Implemented with CSS `scroll-behavior: smooth` plus `scroll-margin-top` on
  each section target equal to the sticky header height, so the section lands
  just below the header instead of being hidden under it.
- **Scroll-spy active link** — a small `'use client'` component uses
  `IntersectionObserver` to track which section is in view and applies an
  `active` class to the matching desktop nav link (e.g. the existing red
  underline/number accent in the mockup), updating live as the user scrolls.
- **Back-to-top button** — a fixed button that:
  - is hidden at the top and **fades/slides in after the user scrolls past a
    threshold** (~one viewport), via a scroll listener (rAF-throttled) toggling
    a `visible` class;
  - smooth-scrolls to the top on click;
  - is positioned bottom-right on desktop and **offset above the fixed mobile
    callbar** on small screens so the two never overlap;
  - matches the editorial styling (navy/cream, square corners, serif accent).
- **Reduced motion** — all of the above are gated by
  `@media (prefers-reduced-motion: reduce)`: smooth scrolling falls back to
  instant jumps and the button appears without animation, for accessibility.

### Testimonials section — no fake reviews

The mockup's "Field Notes" pull-quote testimonials are **placeholders, not
real reviews**. Fabricated testimonials are an SEO liability (and an FTC
problem for the operator), and on-page quotes do not drive ranking — Google's
review signals come from the Google Business Profile, not site text.

Therefore: **keep the section's editorial layout, but replace the fake quotes
with an honest "read our reviews on Google" call-to-action** that links to the
operator's real Google Business Profile / reviews URL.

- Replace the four fabricated `<blockquote>` testimonials with a single
  neutral block inviting visitors to read verified reviews on Google.
- The Google reviews URL lives in `lib/site.ts` as `SITE.googleReviewsUrl`.
  If the operator hasn't supplied it yet, use a clearly-marked placeholder
  constant (commented "replace with real Google reviews link before launch")
  so the build is not blocked — it is a one-line swap later.
- **No `Review` / `AggregateRating` JSON-LD.** Only `LocalBusiness` (see SEO
  section). Review structured data with invented values violates Google policy
  and risks a manual penalty.

### The booking form, made real (`components/BookingForm.tsx`)

The mockup's form is fake (`alert('just for show')`). Replace with a real
client component modeled on LA's `ContactForm` / `BookingForm` flow:

- Fields per the mockup card: **Name**, **Mobile**, **Address or ZIP**,
  **Concerning** (service `<select>`). Required: name, mobile, address,
  service (matches LA book route's required set: name, phone, address,
  service).
- Submits JSON to `/api/book`; shows sending / success / error states like
  LA's forms (success message + "Call {phone}" fallback).

### The API routes (Ventura-tagged)

Mirror LA's `app/api/book/route.ts` and (if a contact path is kept)
`app/api/contact/route.ts`, with one change: **city tagging** so the operator
knows which site a lead came from.

- Email **subject** prefixed/suffixed with Ventura, e.g.
  `New Booking Request (Ventura) — {name} ({service})`.
- Email **body** header reads "The Plumbing Stars — Ventura" instead of the
  generic site label.
- Same graceful-degradation behavior as LA: if email isn't configured, log the
  lead to the server console rather than lose it; never hard-fail the user.
- No database branch (LA's Tier-3 DB code is omitted — Ventura is email-only).

## SEO (first-class scope — the mockup has none)

These are the levers that actually matter for a local-service second domain,
and the reason structure was deemed SEO-irrelevant (Google sees URLs/HTML, not
repos). Required:

1. **Distinct, localized metadata** — title/description/H1 naming **Ventura
   County**. Page `<title>` e.g. "The Plumbing Stars — Sewer & Drain
   Specialists | Ventura County".
2. **Avoid duplicate content** — localize all copy to Ventura. Hero byline
   "Los Angeles, USA" → Ventura County. Service-area / "neighbors" language
   localized to Ventura County cities (Ventura, Oxnard, Thousand Oaks,
   Camarillo, Simi Valley, and similar). (The testimonials' LA city names are
   moot — that section is being replaced; see "Testimonials section".)
3. **Self-referencing canonical** — `<link rel="canonical">` to the Ventura
   domain so the two domains never claim each other's content.
4. **`LocalBusiness` JSON-LD** — one structured-data block with the business
   NAP and `areaServed: Ventura County` (+ the target cities). Highest
   value-per-effort local-SEO item.
5. **`sitemap.xml` + `robots.txt`** — via Next's `app/sitemap.ts` /
   `app/robots.ts`.
6. **Server-rendered, mobile-first** — inherent to Next + the mockup; no extra
   work, just don't regress it.

Off-site SEO (Google Business Profile, directory listings, NAP consistency
across the web) is the **operator's** responsibility, not part of this build.

## Environment variables

Ventura repo's `.env.local` (gitignored), same scheme as LA:

- `GMAIL_USER`, `GMAIL_APP_PASSWORD` — enable lead emails
- `BOOKING_TO` — lead recipient (defaults to `SITE.email`)
- `NEXT_PUBLIC_SITE_URL` (or equivalent) — canonical base URL for the Ventura
  domain, used by canonical tag + sitemap

No `DATABASE_URL`, no auth/admin vars (out of scope).

## Out of scope

- Any change to the LA site/repo (beyond this spec doc living there).
- Admin panel, database, FAQ management.
- Sub-pages (`/services`, `/about`, `/booking`) — single page only.
- A separate Ventura phone/email (same as LA by decision).
- Off-site SEO setup (operator's job).

## Success criteria

1. New standalone repo builds (`npm run build`) with no type errors.
2. The single page renders the editorial mockup faithfully (desktop + mobile),
   using real `SITE` business facts.
3. Submitting the booking form sends a Ventura-tagged lead email when email
   env vars are set; logs (does not lose) the lead when they aren't; never
   hard-fails the visitor.
4. Page ships localized Ventura copy (no LA city names), no fabricated reviews
   (testimonial section links to real Google reviews), distinct metadata,
   self-canonical, `LocalBusiness` JSON-LD only (no review schema), sitemap,
   and robots.
5. LA repo is byte-for-byte unaffected (other than this spec file).
6. Deployable as its own Vercel project pointed at the Ventura domain.
