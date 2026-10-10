import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import useGlobalInteractions from "../../hooks/useGlobalInteractions";
import { EASE_SPRING } from "../../lib/motion/config";
import { WHATSAPP_LINK } from "../../lib/contact";

const menuContainer = (reduce) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: reduce ? 0 : 0.08,
      delayChildren: reduce ? 0 : 0.12,
    },
  },
});

const menuItem = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: reduce ? 0 : 0.5, ease: EASE_SPRING },
  },
});

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const reduced = useReducedMotion();
  const { scrollProgress, isScrolled } = useGlobalInteractions();

  useEffect(() => {
    setMobileMenuOpen(false);
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
              {({ isActive }) => (
                <>
                  Services
                  {isActive && <motion.span layoutId="nav-active-pill" className="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                </>
              )}
            </NavLink>
            <NavLink to="/work" className={({ isActive }) => (isActive ? "current" : "")}>
              {({ isActive }) => (
                <>
                  Work
                  {isActive && <motion.span layoutId="nav-active-pill" className="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                </>
              )}
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? "current" : "")}>
              {({ isActive }) => (
                <>
                  About
                  {isActive && <motion.span layoutId="nav-active-pill" className="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                </>
              )}
            </NavLink>
            <NavLink to="/clutchkart" className={({ isActive }) => (isActive ? "current" : "")}>
              {({ isActive }) => (
                <>
                  ClutchKart
                  {isActive && <motion.span layoutId="nav-active-pill" className="nav-pill" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                </>
              )}
            </NavLink>
          </div>
          <div className="navcta">
            <Link to="/contact" className="btn btn-primary btn-primary-desktop nav-attention-cta">
              Talk to our team
            </Link>
            <motion.button
              className={`menu-btn ${mobileMenuOpen ? "is-open" : ""}`}
              id="menuBtn"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={reduced ? undefined : { scale: 0.94 }}
            >
              <span className="mark">
                <img src="/assets/logo.png" alt="" width="22" height="23" />
                <span className="cross">
                  <span></span>
                  <span></span>
                </span>
              </span>
            </motion.button>
          </div>
        </nav>
      </header>

      <div className={`mobile-menu ${mobileMenuOpen ? "is-open" : ""}`} id="mobileMenu">
        <motion.div
          className="mobile-menu-inner"
          variants={menuContainer(reduced)}
          initial="hidden"
          animate={mobileMenuOpen ? "show" : "hidden"}
        >
          <motion.div className="kicker" variants={menuItem(reduced)}>// menu</motion.div>

          {[
            { to: "/", label: "Home", idx: "01", end: true },
            { to: "/services", label: "Services", idx: "02" },
            { to: "/work", label: "Work", idx: "03" },
            { to: "/about", label: "About", idx: "04" },
            { to: "/clutchkart", label: "ClutchKart", idx: "05" },
            { to: "/contact", label: "Contact", idx: "06" },
          ].map((item) => (
            <motion.div key={item.to} variants={menuItem(reduced)}>
              <NavLink to={item.to} end={item.end} className={({ isActive }) => `mlink ${isActive ? "current" : ""}`}>
                <span className="mlink-idx">{item.idx}</span>
                <span className="mlink-txt">{item.label}</span>
                <svg className="mlink-arr" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </NavLink>
            </motion.div>
          ))}

          <motion.div className="mfoot" variants={menuItem(reduced)}>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Talk to our team
            </Link>
            <div className="mmenu-contact">
              <a className="mmenu-link" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">
                <span>WhatsApp</span>
                <span className="mmenu-link-val">Start a chat</span>
              </a>
              <a className="mmenu-link" href="mailto:hello@clutchcode.com">
                <span>Email</span>
                <span className="mmenu-link-val">hello@clutchcode.com</span>
              </a>
            </div>
            <div className="mmenu-foot">
              <span>© {new Date().getFullYear()} Clutch Code</span>
              <span>software &middot; marketing &middot; branding</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
