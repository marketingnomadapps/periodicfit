# PeriodicFit — open TODOs

## After Phase 1
- [ ] `src/config/site.ts` → CONTACT: real email, phone, WhatsApp number (digits only, with country code), support hours
- [ ] `src/config/site.ts` → SOCIAL: Instagram / YouTube / Facebook / X / LinkedIn URLs (icons hide until filled)
- [ ] `src/config/site.ts` → ANALYTICS: GA4 ID + Search Console verification token
- [ ] `.env` → `PUBLIC_WEB3FORMS_KEY` and `PUBLIC_TURNSTILE_SITE_KEY` (copy from `.env.example`)
- [ ] `public/images/og-default.jpg` (1200×630) — planned for Phase 7
- [ ] Delete `/styleguide` before launch (it is noindex)

## After Phase 2 (homepage)
- [ ] Replace temporary Unsplash photos in `src/assets/images/` with your own Canva images. Keep the same file names and no code changes are needed (list in `src/data/images.ts`)
- [ ] Counter numbers (clients, plans, coaches, renew %) in `src/data/home.ts` → real numbers
- [ ] "From the blog" cards are placeholders → auto-wired to real posts in Phase 4
- [ ] "Book Free Consultation" buttons go to /contact for now → open the inquiry popup in Phase 3

## Removed on request (Oct 15 2026)
- Pricing section + /pricing page removed until pricing is agreed with the client
- No periodic-table styling anywhere (tiles, element symbols). PeriodicFit is the brand name only

## After Phase 3 (service pages)
- [ ] `.env` → `PUBLIC_WEB3FORMS_KEY` (forms show a "demo mode" message until this is added). Optional: `PUBLIC_TURNSTILE_SITE_KEY`
- [ ] Review all dummy service copy in `src/data/services.ts` (who it's for, features, steps, sample plans, FAQs)
- [ ] Testimonials on service pages are PLACEHOLDERS → replace with real, consented reviews or remove (`src/data/services.ts`)
- [ ] Service images: replace temporary photos (`src/data/images.ts` → `SERVICE_GALLERY`)
- [ ] Service schema `areaServed` (currently "Worldwide") in `src/pages/services/[slug].astro`
- [ ] Auto popup on service pages: on/off + delay in `src/config/site.ts` → `FORMS.autoPopup`
- [ ] Real WhatsApp number in `src/config/site.ts` (floating button uses it)

## After Phase 5 (tools, Oct 16 2026)
- [ ] Dietitian to review meal database values in `src/data/meals.ts` (approximate per-serving kcal/macros)
- [ ] Coach to review exercise library + set/rep schemes in `src/data/exercises.ts`
- [ ] Add a named expert reviewer on tool guides (currently "Reviewed by the PeriodicFit team") in `src/pages/tools/[slug].astro`
- [ ] Tool guide copy lives in `src/content/tools/*.md`. Review it before launch.
- [ ] Optional: add Instagram handle to share text once SOCIAL.instagram is set

## After tools redesign + About/Contact (Oct 16 2026)
- [ ] Replace temporary photos in `src/assets/images/tools`, `about`, `contact` (same file names = no code change)
- [ ] About page: founder story / founding year, real coach roles + photos (also feeds /coaches)
- [ ] Contact FAQ: confirm which countries you coach in

## Security (Oct 17 2026) — see SECURITY.md
- [ ] Do the dashboard launch checklist in `SECURITY.md` (Cloudflare WAF/Bot Fight/DNSSEC, Turnstile key, Web3Forms domain lock, 2FA)
- [ ] Confirm the security contact in `public/.well-known/security.txt`

## Remaining pages + WordPress blog (Oct 19 2026)
- [ ] **Legal review** of /privacy-policy, /terms-and-conditions, /disclaimer, /cookie-policy, /refund-policy (drafts, not legal advice)
- [ ] `src/config/site.ts` → LEGAL: company legal name, jurisdiction/city, grievance officer, privacy email
- [ ] Refund Policy: confirm 7-day / 14-day / 24-hour periods once pricing is final
- [ ] Privacy Policy: confirm data-retention periods (12 months inquiries / 3 years clients)
- [ ] Coaches page: real names, photos, certifications; confirm "Our standards" text
- [ ] Transformations: add real, consented client stories in `src/data/transformations.ts`
- [ ] WordPress: follow `WORDPRESS_GUIDE.md` (cms subdomain, mu-plugin, categories, `WP_URL` + deploy hook)
- [ ] GA4: set `PUBLIC_GA4_ID` in Cloudflare env (loads only after cookie consent)
- [ ] After AdSense approval: `ADS.ADSENSE_ENABLED = true`, `ADS.clientId`, slot IDs in AdSlot, real line in `public/ads.txt`, add AdSense domains to the CSP in `astro.config.mjs`

## Go live (Oct 19 2026)
- [ ] Follow `DEPLOY.md`: GitHub (private repo) → Cloudflare Pages → move GoDaddy nameservers to Cloudflare → custom domain
