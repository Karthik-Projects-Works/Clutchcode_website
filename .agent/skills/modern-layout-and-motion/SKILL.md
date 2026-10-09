---
name: modern-layout-and-motion
description: Layout systems, scroll behaviour, motion and interaction rules using only modern CSS/JS with no heavy libraries.
---
Layout: CSS Grid with a 12-col base, deliberate off-grid items, container queries for components, subgrid for aligned cards, `clamp()` fluid spacing, logical properties. Use `100svh`, not `100vh`. Bento-style asymmetry only where content differs in importance.
Scroll/Motion (native first):
- CSS scroll-driven animations (`animation-timeline: view()/scroll()`), `@starting-style`, View Transitions API for page-to-page transitions, `:has()`, `@property` for animated custom properties, `color-mix()`, `text-wrap: balance/pretty`.
- Progressive enhancement: wrap in `@supports`, and provide a static fallback. Respect `prefers-reduced-motion` (no scroll-jacking, no parallax, shorten durations).
- Optional tiny JS: IntersectionObserver, pointer-position CSS variables for magnetic/cursor-reactive details. No GSAP/Lenis unless the plan shows a need and size cost < 30KB.
- Motion principles: purposeful, 200–600ms, snap-settle easing (`cubic-bezier(.2,.9,.1,1)` or `linear()` spring). One signature motion (the "click-lock") reused consistently.
Interaction: custom cursor only on hover-capable devices; large hit targets (44px+); visible focus; no hover-only information.
Performance: LCP < 2.0s, CLS < 0.05, total JS < 40KB, images AVIF/WebP with explicit dimensions, fonts subsetted with `font-display: swap`.
