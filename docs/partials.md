# Clutch Code — Shared HTML Partials

This document defines the verbatim canonical markup for the **Header**, **Mobile Menu**, and **Footer** shared across all 6 pages.

---

## 1. Shared Header
*Note: The `.current` class is applied to the active link in `.navlinks` on internal pages (`services.html`, `work.html`, `about.html`).*

```html
<header>
  <nav aria-label="Main Navigation">
    <a href="index.html" class="logo" aria-label="Clutch Code Home">
      <img src="assets/logo.png" alt="Clutch Code" width="22" height="23">
      <span>CLUTCH CODE</span>
    </a>
    <div class="navlinks">
      <a href="services.html">Services</a>
      <a href="work.html">Work</a>
      <a href="about.html">About</a>
    </div>
    <div class="navcta">
      <a href="contact.html" class="btn btn-primary btn-primary-desktop">Talk to our team</a>
      <button class="menu-btn" id="menuBtn" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="mobileMenu">
        <span class="mark"><img src="assets/logo.png" alt="" width="22" height="23"></span>
        <span class="cross"><span></span><span></span></span>
      </button>
    </div>
  </nav>
</header>
```

---

## 2. Shared Mobile Menu (Full-Screen Overlay)
*Note: The `.current` class is applied to the active page link.*

```html
<div class="mobile-menu" id="mobileMenu" aria-hidden="true">
  <div class="kicker">// menu</div>
  <a href="index.html" class="mlink">Home</a>
  <a href="services.html" class="mlink">Services</a>
  <a href="work.html" class="mlink">Work</a>
  <a href="about.html" class="mlink">About</a>
  <a href="contact.html" class="mlink">Contact</a>
  <div class="mfoot">
    <a href="contact.html" class="btn btn-primary">Talk to our team</a>
  </div>
</div>
```

---

## 3. Shared Footer

```html
<footer>
  <div class="wrap">
    <div class="footer-top">
      <div class="footer-brand">
        <a href="index.html" class="logo" aria-label="Clutch Code Home">
          <img src="assets/logo.png" alt="Clutch Code" width="22" height="23">
          <span>CLUTCH CODE</span>
        </a>
        <p>Software, digital marketing, and branding for growing businesses.</p>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <a href="services.html#software">Software Solutions</a>
        <a href="services.html#marketing">Digital Marketing</a>
        <a href="services.html#branding">Branding</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="about.html">About</a>
        <a href="work.html">Work</a>
        <a href="contact.html">Contact</a>
      </div>
      <div class="footer-col">
        <h4>Start</h4>
        <a href="contact.html">Talk to our team</a>
        <a href="contact.html?interest=branding">Request a brand review</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Clutch Code</span>
      <span>everything clicks into place.</span>
    </div>
  </div>
</footer>
```
