# Go live for free: GitHub + Cloudflare Pages (domain stays at GoDaddy)

**Cost: ₹0.** Cloudflare Pages free plan (static sites, unmetered bandwidth, ~500 builds/month, commercial use allowed).
The domain stays registered at GoDaddy. Only its **nameservers** move to Cloudflare (free).
The current shared hosting is **not needed** for the website (you can keep it for WordPress at cms.periodicfit.com).

> Check limits on Cloudflare's own pricing page before launch. Free-tier limits can change.

## Step 1: Put the code on GitHub (free)
1. Create a free account at github.com → New repository → `periodicfit` → **Private**.
2. In the `periodicfit` folder run:
   ```bash
   git init
   git add .
   git commit -m "PeriodicFit website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/periodicfit.git
   git push -u origin main
   ```
   (`.env`, `node_modules` and `dist` are git-ignored and are never uploaded.)

## Step 2: Create the Cloudflare Pages project (free)
1. Sign up at dash.cloudflare.com (Free plan) → **Workers & Pages** → Create → **Pages** → Connect to Git → pick the repo.
2. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Environment variable: `NODE_VERSION` = `22`
3. Environment variables (Settings → Variables), add when you have them:
   - `PUBLIC_WEB3FORMS_KEY` (contact forms)
   - `PUBLIC_TURNSTILE_SITE_KEY` (anti-spam, optional)
   - `PUBLIC_GA4_ID` (analytics, optional)
   - `WP_URL` (`https://cms.periodicfit.com` once WordPress is ready)
4. Deploy. You get a free URL like `periodicfit.pages.dev`. Check everything there first.

The security headers (`dist/_headers`) are applied automatically by Cloudflare Pages.

## Step 3: Connect periodicfit.com (keep GoDaddy as registrar)
1. Cloudflare dashboard → **Add a domain** → `periodicfit.com` → **Free** plan. Cloudflare imports your DNS records.
   Check that email records (MX, TXT/SPF) were copied, or email will stop working.
2. Cloudflare shows **2 nameservers** (e.g. `xxx.ns.cloudflare.com`).
3. GoDaddy → My Products → periodicfit.com → **DNS → Nameservers → Change → "I'll use my own nameservers"** → paste both → Save.
   Turn **DNSSEC off** at GoDaddy first if it is on.
4. Wait for Cloudflare to say **Active** (minutes to 24–48 h).
5. Pages project → **Custom domains** → add `periodicfit.com` and `www.periodicfit.com`. Cloudflare creates the records and the free SSL certificate.
6. (Optional) Redirect rule: `www` → `periodicfit.com`.

## Step 4: WordPress for the blog (uses your existing shared hosting)
- In Cloudflare DNS add an **A record**: `cms` → your shared hosting server IP (from the hosting control panel).
- Install WordPress on `cms.periodicfit.com` in the hosting panel (Softaculous / WordPress installer).
- Then follow `WORDPRESS_GUIDE.md` (plugin, categories, deploy hook, `WP_URL`).

## Step 5: After launch
- Do the checklist in `SECURITY.md` (2FA, WAF/Bot Fight Mode, DNSSEC on in Cloudflare, Turnstile, Web3Forms domain lock).
- Google Search Console → add `periodicfit.com` → submit `https://periodicfit.com/sitemap-index.xml`.
- Every `git push` to `main` rebuilds the site automatically. Every WordPress publish does too (deploy hook).

## Free alternatives (if Cloudflare isn't possible)
| Option | Free & commercial OK? | Note |
|---|---|---|
| **Cloudflare Pages** | Yes | Recommended: unmetered bandwidth, headers file works |
| Netlify Free | Yes | Credit-based monthly limit; site pauses if exceeded |
| GitHub Pages | Yes | No custom security headers, no deploy-hook rebuilds from WordPress |
| Vercel Hobby | **No**: personal/non-commercial only | Not suitable for a business site |
| Your shared hosting | Yes (already paid) | Upload the `dist` folder via File Manager/FTP. Works, but no auto-rebuilds and the `_headers` file is ignored (would need .htaccess) |
