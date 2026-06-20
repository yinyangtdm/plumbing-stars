# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Next.js dev server (http://localhost:3000)
npm run build    # Production build (also the canonical typecheck — there is no separate lint/test setup)
npm run start    # Serve the production build
```

There is no test suite, linter, or CI configured. `npm run build` is the only verification gate — run it to catch type errors before claiming work compiles. TypeScript is `strict`.

## What this is

Marketing + lead-capture site for "The Plumbing Stars," a Los Angeles plumbing business. Next.js 15 (App Router), React 19, TypeScript. Public pages drive visitors to two conversion forms (contact + booking); a password-protected `/admin` area lets the owner review leads and edit FAQs.

This was historically a multi-domain (LA + Ventura) codebase; it is now **LA-only, single repo** (see commit `76f1646`). Any auto-memory mentioning a multi-domain setup is stale — `lib/city.ts` is hardcoded to Los Angeles and is the source of truth.

## Architecture

### Graceful degradation by configuration tier
The defining design principle: the site runs at three escalating capability tiers depending on which environment variables are set, and **never hard-fails when a tier is unconfigured**.

- **Tier 1 (always works):** Static marketing pages render with no env vars at all.
- **Tier 2 (email):** When `GMAIL_USER` + `GMAIL_APP_PASSWORD` are set, form submissions email the lead to `BOOKING_TO` (falls back to the site email). See [lib/mailer.ts](lib/mailer.ts) — `isEmailConfigured()` gates this.
- **Tier 3 (database):** When `DATABASE_URL` points at a real Neon endpoint (not the `host.neon.tech` placeholder), bookings are also persisted and become visible in the admin panel. See [lib/db.ts](lib/db.ts) — `isDbConfigured()` gates this; `initDb()` lazily creates the `bookings` and `faqs` tables on first use (no migration step).

The booking route [app/api/book/route.ts](app/api/book/route.ts) is the reference for this pattern: it tries DB, then email, and if **both** are unconfigured/fail it logs the lead to the server console so it's never silently lost. When adding a lead-handling path, preserve this fallback chain — guard every DB/email call behind its `is*Configured()` check.

### Single source of truth for business constants
[lib/site.ts](lib/site.ts) (`SITE`) holds phone, email, license, ratings, hours. [lib/city.ts](lib/city.ts) (`CITY`) holds the city name/slug. **Never hardcode a phone number, email, or city name in a component** — import from these. City name flows into page titles/descriptions via the `pageMetadata(city => ...)` helper in [lib/metadata.ts](lib/metadata.ts), which `generateMetadata` functions wrap so copy stays city-parameterized.

### Auth (next-auth v5 beta)
Three-file split — keep them in sync when touching auth:
- [auth.config.ts](auth.config.ts) — edge-safe config (pages, `authorized` callback, redirects). No Node-only deps so it can run in middleware.
- [auth.ts](auth.ts) — full config with the Credentials provider + bcrypt. Single hardcoded admin from `ADMIN_EMAIL` and either `ADMIN_PASSWORD_HASH` (bcrypt) or `ADMIN_PASSWORD` (plaintext fallback).
- [middleware.ts](middleware.ts) — protects `/admin/:path*` using the edge config.

Admin API routes ([app/api/admin/](app/api/admin/)) independently re-check `await auth()` and return 401 — middleware is not the only gate.

### Client/server component boundaries
RSC is the default. Two recurring patterns for client-only code:
- **Wrapper re-exports** like [components/HeaderWrapper.tsx](components/HeaderWrapper.tsx) and [components/ServiceAreaMapClientWrapper.tsx](components/ServiceAreaMapClientWrapper.tsx) (`export { default } from './X'`) exist to cross the RSC→client boundary cleanly. Import the wrapper from server components.
- **Leaflet map** ([components/ServiceAreaMap.tsx](components/ServiceAreaMap.tsx)) is `'use client'`, dynamically `import('leaflet')` inside `useEffect`, and manually clears stale `_leaflet_id` to survive React StrictMode double-mounting. Leaflet CSS is loaded via a `<link>` tag, not an import. Its geometry comes from [lib/serviceArea.ts](lib/serviceArea.ts) (the approximate coverage polygon — "north of the 10, west of the 110") and [lib/countyBorders.ts](lib/countyBorders.ts) (real Census county outlines). `countyBorders.ts` still exports `VENTURA_COUNTY_GEO` — that's a map *context* border, not LA-only drift.

### Styling
All styling is one global stylesheet, [app/globals.css](app/globals.css) — no CSS Modules, no Tailwind, no inline styles in components (a prior migration removed inline styles deliberately; don't reintroduce them). It has a numbered table-of-contents header and CSS custom properties for the editorial navy/red palette. Fonts are `DM_Serif_Display` (display) + `Manrope` (body) via `next/font`, exposed as `--font-display` / `--font-body`.

## Environment variables

Set in `.env.local` (gitignored — contains live secrets, not tracked). Everything is optional; absence just lowers the capability tier.

- `GMAIL_USER`, `GMAIL_APP_PASSWORD` — enable lead emails (Tier 2)
- `BOOKING_TO` — where leads are sent (defaults to `SITE.email`)
- `DATABASE_URL` — Neon Postgres connection (Tier 3); placeholder `host.neon.tech` counts as unconfigured
- `ADMIN_EMAIL` + (`ADMIN_PASSWORD_HASH` or `ADMIN_PASSWORD`) — admin login
- `AUTH_SECRET` — required by next-auth in production

## Conventions

- Path alias `@/*` maps to the repo root (e.g. `@/lib/site`, `@/auth`).
- Existing components carry banner comments and section dividers; match that density when editing them.
