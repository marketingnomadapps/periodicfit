# PeriodicFit — Security

No website can honestly be called "unhackable". What we can do is remove almost every
attack surface and lock down the rest. This site is built to be very hard to break.

## Why the design itself is safe
- **Static site.** Astro builds plain HTML/CSS/JS. There is no server code, no database,
  no admin login, no WordPress, no plugins. The usual ways sites get hacked
  (SQL injection, plugin exploits, brute-forcing an admin panel) don't exist here.
- **No secrets in the code.** The Web3Forms key is a public, domain-locked key by design.
  Real secrets never go in the repo. `.env` is git-ignored.
- **Forms go to Web3Forms** over HTTPS with a honeypot field and (optionally) Cloudflare Turnstile.
- **All tool inputs are numbers or fixed options.** Shared links only accept short plain values
  (`restoreFromUrl` whitelist), so links can't inject markup.

## Built in (automatic on every build)
`integrations/security-headers.mjs` writes `dist/_headers` for Cloudflare Pages:
- **Content-Security-Policy.** Only our own scripts (plus SHA-256-hashed inline scripts) can run.
  Injected scripts, `onerror=` tricks and data leaks to unknown domains are blocked.
  Tested locally: injected inline script ✗, inline event handler ✗, fetch to unknown domain ✗.
- **HSTS** (forces HTTPS, 2 years, preload-ready).
- **X-Frame-Options DENY + frame-ancestors 'none'** (stops clickjacking / embedding).
- **X-Content-Type-Options, Referrer-Policy, Permissions-Policy** (camera, mic, location etc. off),
  **COOP/CORP** isolation.
- `/.well-known/security.txt` for responsible disclosure.

## Launch checklist (do these in the dashboards)
- [ ] **Cloudflare:** SSL/TLS mode = Full (strict); "Always Use HTTPS" on; HSTS on; minimum TLS 1.2.
- [ ] **Cloudflare:** WAF managed rules on; **Bot Fight Mode** on; enable DNSSEC.
- [ ] **Cloudflare Turnstile:** create a site key → set `PUBLIC_TURNSTILE_SITE_KEY` (the form then requires it).
- [ ] **Web3Forms:** restrict the access key to `periodicfit.com` in the Web3Forms dashboard.
- [ ] **2FA everywhere:** GitHub, Cloudflare, domain registrar, Web3Forms, Google accounts.
- [ ] **GitHub:** protect the main branch (no force-push), enable Dependabot alerts.
- [ ] Run `npm audit` before each deploy (currently 0 vulnerabilities).
- [ ] When GA4 / AdSense are switched on, add **only their domains** to the CSP in `astro.config.mjs`.
- [ ] Submit periodicfit.com to https://hstspreload.org once HTTPS is stable.

## The weakest link is people, not code
Most real "hacks" of static sites are stolen logins (phishing) to Cloudflare, GitHub or the domain
registrar. Use a password manager, unique passwords and 2FA, and never share login codes.
