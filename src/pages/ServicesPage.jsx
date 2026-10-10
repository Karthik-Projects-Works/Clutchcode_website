import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "../components/common/CountUp";
import { Magnetic, GlowCard, RevealText } from "../lib/motion";
import { EASE_SPRING } from "../lib/motion/config";

const STACK = ["REACT", "NODE.JS", "PYTHON", "POSTGRES"];

const stackList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const stackItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_SPRING } },
};

export default function ServicesPage() {
  const [activeSection, setActiveSection] = useState("software");

  useEffect(() => {
    const sectionIds = ["software", "marketing", "branding", "models"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">// services</div>
          <RevealText
            as="h1"
            lines={["Software, marketing, and brand.", "Built together."]}
          />
          <p className="lede">
            Three practices that share one brief, one plan, and one team — so what we build, how we promote it, and how it looks all point the same way.
          </p>
          <div className="subnav sticky-subnav" role="navigation" aria-label="Services in-page navigation">
            <a
              className={`chip ${activeSection === "software" ? "on" : ""}`}
              href="#software"
              onClick={(e) => scrollTo(e, "software")}
            >
              Software Solutions
            </a>
            <a
              className={`chip ${activeSection === "marketing" ? "on" : ""}`}
              href="#marketing"
              onClick={(e) => scrollTo(e, "marketing")}
            >
              Digital Marketing
            </a>
            <a
              className={`chip ${activeSection === "branding" ? "on" : ""}`}
              href="#branding"
              onClick={(e) => scrollTo(e, "branding")}
            >
              Branding
            </a>
            <a
              className={`chip ${activeSection === "models" ? "on" : ""}`}
              href="#models"
              onClick={(e) => scrollTo(e, "models")}
            >
              How we engage
            </a>
          </div>
        </div>
      </section>

      {/* 01 SOFTWARE */}
      <section id="software">
        <div className="wrap">
          <div className="split">
            <div className="sticky-split-col">
              <div className="kicker">// 01 &middot; software</div>
              <h2>Software Solutions</h2>
              <p className="lede">
                Custom applications and business systems designed around how your company actually works — not the other way round.
              </p>
              <div className="tag-bracket" style={{ marginBottom: "20px" }}>
                [ WEB &middot; MOBILE &middot; INTERNAL SYSTEMS ]
              </div>
              <motion.div
                className="stack-row"
                variants={stackList}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px 0px" }}
                aria-label="Technology stack"
              >
                {STACK.map((t) => (
                  <motion.span key={t} className="mono-badge stack-badge" variants={stackItem}>
                    {t}
                  </motion.span>
                ))}
              </motion.div>
              <Magnetic strength={12}>
                <Link className="btn btn-primary" to="/contact?interest=software">
                  Talk to us about software
                </Link>
              </Magnetic>
              <div className="callout">
                Prefer something ready-made? <Link to="/clutchkart">Meet ClutchKart &rarr;</Link> our supermarket and retail management platform.
              </div>
            </div>
            <div>
              <div className="spec-header">
                <span>DELIVERABLES</span>
                <span className="spec-tag">SCOPE 01</span>
              </div>
              <GlowCard className="panel-box">
                <h4>What we deliver</h4>
                <ul className="ticks">
                  <li><b>Web applications</b> — portals, booking systems, dashboards, customer-facing products</li>
                  <li><b>Mobile apps</b> — iOS and Android, from first prototype to store release</li>
                  <li><b>Internal tools</b> — replace the spreadsheets and WhatsApp threads running your operations</li>
                  <li><b>Business systems</b> — billing, inventory, CRM, and reporting that talk to each other</li>
                  <li><b>Integrations &amp; APIs</b> — connect payment gateways, accounting tools, and the software you already use</li>
                  <li><b>Maintenance &amp; support</b> — updates, monitoring, and fixes after launch</li>
                </ul>
              </GlowCard>
              <GlowCard className="panel-box">
                <h4>A good fit if</h4>
                <ul className="ticks">
                  <li>Your business runs on spreadsheets that only one person understands</li>
                  <li>Off-the-shelf software forces workarounds your team is tired of</li>
                  <li>You have an idea for a product and need it taken from sketch to launch</li>
                </ul>
              </GlowCard>
            </div>
          </div>
        </div>
      </section>

      {/* 02 MARKETING */}
      <section id="marketing" className="paper-substrate">
        <div className="wrap">
          <div className="split rev">
            <div className="sticky-split-col">
              <div className="kicker">// 02 &middot; marketing</div>
              <h2>Digital Marketing</h2>
              <p className="lede">
                Marketing that’s tied to enquiries and sales — planned, run, and reported on in plain numbers.
              </p>
              <div className="tag-bracket" style={{ marginBottom: "20px" }}>
                [ SEO &middot; PERFORMANCE &middot; CONTENT ]
              </div>
              <Magnetic strength={12}>
                <Link className="btn btn-primary" to="/contact?interest=marketing">
                  Talk to us about marketing
                </Link>
              </Magnetic>
              <div className="proof-band">
                <div className="proof-band-head">
                  <span>// PROOF &middot; SOLAR ACQUISITION ENGINE</span>
                </div>
                <div className="proof-stats">
                  <div className="proof-stat">
                    <b><CountUp to={4.8} decimals={1} suffix="X" /></b>
                    <span>Return on ad spend</span>
                  </div>
                  <div className="proof-stat">
                    <b><CountUp to={1450} suffix="+" /></b>
                    <span>Consultations generated</span>
                  </div>
                </div>
                <div className="proof-note">
                  A full-funnel campaign for Aura Solar — real enquiries, not impressions.
                </div>
              </div>
            </div>
            <div>
              <div className="spec-header">
                <span>DELIVERABLES</span>
                <span className="spec-tag">SCOPE 02</span>
              </div>
              <GlowCard className="panel-box">
                <h4>What we deliver</h4>
                <ul className="ticks">
                  <li><b>SEO &amp; content</b> — be found by people already searching for what you do</li>
                  <li><b>Paid advertising</b> — Google and Meta campaigns with budgets that are tracked to the rupee</li>
                  <li><b>Social media management</b> — consistent, on-brand posting and community replies</li>
                  <li><b>Email &amp; WhatsApp campaigns</b> — keep existing customers coming back</li>
                  <li><b>Landing pages &amp; conversion</b> — turn visits into enquiries</li>
                  <li><b>Analytics &amp; reporting</b> — a monthly report you can read in five minutes</li>
                </ul>
              </GlowCard>
              <GlowCard className="panel-box">
                <h4>A good fit if</h4>
                <ul className="ticks">
                  <li>You have a good product or service, but not enough people know about it</li>
                  <li>You’re spending on ads without knowing what’s working</li>
                  <li>Your social channels are active but not bringing in business</li>
                </ul>
              </GlowCard>
            </div>
          </div>
        </div>
      </section>

      {/* 03 BRANDING */}
      <section id="branding">
        <div className="wrap">
          <div className="split">
            <div className="sticky-split-col">
              <div className="kicker">// 03 &middot; branding</div>
              <h2>Branding</h2>
              <p className="lede">
                A brand that looks and sounds like one business everywhere — signage, packaging, social, and screen.
              </p>
              <div className="tag-bracket" style={{ marginBottom: "20px" }}>
                [ IDENTITY &middot; SYSTEMS &middot; GUIDELINES ]
              </div>
              <Magnetic strength={12}>
                <Link className="btn btn-primary" to="/contact?interest=branding">
                  Talk to us about branding
                </Link>
              </Magnetic>
              <div className="palette-preview">
                <div className="spec-header">
                  <span>TOOLKIT &middot; PALETTE</span>
                  <span className="spec-tag">THEME TOKENS</span>
                </div>
                <div className="palette-swatches">
                  <div className="palette-swatch" style={{ background: "var(--brand)" }}>
                    <span>#5E5DE5</span>
                  </div>
                  <div className="palette-swatch" style={{ background: "var(--brand-lt)" }}>
                    <span>#8C8BF0</span>
                  </div>
                  <div className="palette-swatch" style={{ background: "var(--paper)" }}>
                    <span>#EDEBE4</span>
                  </div>
                  <div className="palette-swatch" style={{ background: "var(--signal-lime)" }}>
                    <span>#C8FF3D</span>
                  </div>
                  <div className="palette-swatch" style={{ background: "var(--ink)" }}>
                    <span>#05060A</span>
                  </div>
                </div>
                <div className="proof-note">
                  One system, carried through signage, packaging, and screens.
                </div>
              </div>
            </div>
            <div>
              <div className="spec-header">
                <span>DELIVERABLES</span>
                <span className="spec-tag">SCOPE 03</span>
              </div>
              <GlowCard className="panel-box">
                <h4>What we deliver</h4>
                <ul className="ticks">
                  <li><b>Brand strategy</b> — positioning, audience, and the voice you’ll speak in</li>
                  <li><b>Logo &amp; visual identity</b> — mark, colours, typography, and usage rules</li>
                  <li><b>Brand guidelines</b> — a proper brand book, not a three-page PDF</li>
                  <li><b>Packaging &amp; print</b> — cards, letterheads, labels, and signage artwork</li>
                  <li><b>Digital templates</b> — social posts, presentations, and email signatures</li>
                  <li><b>Website look &amp; feel</b> — the identity carried through to your online presence</li>
                </ul>
              </GlowCard>
              <GlowCard className="panel-box">
                <h4>A good fit if</h4>
                <ul className="ticks">
                  <li>You’re launching a new business and want to start with a strong identity</li>
                  <li>You’ve outgrown your first logo or your name has changed</li>
                  <li>Your brand looks different on every channel</li>
                </ul>
              </GlowCard>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE ENGAGE */}
      <section id="models">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">// how we engage</div>
            <h2>Pick the model that fits.</h2>
            <p className="section-sub">Every engagement starts with a conversation and a written plan.</p>
          </div>
          <div className="grid c3">
            <GlowCard className="cell model-cell">
              <div className="num">A</div>
              <h3>Fixed-scope project</h3>
              <p>A defined deliverable with a clear timeline and price — a brand identity, a website, an app, a campaign launch.</p>
            </GlowCard>
            <GlowCard className="cell model-cell">
              <div className="num">B</div>
              <h3>Monthly retainer</h3>
              <p>Ongoing marketing, content, or software support for a steady monthly fee, with a report every month.</p>
            </GlowCard>
            <GlowCard className="cell model-cell">
              <div className="num">C</div>
              <h3>Embedded team</h3>
              <p>A dedicated group working alongside your people for larger, longer programmes of work.</p>
            </GlowCard>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ paddingBottom: "110px" }}>
        <div className="wrap">
          <div className="cta-banner">
            <h2>Tell us what you’re building.</h2>
            <p>Software, a campaign, a brand, or all three — we’ll tell you honestly what we can do and when.</p>
            <Magnetic strength={12}>
              <Link to="/contact" className="btn btn-primary btn-lg">
                Talk to our team
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    </main>
  );
}