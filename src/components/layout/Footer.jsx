import React from "react";
import { Link } from "react-router-dom";
import useGlobalInteractions from "../../hooks/useGlobalInteractions";
import { smoothScrollToTop } from "../../lib/motion";
import SocialDock from "../common/SocialDock";

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
            <SocialDock />
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
            <span style={{ color: "var(--grey-dim)", fontSize: "14px", display: "block", marginTop: "8px" }}>Kerala, India</span>
          </div>
        </div>
        <div className="footer-bottom">
          <div>&copy; {new Date().getFullYear()} Clutch Code. All rights reserved.</div>
          <div>One team &middot; three practices &middot; Kerala, India</div>
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
