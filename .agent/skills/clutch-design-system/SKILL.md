---
name: clutch-design-system
description: Use for any visual, CSS, layout or component decision on the Clutch Code site. Enforces the dark "ink + indigo" tokens, typography, spacing and component patterns.
---
# Clutch Code design system
Principles: Precision (clean geometry, sharp details, no ornament for its own sake), Momentum (progress you can point at), Confidence (honest, direct).
Theme: dark only. Faint dot-grid background fades from the top. Indigo is the single accent; never add a second accent colour (green/amber only for status flags).
Tokens (define once on :root, never hard-code hex elsewhere):
  --ink #05060A  --ink-2 #0B0C14  --ink-3 #111219  --panel #0D0E17
  --line #1D1E29  --line-soft #171821
  --brand #5E5DE5  --brand-dk #3F3EB0  --brand-lt #8C8BF0  --brand-glow rgba(94,93,229,.35)
  --grey #9A9BA8  --grey-dim #63647A  --white #FFFFFF
  status: ok #6FCF97, warn #E0B454
Fonts: Poppins 300–800 for UI/headings, JetBrains Mono 400–600 for kickers, tags, labels, numbers.
Type: h1 clamp(38px,5vw,58px)/700/-0.02em; page-hero h1 clamp(34px,4.6vw,52px); h2 clamp(26px,3.4vw,36px)/700; lede 17px grey; body 14–15px, line-height 1.6–1.75.
Kickers: mono 12px grey-dim, written as "// section-name". Eyebrow: mono 12.5px brand-lt with a glowing 6px dot.
Layout: .wrap max-width 1180px, 32px side padding. Sections 88px vertical padding with 1px top border var(--line-soft). Radii: buttons 8–9px, cards 14px, big panels 16–20px.
Grids: "hairline grid" = 1px gap on --line-soft background so cells look divided by thin lines (.grid c2/c3/c4). Cards = bordered panels with hover lift (translateY(-2px)) and border to grey-dim.
Buttons: .btn-primary (indigo fill, hover lift + glow shadow), .btn-ghost (transparent, line border). Sizes: default 10px/20px, .btn-lg 13px/24px.
Chips/tags: mono pill, brand-lt on 12% indigo with 28% indigo border.
Motion: 150–500ms ease transitions only; honour prefers-reduced-motion (reduce all to ~0).
Responsive breakpoints: 980px (hero to one column, 4-col to 2-col), 860px (hide nav links, show menu button, grids to 1 col), 760px, 640px, 560px (form two-col to one-col).
Accessibility: visible focus states (indigo ring using --brand-glow), aria-label/aria-expanded on the menu button, native <details> for FAQ, colour contrast AA for body text on --ink.
