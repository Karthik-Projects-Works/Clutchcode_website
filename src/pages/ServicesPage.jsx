import React from "react";
import { Link } from "react-router-dom";

export default function ServicesPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">// services</div>
          <h1>Software, marketing, and brand. Built together.</h1>
          <p className="lede">
            Three practices that share one brief, one plan, and one team — so what we build, how we promote it, and how it looks all point the same way.
          </p>
          <div className="subnav">
            <a className="chip" href="#software">Software Solutions</a>
            <a className="chip" href="#marketing">Digital Marketing</a>
            <a className="chip" href="#branding">Branding</a>
            <a className="chip" href="#models">How we engage</a>
          </div>
        </div>
      </section>

      {/* 01 SOFTWARE */}
      <section id="software">
        <div className="wrap">
          <div className="split">
            <div>
              <div className="kicker">// 01 &middot; software</div>
              <h2>Software Solutions</h2>
              <p className="lede">
                Custom applications and business systems designed around how your company actually works — not the other way round.
              </p>
              <Link className="btn btn-primary" to="/contact?interest=software">
                Talk to us about software
              </Link>
              <div className="callout">
                Prefer something ready-made? <Link to="/clutchkart">Meet ClutchKart &rarr;</Link> our supermarket and retail management platform.
              </div>
            </div>
            <div>
              <div className="panel-box">
                <h4>What we deliver</h4>
                <ul className="ticks">
                  <li><b>Web applications</b> — portals, booking systems, dashboards, customer-facing products</li>
                  <li><b>Mobile apps</b> — iOS and Android, from first prototype to store release</li>
                  <li><b>Internal tools</b> — replace the spreadsheets and WhatsApp threads running your operations</li>
                  <li><b>Business systems</b> — billing, inventory, CRM, and reporting that talk to each other</li>
                  <li><b>Integrations &amp; APIs</b> — connect payment gateways, accounting tools, and the software you already use</li>
                  <li><b>Maintenance &amp; support</b> — updates, monitoring, and fixes after launch</li>
                </ul>
              </div>
              <div className="panel-box">
                <h4>A good fit if</h4>
                <ul className="ticks">
                  <li>Your business runs on spreadsheets that only one person understands</li>
                  <li>Off-the-shelf software forces workarounds your team is tired of</li>
                  <li>You have an idea for a product and need it taken from sketch to launch</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 MARKETING */}
      <section id="marketing" className="paper-substrate">
        <div className="wrap">
          <div className="split">
            <div>
              <div className="kicker">// 02 &middot; marketing</div>
              <h2>Digital Marketing</h2>
              <p className="lede">
                Marketing that’s tied to enquiries and sales — planned, run, and reported on in plain numbers.
              </p>
              <Link className="btn btn-primary" to="/contact?interest=marketing">
                Talk to us about marketing
              </Link>
            </div>
            <div>
              <div className="panel-box">
                <h4>What we deliver</h4>
                <ul className="ticks">
                  <li><b>SEO &amp; content</b> — be found by people already searching for what you do</li>
                  <li><b>Paid advertising</b> — Google and Meta campaigns with budgets that are tracked to the rupee</li>
                  <li><b>Social media management</b> — consistent, on-brand posting and community replies</li>
                  <li><b>Email &amp; WhatsApp campaigns</b> — keep existing customers coming back</li>
                  <li><b>Landing pages &amp; conversion</b> — turn visits into enquiries</li>
                  <li><b>Analytics &amp; reporting</b> — a monthly report you can read in five minutes</li>
                </ul>
              </div>
              <div className="panel-box">
                <h4>A good fit if</h4>
                <ul className="ticks">
                  <li>You have a good product or service, but not enough people know about it</li>
                  <li>You’re spending on ads without knowing what’s working</li>
                  <li>Your social channels are active but not bringing in business</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 BRANDING */}
      <section id="branding">
        <div className="wrap">
          <div className="split">
            <div>
              <div className="kicker">// 03 &middot; branding</div>
              <h2>Branding</h2>
              <p className="lede">
                A brand that looks and sounds like one business everywhere — signage, packaging, social, and screen.
              </p>
              <Link className="btn btn-primary" to="/contact?interest=branding">
                Talk to us about branding
              </Link>
            </div>
            <div>
              <div className="panel-box">
                <h4>What we deliver</h4>
                <ul className="ticks">
                  <li><b>Brand strategy</b> — positioning, audience, and the voice you’ll speak in</li>
                  <li><b>Logo &amp; visual identity</b> — mark, colours, typography, and usage rules</li>
                  <li><b>Brand guidelines</b> — a proper brand book, not a three-page PDF</li>
                  <li><b>Packaging &amp; print</b> — cards, letterheads, labels, and signage artwork</li>
                  <li><b>Digital templates</b> — social posts, presentations, and email signatures</li>
                  <li><b>Website look &amp; feel</b> — the identity carried through to your online presence</li>
                </ul>
              </div>
              <div className="panel-box">
                <h4>A good fit if</h4>
                <ul className="ticks">
                  <li>You’re launching a new business and want to start with a strong identity</li>
                  <li>You’ve outgrown your first logo or your name has changed</li>
                  <li>Your brand looks different on every channel</li>
                </ul>
              </div>
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
            <div className="cell">
              <div className="num">A</div>
              <h3>Fixed-scope project</h3>
              <p>A defined deliverable with a clear timeline and price — a brand identity, a website, an app, a campaign launch.</p>
            </div>
            <div className="cell">
              <div className="num">B</div>
              <h3>Monthly retainer</h3>
              <p>Ongoing marketing, content, or software support for a steady monthly fee, with a report every month.</p>
            </div>
            <div className="cell">
              <div className="num">C</div>
              <h3>Embedded team</h3>
              <p>A dedicated group working alongside your people for larger, longer programmes of work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ paddingBottom: "110px" }}>
        <div className="wrap">
          <div className="cta-banner">
            <h2>Tell us what you’re building.</h2>
            <p>Software, a campaign, a brand, or all three — we’ll tell you honestly what we can do and when.</p>
            <Link to="/contact" className="btn btn-primary btn-lg">
              Talk to our team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
