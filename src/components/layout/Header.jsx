import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", mobileMenuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [mobileMenuOpen]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="grid-bg"></div>
      <header>
        <nav>
          <Link className="logo" to="/">
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
            <Link to="/contact" className="btn btn-primary btn-primary-desktop">
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

      <div
        className={`mobile-menu ${mobileMenuOpen ? "is-open" : ""}`}
        id="mobileMenu"
        aria-hidden={!mobileMenuOpen}
      >
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

