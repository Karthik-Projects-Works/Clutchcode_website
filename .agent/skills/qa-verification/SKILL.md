---
name: qa-verification
description: Use before declaring any task done. Defines the browser checks, link checks and responsive checks for the Clutch Code site.
---
# Definition of done
1. Open every page in the Antigravity browser at 1440, 820 and 390px. No horizontal scroll, no overlap, no clipped text.
2. Click every nav link, footer link, CTA and in-page anchor (#software, #marketing, #branding, #models, #features, #rollout, #faq). No 404s.
3. Mobile menu opens/closes, locks body scroll, closes on link click and on resize past 860px, button icon swaps logo-mark to cross.
4. Home console tabs switch by click and auto-rotate every 4s; marketing bar chart renders 7 bars.
5. Work page filter chips (All/Software/Marketing/Branding) show/hide the right cards.
6. Contact form: ?interest= prefill works, submit shows success panel, no page reload.
7. FAQ <details> open/close with +/− marker.
8. Keyboard: Tab order sane, focus visible on every interactive element.
9. Lighthouse (mobile): Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
10. Capture screenshots as artifacts and list any deviations honestly.
