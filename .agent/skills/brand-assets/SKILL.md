---
name: brand-assets
description: Use when handling the logo, favicon, OG image or any brand mark.
---
# Brand asset rules
- Logo mark = two interlocking blades turning around a single point (software, marketing, brand clicking together). Never redraw, recolour, stretch or add effects.
- Wordmark: "CLUTCH CODE", Poppins 700, 15px, letter-spacing .02em, uppercase, beside a 22px-high mark.
- Header menu button uses the mark at 22px and rotates/fades to a cross in --brand-lt on open.
- Large mark (150px wide) appears on the About page inside a radial indigo-glow panel.
- The provided pages contain the logo as an inline base64 PNG (≈ 240×250). Extract it ONCE to /assets/logo.png, then derive /assets/favicon-32.png, /assets/favicon-180.png (apple-touch-icon) and a 1200×630 /assets/og.png (mark centred on --ink). Reference by path everywhere.
