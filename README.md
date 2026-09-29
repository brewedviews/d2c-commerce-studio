# D2C Commerce Studio — marketing site

The website for a premium D2C commerce studio: we design and build digital commerce experiences for D2C brands.

Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4**, deployed on **Railway**. Every page is statically prerendered; the only server-side code is the project-enquiry action and a health check.

---

## Setup

Requires Node.js **20.9+**.

```bash
npm install
cp .env.example .env.local   # fill in what you need; everything is optional in development
npm run dev                  # http://localhost:3000
```

| Script              | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Development server (Turbopack)        |
| `npm run build`     | Production build                      |
| `npm run start`     | Serve the production build (`$PORT`)  |
| `npm run lint`      | ESLint                                |
| `npm run typecheck` | TypeScript, no emit                   |
| `npm run check`     | Lint + typecheck + build              |

> **Next.js 16 note:** APIs differ from older versions (async `params`, `PageProps` helpers, image defaults). The bundled docs in `node_modules/next/dist/docs/` are the reference — see `AGENTS.md`.

## Environment variables

All variables are documented in [`.env.example`](.env.example). None are secret in the client bundle except where noted.

| Variable | Scope | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | build | Public origin for canonical URLs, sitemap, robots and OG. **Required in production.** |
| `NEXT_PUBLIC_CONTACT_EMAIL` | build | Shows email links. Optional. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | build | Shows WhatsApp links (international format). Optional. |
| `NEXT_PUBLIC_INSTAGRAM_URL` | build | Footer link. Optional. |
| `LEAD_WEBHOOK_URL` | server | Enquiries are POSTed here as JSON. |
| `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL` | server | Enquiries are emailed via Resend. |
| `NEXT_PUBLIC_GA4_ID` | build | Loads GA4 when set. |
| `NEXT_PUBLIC_META_PIXEL_ID` | build | Loads Meta Pixel when set. |

`NEXT_PUBLIC_*` values are inlined at **build time** — set them in Railway before deploying and redeploy after changing them.

**Enquiry form:** configure at least one of the webhook or Resend channels. If neither is set, the form tells the visitor online enquiries aren't connected and points to email/WhatsApp if those are configured. It never shows a fake success.

## Deployment (Railway)

`railway.json` configures the service:

- Build: `npm run build` (Railpack detects Node from `engines`)
- Start: `npm run start` — Next.js listens on Railway's `$PORT`
- Health check: `GET /api/health`

Steps:

1. Create a Railway project → **Deploy from GitHub repo** → `brewedviews/d2c-commerce-studio`.
2. In **Variables**, set `NEXT_PUBLIC_SITE_URL` (your final domain) plus the lead-delivery and analytics variables you need.
3. Deploy. Add your custom domain under **Settings → Networking**, then make sure `NEXT_PUBLIC_SITE_URL` matches it and redeploy.

## Architecture

```
app/                    Routes (Server Components by default)
  page.tsx              Homepage — composes sections in order
  work/                 Work index + /work/[slug] case studies (SSG) + per-study OG images
  services/ about/      Supporting pages
  contact/              Enquiry page + server action (actions.ts)
  api/health/           Railway health check
  sitemap.ts robots.ts opengraph-image.tsx icon.svg
content/                ALL copy and data, typed (types.ts) — the future CMS boundary
components/
  sections/             Homepage sections (hero, selected work, services, …)
  case-study/           Project feature card + gallery
  pricing/ forms/       Pricing list, ownership block, enquiry form + field primitives
  navigation/ footer/   Header (server) + mobile menu (the one client nav component)
  ui/                   Buttons, labels, device frames, arrow
  animations/           CSS-only marquee
  analytics/            Script loader + one delegated event listener
lib/
  analytics/            Event catalogue, provider-agnostic track()
  leads/                Enquiry schema/validation + delivery (webhook / Resend)
  og/                   Shared Open Graph card renderer
  utils/                cn() with tailwind-merge
public/images/          Case-study screenshots (captured from the live sites)
assets/fonts/           Instrument Serif TTF for OG image rendering (OFL)
```

### Design system

Tokens live in `app/globals.css` under `@theme`: a paper/ink palette with one sindoor accent, a fluid editorial type scale (`text-d1`…`text-d4`, `text-lead`, `label`), easing curves and container/section utilities. Type pairs **Instrument Serif** (display) with **Geist** (body) and **Geist Mono** (labels), all self-hosted through `next/font`.

### Motion

- Scroll reveals use CSS scroll-driven animations (`data-reveal`), so they need no JavaScript; browsers without support just show the content.
- The hero headline rises line by line on load; the capability strip is a CSS marquee.
- Everything respects `prefers-reduced-motion`.

### Analytics

Components never call vendor SDKs. They declare intent:

```tsx
<a data-track="start_project" data-track-location="hero">…</a>      // click
<section data-track-view="view_pricing">…</section>                   // once per page view
```

`components/analytics/analytics-listener.tsx` turns these into `track()` calls, and `lib/analytics/track.ts` fans them out to GA4 and Meta when they are loaded. Events: `view_case_study`, `view_pricing`, `start_project`, `submit_contact_form`, `click_whatsapp`, `click_email`.

### Content and case studies

Edit files in `content/` to change copy. To add a case study, append to `content/case-studies.ts` and drop screenshots in `public/images/case-studies/<slug>/`. The route, sitemap entry and OG image are generated automatically. `results` and `testimonial` render only when present, so add them only when you have real, client-approved data.

## Assumptions (v1)

- **Studio name:** the brief doesn't name the studio, so "Brewed Views" (from the GitHub org) is a working name. Change `site.name` in `content/site.ts`.
- **Imagery:** case-study visuals are screenshots of the live production sites (prabhakala.in, shoplokl.in), captured September 2026.
- **Contact details** aren't hard-coded; they're read from env variables so personal details never end up in the repo.
- **No invented credibility:** there are no metrics, testimonials, logos or team claims. The UI is built to add them later.
