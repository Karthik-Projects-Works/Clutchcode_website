import React from "react";
import { Link } from "react-router-dom";
import ConsoleDeck from "../components/home/ConsoleDeck";

const TICKER_ITEMS = [
  "Software that scales",
  "Marketing that converts",
  "Brands that last",
  "One team",
  "No handoffs",
];

export default function HomePage() {
  return (
    <main>
      <section className="hero-master" style={{ borderTop: "none" }}>
        <div className="hero-master-video-wrap" id="seamlessVideoWrap" aria-hidden="true">
          <video
            className="hero-master-video v-layer active"
            id="heroVidA"
            autoPlay
            muted
            playsInline
            preload="auto"
            poster="/assets/hero-poster.jpg"
          >
            <source src="/assets/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-master-video-overlay"></div>
        </div>

        <div className="hero-content">
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow">// software &middot; marketing &middot; branding</div>
              <h1>
                Everything<br />
                clicks into <span className="accent">place</span>.
              </h1>
              <p className="lede">
                Clutch Code builds the systems growing businesses run on — custom software, the marketing that brings people to it, and the brand that makes them stay. One team, three practices, built to work together from day one.
              </p>
              <div className="hero-ctas">
                <Link to="/contact" className="btn btn-primary btn-lg">
                  Talk to our team
                </Link>
                <Link to="/services" className="btn btn-ghost btn-lg">
                  See what we do
                </Link>
              </div>
              <div className="trust">one team for the software, the marketing, and the brand</div>
            </div>

            <ConsoleDeck />
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap" aria-hidden="true">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <React.Fragment key={i}>
              <span>{item}</span>
              <span className="dot">&middot;</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* THREE PRACTICES BENTO */}
      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">// one team &middot; three practices</div>
            <h2>Three things that work better together.</h2>
            <p className="section-sub">
              Most businesses hire three different vendors and spend their own time connecting them. We do all three under one roof.
            </p>
          </div>

          <div className="grid bento-layout">
            <div className="cell bento-hero">
              <div className="bento-cell-header">
                <span className="num">01</span>
                <span className="tag-bracket">[ CORE ]</span>
              </div>
              <h3>Software Solutions</h3>
              <p>
                Custom applications, business systems, and tools built for how your business actually operates — not off-the-shelf software you have to work around.
              </p>
              <div className="micro-preview">
                <span className="mono-badge">REACT &middot; NODE &middot; PYTHON &middot; POSTGRES</span>
              </div>
              <Link to="/services#software" className="inline-action">
                Learn more &rarr;
              </Link>
            </div>

            <div className="cell bento-accent">
              <div className="bento-cell-header">
                <span className="num">02</span>
                <span className="tag-bracket">[ GROWTH ]</span>
              </div>
              <h3>Digital Marketing</h3>
              <p>
                Campaigns, SEO, and content that bring the right people to your business — tracked to actual enquiries and sales, not vanity impressions.
              </p>
              <Link to="/services#marketing" className="inline-action">
                Learn more &rarr;
              </Link>
            </div>

            <div className="cell bento-light">
              <div className="bento-cell-header">
                <span className="num">03</span>
                <span className="tag-bracket">[ IDENTITY ]</span>
              </div>
              <h3>Branding</h3>
              <p>
                Visual identity, messaging, and brand guidelines that make your business look like one company everywhere customers see it.
              </p>
              <Link to="/services#branding" className="inline-action">
                Learn more &rarr;
              </Link>
            </div>

            <div className="cell bento-full">
              <div className="spec-header">
                <span>OUR OWN PRODUCT &middot; PROOF OF WORK</span>
                <span className="spec-tag">v2.4 STABLE</span>
              </div>
              <div className="split">
                <div>
                  <div className="kicker">// built by clutch code</div>
                  <h2>ClutchKart — for supermarkets.</h2>
                  <p className="lede">
                    We don’t just build software for clients — we run our own. ClutchKart is a complete management system built specifically for supermarkets and grocery retail.
                  </p>
                  <Link to="/clutchkart" className="btn btn-primary">
                    See ClutchKart &rarr;
                  </Link>
                </div>
                <div className="panel-box">
                  <h4>Key capabilities</h4>
                  <ul className="ticks">
                    <li><b>Point of sale &amp; billing</b> — fast checkout with barcode and weighing scale support</li>
                    <li><b>Inventory management</b> — stock levels, expiry tracking, and purchase orders</li>
                    <li><b>Reports &amp; analytics</b> — daily sales, margins, and fast-moving items</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ paddingBottom: "110px" }}>
        <div className="wrap">
          <div className="cta-banner">
            <h2>Ready to get started?</h2>
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
