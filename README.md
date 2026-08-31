# Zomic — Marketing Website

The public marketing site for **Zomic**, the CRM that turns conversations into
customers. Built as a separate deliverable from the CRM product app, but sharing
the same design language so the two feel like one company.

**Live site:** _deploy pending_ · **Product app:** separate repository

---

## Stack

| Layer      | Choice                                    |
| ---------- | ----------------------------------------- |
| Framework  | React 18                                  |
| Build      | Vite 5                                    |
| Styling    | Tailwind CSS 3 + CSS custom properties    |
| Motion     | Framer Motion 11                          |
| Routing    | React Router 6                            |
| Icons      | lucide-react (tree-shaken via icon map)   |

Same stack as the Zomic product app, deliberately — shared conventions mean the
marketing site and the CRM stay visually and structurally consistent.

---

## Getting started

```bash
npm install
npm run dev       # dev server on http://localhost:5174
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

Requires Node 18+.

---

## Project structure

```
src/
├─ components/
│  ├─ Layout.jsx        # scroll progress + navbar + page transition + footer
│  ├─ Navbar.jsx        # mega-menu nav, collapses to a mobile drawer
│  ├─ Footer.jsx        # multi-column footer
│  ├─ Mascot.jsx        # "Zo" — the animated SVG mascot
│  └─ sections.jsx      # shared section primitives
├─ lib/
│  ├─ motion.jsx        # the entire animation system (see below)
│  ├─ content.js        # nav / footer / pricing data — single source of truth
│  ├─ posts.js          # blog content
│  └─ icons.js          # curated icon map (keeps the bundle small)
├─ pages/
│  ├─ product/          # 5 feature pages
│  ├─ solutions/        # 4 audience pages + shared template
│  ├─ legal/            # privacy, terms + shared template
│  └─ ...               # home, pricing, about, careers, contact, security, blog
├─ App.jsx              # routes
└─ index.css            # design tokens + component styles
```

---

## The animation system

All motion lives in [`src/lib/motion.jsx`](src/lib/motion.jsx). Every scroll
animation uses Framer Motion's `whileInView` with `viewport={{ once: true }}`,
so elements animate exactly once on first entry and never re-trigger.

**Signature easing** — `EASE_BOUNCY = [0.34, 1.56, 0.64, 1]`. The second control
point overshoots past `1`, so animations settle with a small pop instead of a
flat corporate fade. This single curve is what gives the site its character.

### Primitives

| Component        | What it does                                                        |
| ---------------- | ------------------------------------------------------------------- |
| `Reveal`         | Scroll-reveal wrapper. `variant` picks the entrance, `stagger` offsets children |
| `RevealItem`     | Child of a staggered `Reveal` — inherits timing from its parent      |
| `CountUp`        | Ticks `0 → value` when scrolled into view                           |
| `Float`          | Perpetual idle drift — `y: [6,-6]`, `repeatType: "mirror"`           |
| `Blob`           | Soft background shape on a slow organic drift                       |
| `Marquee`        | Seamless infinite horizontal scroll                                 |
| `Magnetic`       | Element leans toward the cursor via a spring                         |
| `Spotlight`      | Card with a cursor-following radial glow                            |
| `WordReveal`     | Animates a headline word-by-word, blur → sharp                      |
| `Parallax`       | Moves a layer at a different rate than scroll                       |
| `TiltCard`       | Subtle 3D tilt toward the cursor                                    |
| `SquashBounce`   | Cartoon squash-and-stretch landing, used for the mascot             |
| `ScrollProgress` | Spring-smoothed progress bar pinned to the top of the viewport      |

### Variants

`text` (y 24→0) · `image` (scale 0.92→1) · `icon` (adds rotate -8°→0) ·
`fromLeft` / `fromRight` (cards converge) · `scaleIn` (0.8→1) ·
`blurUp` (blur + rise) · `fade`

### Reduced motion

`prefers-reduced-motion` is respected in two layers: every primitive
short-circuits to static output in JS, and a CSS media query neutralises
transitions and hides decorative blobs and the progress bar. Content stays fully
readable and functional.

### Performance

Only `transform` and `opacity` are animated (GPU-compositable). Layout
properties like `width`, `height`, `top` and `left` are never animated.

---

## The mascot — "Zo"

An original character in [`src/components/Mascot.jsx`](src/components/Mascot.jsx).
A rounded creature whose head is a **speech bubble** — representing a
conversation becoming a customer.

Drawn entirely from a **single-hue tonal ramp** (eight tints of one lavender).
No competing colours; all depth comes from tonal value, which produces the soft
faded look rather than a flat cartoon sticker.

Each part animates independently — ears sway on separate loops, the body
breathes, eyes blink, the head tilts, the arm waves with overshoot easing.

- **Moods:** `idle` · `wave` · `celebrate` · `think`
- **`seed` prop:** offsets every idle loop's delay, so the multiple mascots
  across the site never move in lockstep.

---

## Design tokens

Defined as CSS custom properties at the top of
[`src/index.css`](src/index.css) and mirrored into
[`tailwind.config.js`](tailwind.config.js).

A single lavender hue carries the whole palette — `--accent-soft` through
`--accent-deepest` — with a five-step lavender-tinted shadow scale
(`--sh-xs` → `--sh-xl`).

---

## Pages

**Product** — Lead Management · WhatsApp Automation · Email System · Analytics · Automations
**Solutions** — Real Estate · Sales Teams · Agencies · Startups
**Company** — About · Careers · Contact · Security · Pricing
**Resources** — Blog (index + post template) · Help Center · API Docs
**Other** — Signup · Privacy · Terms · 404

23 routes total. Every nav and footer link resolves to a real page.

---

## Placeholder content

The following is illustrative and should be replaced before launch:

- **Testimonials** — fictional names and quotes (`src/pages/Home.jsx`)
- **Client logos** — placeholder wordmarks in the marquee
- **Stats** — plausible but illustrative figures
- **Blog posts** — real prose, fictional authors (`src/lib/posts.js`)
- **Careers listings** — illustrative roles
- **Contact details** — placeholder email addresses and phone number
- **Social links** — point to platform homepages, not real Zomic profiles
- **Compliance statuses** — verify before publishing (`src/pages/Security.jsx`)

**Forms** (contact, signup) validate and show success states but do not submit
anywhere yet — they need wiring to a backend endpoint.
