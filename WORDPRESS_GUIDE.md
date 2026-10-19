# Blog with WordPress (headless): setup guide

The website stays a fast, secure static Astro site. **WordPress is only the writing room.**
Writers publish in WordPress → WordPress pings Cloudflare → Cloudflare rebuilds the site (≈1–2 min) →
the new article is live on periodicfit.com/blog with our design, SEO schema, TOC and ad slots.

```
Writer ──► cms.periodicfit.com (WordPress) ──publish──► Cloudflare deploy hook
                                                          │
                     periodicfit.com/blog ◄── build reads /wp-json/wp/v2/posts
```

## 1. Install WordPress
1. Create a subdomain, e.g. **cms.periodicfit.com**, and install WordPress there (any host).
2. Settings → Permalinks → **Post name**.
3. Settings → Reading → tick **"Discourage search engines"** (the CMS itself must not be indexed; the real pages are on periodicfit.com).
4. Install **Rank Math** (or Yoast) for SEO title + description per post. In Rank Math → General Settings → Others, enable **Headless CMS Support**.

## 2. Add the PeriodicFit plugin
1. Upload `wordpress/periodicfit-headless.php` to `wp-content/mu-plugins/` (create the folder if needed). It's always on.
2. Add to `wp-config.php`:
   ```php
   define('PF_FRONTEND_URL', 'https://periodicfit.com');
   define('PF_DEPLOY_HOOK',  'https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/XXXX');
   ```
   Get the deploy hook in Cloudflare → Workers & Pages → periodicfit → Settings → Builds → **Deploy hooks**.

What the plugin does: SEO/author/reviewer fields for the site, "Medically reviewed by" box in the editor,
"Credentials" field in user profiles, automatic rebuild on publish/update/delete (debounced), redirects the
CMS front-end to the real site, and hardens WordPress (no XML-RPC, hidden users, no version leak).

## 3. Create these categories (exact slugs)
| Name | Slug |
|---|---|
| Workouts | `workouts` |
| Nutrition | `nutrition` |
| Diet Plans | `diet-plans` |
| Weight Loss | `weight-loss` |
| Muscle Building | `muscle-building` |
| Healthy Recipes | `healthy-recipes` |
| Supplements | `supplements` |
| Lifestyle & Recovery | `lifestyle-recovery` |

Extra categories also work automatically (they get their own page).

## 4. Connect the website
In Cloudflare Pages → periodicfit → Settings → **Environment variables** (Production):
- `WP_URL` = `https://cms.periodicfit.com`

Redeploy once. From now on, every publish triggers a rebuild. With `WP_URL` empty, the site shows
the 3 local sample posts instead.

## 5. Writing a post (checklist for writers)
- **Title**: clear, keyword-first (one H1 is added automatically, don't add another).
- **Headings**: use H2 / H3. They build the "On this page" table of contents.
- **Featured image**: required, landscape 1600×900, with **alt text**.
- **Category**: exactly one main category (the first one is used for breadcrumbs).
- **Excerpt**: 1–2 sentences, shown on cards and as a fallback meta description.
- **Rank Math**: set SEO title + meta description.
- **Medically reviewed by**: fill in for health/nutrition articles (name + credential).
- **Author profile**: add a short bio and Credentials in Users → Profile.
- **Links**: link to at least one PeriodicFit tool and one service where it helps the reader.
- **Embeds**: YouTube is allowed (auto-switched to privacy mode). Other embeds/scripts are stripped for security.
- **Sticky post** (Publish box → "Stick to the top") = featured post on the blog home.

## 6. Security for WordPress (important)
- 2FA for every WordPress user (e.g. Wordfence Login Security), strong unique passwords.
- Keep WordPress, theme and plugins updated; delete unused plugins/themes.
- Put cms.periodicfit.com behind Cloudflare and protect `/wp-admin` and `/wp-login.php` with **Cloudflare Access** (only your team's emails can even see the login page).
- Daily backups (host or UpdraftPlus).
- Give writers the **Author** role, not Administrator.

Even if WordPress were ever compromised, visitors are protected: the public site is static, every article is
**sanitized at build time** (scripts, event handlers and unknown iframes removed) and the strict CSP blocks injected code.
