# Clutch Code — Multi-Page Marketing Website

Marketing website for **Clutch Code** — offering Software Solutions, Digital Marketing, and Branding, plus proprietary retail management product **ClutchKart**.

Tagline: *"everything clicks into place."*

---

## 1. How to Run Locally

This is a pure static website requiring no build tools, bundlers, or package dependencies.

### Option A: Node.js Static Server
```bash
npx serve -l 4173
```
Then open `http://localhost:4173` in any browser.

### Option B: Python
```bash
python -m http.server 4173
```
Then open `http://localhost:4173`.

---

## 2. Workspace & Folder Map

```
/
├── index.html                 # Homepage (Hero console, services, why, process, work, FAQ)
├── services.html              # Software Solutions, Digital Marketing, Branding, Models
├── work.html                  # Filterable case studies (Software / Marketing / Branding)
├── about.html                 # Story, principles, brand mark explanation, team
├── clutchkart.html            # Supermarket & retail software product page + POS receipt
├── contact.html               # Project intake form with ?interest= prefill & Honeypot
│
├── css/
│   └── styles.css             # Consolidated, tokenized "ink + indigo" design system
├── js/
│   └── main.js                # Consolidated guarded IIFE for mobile menu, tabs, filters, form
├── assets/
│   ├── logo.png               # Canonical brand mark
│   ├── favicon-32.png         # 32x32 favicon
│   ├── favicon-180.png        # 180x180 apple-touch-icon
│   └── og.png                 # 1200x630 social share Open Graph card
│
├── docs/
│   └── partials.md            # Verbatim markup for shared header, mobile menu, and footer
├── robots.txt                 # Search engine crawler directives
├── sitemap.xml                # Sitemap referencing all 6 pages
└── .agent/skills/             # Agent skills: design system, voice, architecture, QA, brand
```

---

## 3. "Before Launch" Checklist

The following items are placeholders or sample content and must be replaced or connected prior to production deployment:

- [ ] **Domain Replacement:** Update `https://example.com` placeholder with the real production domain in:
  - `sitemap.xml`
  - `robots.txt`
  - Canonical tags & Open Graph URLs (`og:url`, `og:image`) across all 6 HTML files.
- [ ] **Contact Form Backend:** Connect the form submission in `/js/main.js` (line marked `// TODO: send the form data to your email service / backend here.`) to your chosen email provider or API (e.g. Formspree, Resend, or custom backend).
- [ ] **Team Bios & Names:** On `about.html`, replace `[Name]` placeholders with real founder and leadership names.
- [ ] **Direct Contact Info:** On `contact.html`, replace `[Phone number]` and `[Office address]` with verified company contact numbers and street address.
- [ ] **Work Page Case Studies:** Replace sample client projects (`Horizon Retail`, `Greenleaf Organics`, `Brightside Café`, `Northfield Clinic`, `Atlas Hardware`, `Greenfield Supermarkets`) on `work.html` and `index.html` with real portfolio work.
- [ ] **Testimonial Attribution:** On `index.html`, replace placeholder quote from Dana Okafor with genuine client review, or remove the quote block.
- [ ] **Analytics Setup:** Configure production analytics (e.g., Plausible, PostHog, or Google Analytics) respecting privacy preferences.
