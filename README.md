# Flazyn — Marketing Website

The public website for **Flazyn**, the CRM that turns conversations into customers.
Live at **https://flazyn.com** (early access).

## Stack

React 18 · Vite 5 · Framer Motion · three.js via @react-three/fiber (lazy-loaded) ·
React Router 6 · Vercel (static pages + one serverless function).

## Commands

```bash
npm install
npm run dev       # http://localhost:5174 — forms work locally via .env.local
npm run build     # client build → SSR build → prerender every route
npm run preview   # serve the production build on http://localhost:5175
```

## Environment variables

Set in **Vercel → Project → Settings → Environment Variables** (and in `.env.local` for dev —
see `.env.example`). Never prefix them with `VITE_`; they must stay server-side.

| Variable             | Required | Purpose                                                        |
| -------------------- | -------- | -------------------------------------------------------------- |
| `RESEND_API_KEY`     | yes      | Sends form submissions through Resend                          |
| `CONTACT_TO_EMAIL`   | yes      | Inbox that receives contact and early-access submissions       |
| `CONTACT_FROM_EMAIL` | no       | Sender on a Resend-verified domain, e.g. `Flazyn <hello@flazyn.com>` |

## How it's built

```
src/
├─ lib/site.js        business facts (name, domain, email) + navigation — edit here first
├─ lib/seo.js         title/description for every route → prerender, sitemap, client nav
├─ lib/posts.js       blog posts
├─ lib/motion.jsx     scroll reveals, 3D tilt, page transitions (reduced-motion aware)
├─ three/Scenes.jsx   procedural 3D logo scene + mascot (lazy chunk, loads when idle)
├─ components/        Navbar, Footer, Logo, Stage3D (3D loader), ProductDemo, Forms, sections
├─ pages/             Home, productPages, solutionPages (FeaturePage template), legal/…
├─ entry-server.jsx   build-time render entry
api/contact.js        Vercel function: validates forms and emails them via Resend
scripts/prerender.mjs writes dist/<route>.html with meta, Open Graph, JSON-LD, sitemap, robots
```

### SEO

- Every route is prerendered to static HTML with its own `<title>`, description, canonical,
  Open Graph/Twitter tags and JSON-LD (Organization, WebSite, BreadcrumbList, FAQPage, BlogPosting).
- `sitemap.xml` and `robots.txt` are generated on each build. A real `404.html` is served with 404 status.
- To add a page: add the `<Route>` in `App.jsx` **and** an entry in `lib/seo.js`.

### Performance

- Content is visible in the HTML before JavaScript runs; no above-the-fold element waits on animation.
- three.js (~225 kB gzip) loads only after the page is idle and the 3D stage is on screen; the
  static SVG logo is shown until then. It is skipped entirely for reduced-motion and Save-Data users.
- Hashed assets are cached for a year (`vercel.json`).

### Meta / WhatsApp review

Privacy Policy: `/privacy` · Terms: `/terms` · Data deletion instructions: `/data-deletion` (old `/legal/*` URLs redirect).

## Admin panel (`/admin`)

A built-in CMS for one admin account:

- **Edit on the page:** log in, open any page, click **Edit this page**, then click any text to
  change it, use **Replace** on any photo (image or video), and **+ Add block** to insert text,
  image, video, image + text or call-to-action blocks. **SEO** edits the page's Google title/description.
- **Dashboard:** pages & SEO, blog posts (create/edit/delete, cover images), media library,
  site settings (contact email, tagline) and publish history with restore.
- **Save draft → Publish.** Publishing stores the content and triggers a rebuild, so pages stay
  prerendered static HTML; the live site updates in ~1–2 minutes.

How it works: the site's copy stays in the components as defaults; the admin stores *overrides*
(`src/lib/content.jsx`, validated by `api/_lib/content.js`). Content and media live in Vercel Blob
(`api/_lib/storage.js`); the build (`scripts/prerender.mjs`) bakes the published content into every page.
Admin code is lazy-loaded and never shipped to regular visitors.

Setup (Vercel):
1. **Storage → Create → Blob**, connect it to this project (adds `BLOB_READ_WRITE_TOKEN`).
2. `npm run admin:password -- "a-strong-password"` → add `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`,
   `ADMIN_SESSION_SECRET` as environment variables.
3. **Settings → Git → Deploy Hooks** → create one for `main`, add its URL as `VERCEL_DEPLOY_HOOK_URL`.
4. Redeploy, then sign in at `/admin`.

Locally (`npm run dev`) without a Blob token, content and uploads are stored in `.cms-local/` (gitignored).
