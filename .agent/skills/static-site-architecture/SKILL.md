---
name: static-site-architecture
description: Use when creating files, shared components, JS or build structure for the Clutch Code static site.
---
# Architecture rules
- Pure static site: HTML5 + one shared CSS file + one shared JS file. No framework, no bundler, no CDN scripts. Only Google Fonts (Poppins, JetBrains Mono) is external.
- Shared pieces live ONCE: /css/styles.css, /js/main.js, /assets/logo.png. Never inline base64 images or copy the CSS per page.
- Header, mobile menu and footer markup are identical on every page except the `.current` class on the active link. Keep them in a documented partial (see /docs/partials.md) and copy verbatim.
- Semantic HTML: header, nav, main, section, article, aside, footer. One h1 per page. Heading order never skips.
- Every page has unique <title> and <meta name="description">, viewport meta, lang="en".
- Query-string prefill: contact.html?interest=software|marketing|branding|clutchkart pre-checks that checkbox.
- JS is progressive: pages must be readable with JS off. Guard every feature with an element-exists check.
- File names: index.html, services.html, work.html, about.html, clutchkart.html, contact.html.
