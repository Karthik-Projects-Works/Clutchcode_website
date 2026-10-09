import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function WorkPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (["software", "marketing", "branding"].includes(hash)) {
      setFilter(hash);
    } else {
      setFilter("all");
    }
  }, [location.hash]);

  const handleFilter = (cat) => {
    setFilter(cat);
    if (cat === "all") {
      navigate("/work", { replace: true });
    } else {
      navigate(`/work#${cat}`, { replace: true });
    }
  };

  const getCount = () => {
    if (filter === "software") return 2;
    if (filter === "marketing") return 1;
    if (filter === "branding") return 1;
    return 4;
  };

  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">// work</div>
          <h1>Work that solves problems and looks sharp.</h1>
          <p className="lede">
            A selection of projects across software, marketing, and brand identity. Real businesses, real goals, and work we’re proud to put our name to.
          </p>
          <div className="subnav" role="toolbar" aria-label="Filter case studies">
            <button
              className={`chip ${filter === "all" ? "on" : ""}`}
              type="button"
              aria-pressed={filter === "all"}
              onClick={() => handleFilter("all")}
            >
              All work
            </button>
            <button
              className={`chip ${filter === "software" ? "on" : ""}`}
              type="button"
              aria-pressed={filter === "software"}
              onClick={() => handleFilter("software")}
            >
              Software
            </button>
            <button
              className={`chip ${filter === "marketing" ? "on" : ""}`}
              type="button"
              aria-pressed={filter === "marketing"}
              onClick={() => handleFilter("marketing")}
            >
              Digital marketing
            </button>
            <button
              className={`chip ${filter === "branding" ? "on" : ""}`}
              type="button"
              aria-pressed={filter === "branding"}
              onClick={() => handleFilter("branding")}
            >
              Branding
            </button>
          </div>
          <div className="sr-only" aria-live="polite">
            Showing {getCount()} {getCount() === 1 ? "project" : "projects"} for {filter === "all" ? "all categories" : filter}
          </div>
        </div>
      </section>

      <section style={{ paddingBottom: "110px" }}>
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: "40px" }}>
            <div className="kicker">// selected work</div>
            <h2>Four projects worth showing.</h2>
            <p className="section-sub">Filter by practice — every one shipped for a real business.</p>
          </div>
          <div className="grid bento-layout work-deck-layout">
            {/* Project 1: ClutchKart */}
            {(filter === "all" || filter === "software") && (
              <div className="cell bento-hero project-card-animated">
                <div className="bento-cell-header">
                  <span className="num">PROPRIETARY // 01</span>
                  <span className="tag-bracket">[ SOFTWARE &middot; RETAIL ]</span>
                </div>
                <h3>ClutchKart — Supermarket &amp; Retail POS</h3>
                <p>
                  A complete retail management and billing platform built for high-throughput Indian grocery and supermarket operations. Offline fallback, barcode engine, and live cloud stock sync.
                </p>
                <div className="micro-preview">
                  <span className="mono-badge">DEPLOYED &middot; 40,000+ SKUS MONITORED</span>
                </div>
                <div style={{ marginTop: "24px" }}>
                  <Link to="/clutchkart" className="btn btn-primary">
                    View product case &rarr;
                  </Link>
                </div>
              </div>
            )}

            {/* Project 2: Apex Payments */}
            {(filter === "all" || filter === "software") && (
              <div className="cell bento-accent project-card-animated">
                <div className="bento-cell-header">
                  <span className="num">CLIENT // 02</span>
                  <span className="tag-bracket">[ SOFTWARE &middot; FINTECH ]</span>
                </div>
                <h3>Apex Payments — Real-Time Settlement Engine</h3>
                <p>
                  High-throughput B2B payment gateway dashboard with webhook monitors, automated merchant reconciliations, and low-latency API infrastructure.
                </p>
                <div className="micro-preview">
                  <span className="mono-badge">14ms SETTLEMENT QUERY &middot; $14M VOLUME</span>
                </div>
              </div>
            )}

            {/* Project 3: Aura Solar */}
            {(filter === "all" || filter === "marketing") && (
              <div className="cell bento-light project-card-animated">
                <div className="bento-cell-header">
                  <span className="num">CLIENT // 03</span>
                  <span className="tag-bracket">[ MARKETING &middot; ENERGY ]</span>
                </div>
                <h3>Aura Solar — High-Converting Acquisition Engine</h3>
                <p>
                  Full-funnel digital marketing campaign and interactive solar savings estimator generating high-intent residential and commercial installation leads.
                </p>
                <div className="micro-preview">
                  <span className="mono-badge">4.8X ROAS &middot; 1,450+ CONSULTATIONS</span>
                </div>
              </div>
            )}

            {/* Project 4: Horizon Health */}
            {(filter === "all" || filter === "branding") && (
              <div className="cell bento-full project-card-animated">
                <div className="spec-header">
                  <span>SYSTEMIC BRAND IDENTITY</span>
                  <span className="spec-tag">DELIVERED</span>
                </div>
                <div className="split">
                  <div>
                    <div className="kicker">// brand systems</div>
                    <h2>Horizon Health — Clinical Telemedicine Rebrand</h2>
                    <p className="lede">
                      Comprehensive brand identity overhaul for an enterprise medical software provider. Visual design system, accessible token exports in Figma, and complete design collateral.
                    </p>
                  </div>
                  <div className="panel-box">
                    <h4>Deliverables</h4>
                    <ul className="ticks">
                      <li><b>Complete design tokens</b> exported to React and CSS</li>
                      <li><b>210% surge</b> in inbound pilot requests after launch</li>
                      <li><b>Full brand book</b> and digital UI guidelines</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ paddingBottom: "110px" }}>
        <div className="wrap">
          <div className="cta-banner">
            <h2>Have a project in mind?</h2>
            <p>Tell us what you're working on. We'll tell you honestly what we can do and what it will take.</p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
