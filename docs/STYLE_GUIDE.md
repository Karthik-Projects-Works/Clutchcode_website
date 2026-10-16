# Clutch Code — Website Style Guide & Design Elements Specification

Comprehensive reference document covering all style elements, design tokens, typography, color palettes, visual substrates, UI components, animations, and responsive standards implemented across the **Clutch Code** website.

---

## 1. Design Philosophy & Aesthetic Theme

Clutch Code's visual identity is defined by a precision-engineered, editorial-meets-hardware aesthetic:
- **Core Concept**: *Machined Ink & Technical Warm Paper*
- **Atmosphere**: Technical, high-density, mathematical grid layout with subtle retro-mechanical accents and high legibility.
- **Strict Theme Guard**: High contrast, minimal glow effects, hairline dividers, bordered bento panels, and monospace terminal cues (`// kicker`).

---

## 2. Typography System

All typefaces are loaded via Google Fonts with preconnect optimizations:

### 2.1 Font Families

| Role | Font Family | Fallbacks | Source / Weights | Purpose / Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display & Headings** | `'Space Grotesk'` | `-apple-system, sans-serif` | Weights: `400`, `500`, `600`, `700` | Section headings, hero titles, navigation logo, big metrics |
| **Editorial Accent** | `'Instrument Serif'` | `Georgia, serif` | Styles: `italic`, `normal` (Weight: `400`) | Highlighted keywords inside titles (`.accent`), editorial punch |
| **Body & UI** | `'DM Sans'` | `-apple-system, sans-serif` | Weights: `300` to `800`, normal & italic | Primary copy, descriptions, sub-headings, list text |
| **Monospace / System**| `'JetBrains Mono'` | `ui-monospace, monospace` | Weights: `400`, `500`, `600`, `700` | Code blocks, kickers (`// KICKER`), buttons, status tags, telemetry |

### 2.2 Typographic Hierarchy & Scale

| Style / Element | Font Family | Size | Weight | Line Height | Letter Spacing | Text Transform | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Display `<h1>`** | `Space Grotesk` | `clamp(42px, 8vw, 84px)` | `700` | `0.94` | `-0.04em` | None | `text-wrap: balance` |
| **Hero Keyword `.accent`** | `Instrument Serif` | Inherits `h1`/`h2` | `400` (Italic) | Inherit | `-0.01em` | None | Color: `--brand-lt` |
| **Section Heading `<h2>`** | `Space Grotesk` | `clamp(28px, 4.4vw, 48px)` | `700` | `1.05` | `-0.03em` | None | Fluid responsive |
| **Card / Item Title `<h3>`** | `Space Grotesk` | `1.25rem` (20px) | `600` | `1.25` | `-0.02em` | None | Bento & grid titles |
| **Lead / Lede Paragraph** | `DM Sans` | `clamp(16px, 1.3vw, 19px)` | `400` / `500` | `1.60` | Normal | None | Max-width: `58ch`, `--grey` |
| **Standard Body Text** | `DM Sans` | `1rem` (16px) | `400` | `1.65` | Normal | None | Color: `--white` or `--grey` |
| **Mono Kicker (`.kicker`)** | `JetBrains Mono` | `12px` | `500` | Normal | `0.08em` | `uppercase` | Bracketed with `┌` and `┐` glyphs |
| **Eyebrow Indicator** | `JetBrains Mono` | `12px` | `500` | Normal | `0.06em` | `uppercase` | Preceded by a 7×7px lime cube |
| **Button Text** | `JetBrains Mono` | `13px` – `14px` | `600` / `700` | `1` | `0.03em` | `uppercase` | Snappy, technical command style |
| **Telemetry / Metadata** | `JetBrains Mono` | `11px` – `12px` | `500` | `1.4` | `0.04em` | None | Color: `--grey-dim` |

---

## 3. Color Palette & CSS Variables

The website utilizes CSS custom properties partitioned into functional palettes:

### 3.1 Dark Base ("Machined Ink")

| Token | Hex / Value | Visual Description | Applied Location |
| :--- | :--- | :--- | :--- |
| `--ink` | `#05060A` | Deep Obsidian / Black | Primary page background |
| `--ink-2` | `#0B0C14` | Midnight Charcoal | Elevated background, sub-panels |
| `--ink-3` | `#111219` | Deep Graphite | Card backgrounds, hover states |
| `--panel` | `#0D0E17` | Machined Panel Dark | Bento cells, console deck, HUD |
| `--panel-elevated` | `#141522` | Raised Surface | Dropdowns, mobile menu, modals |

### 3.2 Accent & Brand Colors

| Token | Hex / Value | Role | Applied Location |
| :--- | :--- | :--- | :--- |
| `--brand` | `#5E5DE5` | Primary Mechanical Indigo | Primary buttons, active tabs, brand accents |
| `--brand-dk` | `#3F3EB0` | Deep Pressed Indigo | Button hover/active states |
| `--brand-lt` | `#8C8BF0` | Soft Lilac Accent | Italic serif accents, kickers, active indicators |
| `--brand-glow` | `rgba(94, 93, 229, 0.35)` | Subtle Indigo Glow | Button shadows, focused elements |
| `--signal-lime` | `#C8FF3D` | Electric Signal Lime | Telemetry status dot, focus rings, pulse badge |
| `--signal-lime-dim` | `rgba(200, 255, 61, 0.15)` | Transparent Lime Glow | Badges, status background pills |

### 3.3 Neutral Text & Ruling Lines

| Token | Hex / Value | Role | Usage |
| :--- | :--- | :--- | :--- |
| `--white` | `#FFFFFF` | Maximum Contrast | Main titles, active links, primary text |
| `--grey` | `#A2A3B0` | Muted Body Text | Paragraphs, descriptions, secondary items |
| `--grey-dim` | `#7C7D94` | Dim Metadata | Captions, dates, tags, footnotes |
| `--line` | `#1D1E29` | Structural Grid Border | Major section dividers, card frames |
| `--line-soft` | `#171821` | Soft Partition | Inner component separators |
| `--line-hairline` | `rgba(255, 255, 255, 0.08)` | Delicate White Line | Header border, card outlines |
| `--line-bright` | `rgba(255, 255, 255, 0.18)` | Highlight Border | Ghost buttons, active card borders |

### 3.4 Alternating "Technical Warm Paper" Substrate

Used on alternating high-contrast light plates or case studies:

| Token | Hex / Value | Role |
| :--- | :--- | :--- |
| `--paper` | `#EDEBE4` | Warm Architectural Paper substrate |
| `--paper-panel`| `#E3E0D6` | Slightly recessed light container |
| `--paper-ink` | `#111219` | High-contrast dark typography on light |
| `--paper-grey` | `#5A5B69` | Midtone secondary typography |
| `--paper-line` | `#D0CDC2` | Light plate ruling divider |

### 3.5 Status Signals

- **OK / Live**: `--status-ok: #6FCF97`
- **Warning**: `--status-warn: #E0B454`
- **Alert / Error**: `--status-alert: #FF5C5C`

---

## 4. Visual Textures & Structural Patterns

### 4.1 Engineering Grid Background (`.grid-bg`)
The entire application is underpinned by a fixed, non-intrusive mathematical dot & line canvas:
```css
.grid-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: 
    radial-gradient(circle, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px);
  background-size: 32px 32px, 128px 128px, 128px 128px;
  mask-image: radial-gradient(ellipse 90% 70% at 50% 0%, black 40%, transparent 85%);
}
```

### 4.2 Interactive Spotlight Glow (`.ckg-spot`)
On cards in the Bento showcase, a subtle cursor-tracking spotlight is rendered:
- Background: `radial-gradient(240px circle at var(--sx, 50%) var(--sy, 50%), rgba(94, 93, 229, 0.16), rgba(200, 255, 61, 0.05) 40%, transparent 65%)`
- Opacity: Transitions to `1` on card hover.

### 4.3 Border Beam Animation (`.ckg-beam`)
Highlights top-tier bento cards with a slow, circulating gradient beam:
- Gradient: `conic-gradient(from 0deg, transparent 0deg, rgba(94, 93, 229, 0.55) 50deg, rgba(200, 255, 61, 0.5) 95deg, transparent 150deg, transparent 360deg)`
- Duration: `6s linear infinite` rotation.

---

## 5. UI Components & Micro-Interactions

### 5.1 Buttons (`.btn`)
All buttons share a monospace uppercase label with geometric 4px corners:

| Variant | Class | Styling & Hover Effect |
| :--- | :--- | :--- |
| **Primary** | `.btn-primary` | Solid indigo background (`#5E5DE5`), white text. Hover transitions to `#3F3EB0` with `0 4px 20px -4px var(--brand-glow)`. |
| **Ghost** | `.btn-ghost` | Transparent background, hairline border (`--line-bright`). Hover brightens border to pure white with `rgba(255, 255, 255, 0.04)` fill. |
| **Signal Action** | `.btn-signal` | Electric lime background (`#C8FF3D`), deep ink text. Hover brightens to `#D6FF5E` with `0 0 24px -4px rgba(200, 255, 61, 0.4)`. |
| **Large Sizing** | `.btn-lg` | Padding: `14px 28px`, font size: `14px`. |
| **Button Shimmer** | `.ckg-shine` | Sweeping 45° semi-transparent sheen across button face every 3.4 seconds. |
| **Active State** | `.btn:active` | Snappy scale compression to `0.97` for tactile mechanical feedback. |

### 5.2 Header & Navigation
- **Height / Layout**: `16px clamp(20px, 4vw, 40px)` inner padding, sticky at `top: 0`, `z-index: 90`.
- **Glassmorphism**: `background: rgba(5, 6, 10, 0.82)`, `backdrop-filter: blur(16px)`, bottom hairline border `1px solid var(--line-hairline)`.
- **Logo**: Features rotating mechanical propeller/cross mark (`transform: rotate(45deg)` on hover).
- **Navigation Links**: Space Grotesk 14px, 500 weight. Current active link has a 2px bottom underline in `--brand`.
- **Mobile Menu Button**: 44×44px square panel button that transforms its cross icon smoothly into an electric lime `X`.

### 5.3 Bento Cards & Panels
- **Structure**: High-contrast hairline grid boundaries (`border: 1px solid var(--line)`).
- **Surface**: `--panel` (`#0D0E17`) background.
- **Hover Lift**: GPU-accelerated `-2px` to `-4px` vertical lift with smooth border transition to `--brand-lt`.
- **Corners**: Subtle mathematical radii (`4px` to `8px`), avoiding hyper-rounded playful shapes.

### 5.4 Form Inputs (`.field input`, `.field textarea`)
- **Background**: `--panel` (`#0D0E17`).
- **Border**: `1px solid var(--line)`.
- **Focus State**: Ring transition with `border-color: var(--brand)` and subtle box-shadow.
- **Accessible Outline**: `:focus-visible` triggers strict `outline: 2px solid var(--signal-lime); outline-offset: 3px`.

### 5.5 Floating Utilities
- **WhatsApp Direct Action**: Fixed bottom floating mechanical circular button (`.wa-float`) with lime badge and tooltip.
- **Back to Top**: Technical arrow button appearing upon scroll elevation.
- **Skip Link**: Accessible `.skip-link` positioned off-screen (`top: -100px`) that drops into view (`top: 16px`) when focused with keyboard `Tab`.

---

## 6. Motion System & Animation Tokens

Clutch Code uses a **strict GPU-only motion system** (`transform`, `opacity`):

### 6.1 Timing Curves & Durations

```css
:root {
  --ease-snap: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-mechanical: cubic-bezier(0.2, 0.9, 0.1, 1);
  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  --dur-1: 150ms;   /* Fast feedback (button hover, press) */
  --dur-2: 250ms;   /* Component state transitions (dropdowns, accordions) */
  --dur-3: 450ms;   /* Viewport reveals, card transitions */
  --dur-4: 700ms;   /* Long background choreography */
  --stagger: 70ms;  /* Delay offset between successive child items */
}
```

### 6.2 Key Animations

1. **`ckg-beam-spin`**: 360° rotating border beam highlight (6s linear loop).
2. **`ckg-shine`**: Light sweep on primary actions (3.4s ease-in-out loop).
3. **`sparkDraw`**: SVG sparkline metric stroke revealing dynamically on viewport intersection.
4. **`barGrow`**: Staggered column height animation for data charts.
5. **View Transitions API**: Native cross-document / route blend using `@view-transition` with 240ms duration.

---

## 7. Layout & Responsive Breakpoints

| Breakpoint | Width Range | Layout Behavior |
| :--- | :--- | :--- |
| **Max Content Wrap** | `1220px` / `1280px` | Center aligned with `clamp(20px, 4vw, 40px)` gutter padding |
| **Desktop Wide** | `1281px+` | Full multi-column Bento grids, sticky split console deck, 3-column service matrix |
| **Laptop / Tablet Landscape** | `981px – 1280px` | Dual-column layouts, sticky subnavigation active |
| **Tablet** | `861px – 980px` | Inline nav retained; bento/service grids step down to 2 columns |
| **Tablet Portrait** | `769px – 860px` | Hamburger menu activates (`.navlinks` hidden, `.menu-btn` shown) |
| **Small Tablet** | `641px – 768px` | Console/grid components collapse to a single column |
| **Mobile Standard** | `480px – 640px` | Full-width single column cards, 44px min touch targets, horizontal overflow disabled (`overflow-x: clip`) |
| **Compact Mobile** | `360px – 479px` | Tightened type scale, hidden HUD spec, condensed padding |

### 7.1 Canonical Breakpoint Ladder

`styles.css` is authored against a canonical ladder of **480 / 640 / 768 / 860 / 980** (plus `360` for compact mobile). New rules should reuse one of these values:

- `980px` — desktop → tablet (nav/hero/grid step-downs)
- `860px` — nav switch (mobile menu); paired with `min-width: 861px` for the desktop complement
- `768px` — unified tablet point (grids, cards, palette, hero cue)
- `640px` — unified phone point (cards, footer stack, mobile menu, `overflow-x: clip`)
- `480px` — small phone
- `360px` — compact mobile

A few **component-tuned points** remain intentionally (`520px` HUD spec, `560px` rails/type, `900px` `.split` / `.contact-grid` stack). These are local to a single component and must not be treated as global breakpoints.

---

## 8. Accessibility & Compliance Standards

- **Strict Focus Ring**: High-visibility `:focus-visible` in electric lime (`#C8FF3D`).
- **Prefers-Reduced-Motion**: Under `@media (prefers-reduced-motion: reduce)`, all non-essential loops, border beams, continuous sweeps, and scale shifts are instantly disabled or converted to direct 0ms opacity steps.
- **Screen Reader Support**: `.sr-only` utility classes for accessible icon descriptions and hidden section semantics.
- **Touch Target Integrity**: Minimum `44px × 44px` physical hit areas on all buttons and navigation triggers.
