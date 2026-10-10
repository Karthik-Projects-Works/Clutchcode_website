import React from "react";
import { Link } from "react-router-dom";
import useGlobalInteractions from "../../hooks/useGlobalInteractions";
import { smoothScrollToTop } from "../../lib/motion";
import { WHATSAPP_LINK } from "../../lib/contact";

export default function Footer() {
  const { showBackToTop, scrollToTop } = useGlobalInteractions();

  return (
    <footer>
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Link className="logo" to="/">
              <img src="/assets/logo.png" alt="Clutch Code" style={{ height: "20px" }} />
              <span>CLUTCH CODE</span>
            </Link>
            <p>Software, digital marketing, and branding for growing businesses.</p>
            <div className="social-dock" aria-label="Social media channels">
              <a href="https://instagram.com" className="social-btn social-link1" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://twitter.com" className="social-btn social-link2" aria-label="Twitter / X" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
              </a>
              <a href="https://discord.com" className="social-btn social-link3" aria-label="Discord" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              </a>
              <a href={WHATSAPP_LINK} className="social-btn social-link4" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <div className="footer-heading">Services</div>
            <Link to="/services#software" className="footer-interactive-link">Software Solutions</Link>
            <Link to="/services#marketing" className="footer-interactive-link">Digital Marketing</Link>
            <Link to="/services#branding" className="footer-interactive-link">Branding</Link>
          </div>
          <div className="footer-col">
            <div className="footer-heading">Company</div>
            <Link to="/about" className="footer-interactive-link">About</Link>
            <Link to="/work" className="footer-interactive-link">Work</Link>
            <Link to="/clutchkart" className="footer-interactive-link">ClutchKart</Link>
            <Link to="/contact" className="footer-interactive-link">Contact</Link>
          </div>
          <div className="footer-col">
            <div className="footer-heading">Connect</div>
            <a href="mailto:hello@clutchcode.com" className="footer-interactive-link">hello@clutchcode.com</a>
            <span style={{ color: "var(--grey-dim)", fontSize: "14px", display: "block", marginTop: "8px" }}>Bangalore, India</span>
          </div>
        </div>
        <div className="footer-bottom">
          <div>&copy; {new Date().getFullYear()} Clutch Code. All rights reserved.</div>
          <div>One team &middot; three practices &middot; Bangalore</div>
        </div>
      </div>

<button
        type="button"
        className={`back-to-top-btn ${showBackToTop ? "is-visible" : ""}`}
        onClick={smoothScrollToTop}
        aria-label="Back to top"
      >
        <span>&uarr;</span>
      </button>
    </footer>
  );
}
