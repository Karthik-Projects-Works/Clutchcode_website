import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import useGlobalInteractions from "../../hooks/useGlobalInteractions";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { scrollProgress, isScrolled } = useGlobalInteractions();

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileMenuOpen);
    
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      ></div>
      <div className="grid-bg"></div>
      <header className={isScrolled ? "is-scrolled" : ""}>
        <nav>
          <Link className="logo logo-hover-spin" to="/">
            <img src="/assets/logo.png" alt="Clutch Code" />
            <span>CLUTCH CODE</span>
          </Link>
          <div className="navlinks">
            <NavLink to="/services" className={({ isActive }) => (isActive ? "current" : "")}>
              Services
            </NavLink>
            <NavLink to="/work" className={({ isActive }) => (isActive ? "current" : "")}>
              Work
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "current" : "")}>
              About
            </NavLink>
            <NavLink to="/clutchkart" className={({ isActive }) => (isActive ? "current" : "")}>
              ClutchKart
            </NavLink>
          </div>
          <div className="navcta">
            <Link to="/contact" className="btn btn-primary btn-primary-desktop nav-attention-cta">
              Talk to our team
            </Link>
            <button
              className={`menu-btn ${mobileMenuOpen ? "is-open" : ""}`}
              id="menuBtn"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="mark">
                <img src="/assets/logo.png" alt="" width="22" height="23" />
                <span className="cross">
                  <span></span>
                  <span></span>
                </span>
              </span>
            </button>
          </div>
        </nav>
      </header>

      <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`} id="mobileMenu">
        <div className="kicker">// menu</div>
        <NavLink to="/" end className={({ isActive }) => `mlink ${isActive ? "current" : ""}`}>
          Home
        </NavLink>
        <NavLink to="/services" className={({ isActive }) => `mlink ${isActive ? "current" : ""}`}>
          Services
        </NavLink>
        <NavLink to="/work" className={({ isActive }) => `mlink ${isActive ? "current" : ""}`}>
          Work
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `mlink ${isActive ? "current" : ""}`}>
          About
        </NavLink>
        <NavLink to="/clutchkart" className={({ isActive }) => `mlink ${isActive ? "current" : ""}`}>
          ClutchKart
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `mlink ${isActive ? "current" : ""}`}>
          Contact
        </NavLink>
        <div className="mfoot">
          <Link to="/contact" className="btn btn-primary btn-lg">
            Talk to our team
          </Link>
        </div>
      </div>
    </>
  );
}
