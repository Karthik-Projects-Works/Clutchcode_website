# Clutch Code — Multi-Page Marketing Website

Marketing website for **Clutch Code** — offering Software Solutions, Digital
Marketing, and Branding, plus proprietary retail management product
**ClutchKart**.

Tagline: *"everything clicks into place."*

---

## 1. Stack

- **React 18** + **Vite 6** + **React Router 6**
- **Framer Motion**, **GSAP** + **Lenis** for motion
- Hand-written CSS — the single source of truth is `src/styles/styles.css`
  (`src/styles/tailwind.css` holds a scoped motion layer only). Do not add
  Tailwind utility classes to components.
- Deployed on **Vercel** (SPA, with a serverless contact endpoint).

---

## 2. How to Run Locally

Requires **Node.js 18+**.

```bash
npm install
npm run dev        # Vite dev server → http://localhost:4173
npm run build      # production build → dist/
npm run preview    # preview the built output
```

> The contact form posts to `/api/contact`, a Vercel serverless function.
> Plain `npm run dev` proxies `/api/*` to `http://localhost:3000`, so run
> `vercel dev` alongside it to exercise the form locally.

### Environment variables

Create a local `.env.local` (git-ignored) for development. Values marked
*server* must be set in the Vercel project settings for production.

| Variable | Scope | Purpose |
|----------|-------|---------|
| `VITE_GA_ID` | client | Google Analytics 4 measurement ID (`G-XXXXXXXXXX`). Analytics is a no-op when unset. |
| `RESEND_API_KEY` | server | Resend API key for the contact endpoint. |
| `CONTACT_FROM` | server | Verified sender, e.g. `Clutch Code <hello@clutchcode.com>`. |
| `CONTACT_TO` | server | Destination inbox for enquiries. |

---

## 3. Folder Map

```
/
├── index.html                 # Vite entry (base meta, fonts)
├── vite.config.js             # Vite config (+ /api dev proxy)
├── vercel.json                # SPA fallback rewrites
├── robots.txt / sitemap.xml   # SEO (https://clutchcode.com)
│
├── api/
│   └── contact.js             # Vercel serverless function → Resend email
│
├── public/
│   └── assets/                # logo, favicon, og.png, hero.mp4, hero-poster.jpg
│
├── src/
│   ├── main.jsx               # React root + BrowserRouter
│   ├── App.jsx                # Routes, smooth scroll, analytics, layout
│   ├── pages/                 # HomePage, ServicesPage, WorkPage, AboutPage,
│   │                          #   ClutchKartPage, ContactPage, NotFoundPage
│   ├── components/
│   │   ├── layout/            # Header, Footer
│   │   ├── home/              # HeroVideo, ConsoleDeck, BentoShowcase
│   │   └── common/            # SocialDock, Ticker, CountUp, QuoteCard, ...
│   ├── hooks/                 # useDocumentMeta, usePageview, useScrollReveal, ...
│   ├── lib/
│   │   ├── contact.js         # WhatsApp link
│   │   ├── analytics.js       # GA4 loader + page_view
│   │   └── motion/            # Scroll, reveal, magnetic + motion primitives
│   └── styles/                # styles.css (design system), tailwind.css
│
├── docs/                      # STYLE_GUIDE.md, motion-spec.md
└── AGENTS.md                  # Agent working rules
```

Routes: `/`, `/services`, `/work`, `/about`, `/clutchkart`, `/contact`
(`*.html` aliases also resolve). Unknown paths render `NotFoundPage`.

---

## 4. "Before Launch" Checklist

The following are placeholders or require production values and must be
resolved before launch:

- [ ] **WhatsApp number:** replace `91XXXXXXXXXX` in `src/lib/contact.js`.
- [ ] **Social links:** replace the generic `instagram.com` / `twitter.com` /
      `discord.com` URLs in `src/components/common/SocialDock.jsx`.
- [ ] **Team bios & names:** replace `[Name]` placeholders on the About page.
- [ ] **Direct contact info:** confirm office address / hours on the Contact page.
- [ ] **Work case studies & testimonial:** replace the sample projects
      (`Horizon Retail`, `Greenleaf Organics`, `Brightside Café`, …) and the
      placeholder quote on the home page with real content, or remove them.
- [ ] **Contact form:** set `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_TO` in
      Vercel, and verify delivery end-to-end.
- [ ] **Analytics:** set `VITE_GA_ID` (GA4) and confirm page views are recorded.
- [ ] **Domain:** `robots.txt`, `sitemap.xml`, canonical and Open Graph URLs all
      reference `https://clutchcode.com` — update if the production domain differs.
