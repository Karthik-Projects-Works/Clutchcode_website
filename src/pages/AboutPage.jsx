import React from "react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">// about</div>
          <h1>A small team that dislikes handoffs.</h1>
          <p className="lede">
            Clutch Code is a software, digital marketing, and branding company. We exist so that businesses don’t have to translate between three different vendors.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="broadsheet-layout">
            <div className="prose">
              <div className="kicker">// our story</div>
              <h2>Why one team?</h2>
              <p>
                Most businesses end up hiring a developer, a marketer, and a designer — separately. Then they spend months playing messenger between them, repeating the same brief and fixing things that fell into the gaps.
              </p>
              <p>
                <b>We built Clutch Code to close those gaps.</b> The people building your software, running your campaigns, and designing your brand sit in the same team and work from the same plan.
              </p>
              <p>
                We also build our own product, ClutchKart, a management platform for supermarkets. It keeps us honest: we know what it takes to ship, support, and improve something real, not just advise on it.
              </p>
            </div>
            <aside className="margin-rail" aria-label="Manifesto Margin Notes">
              <div className="spec-item">
                <b>// MANIFESTO NOTE 01</b>
                Software and branding built apart always produce friction at the seam.
              </div>
              <div className="spec-item">
                <b>// TOLERANCE</b>
                Zero handoffs between agency and development shop. Single responsible lead.
              </div>
              <div className="spec-item">
                <b>// PRODUCTION</b>
                Headquarters: Bangalore, India &middot; Built for Indian retail, clinical, and enterprise operations.
              </div>
            </aside>
          </div>
          <div className="big-mark" style={{ marginTop: "48px" }}>
            <img src="/assets/logo.png" alt="Clutch Code mark" />
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">// what guides us</div>
            <h2>Three ideas we work by.</h2>
          </div>
          <div className="grid c3">
            <div className="cell">
              <div className="num">01</div>
              <h3>Precision</h3>
              <p>Clean geometry, sharp details, no ornament for its own sake. The small things are the job.</p>
            </div>
            <div className="cell">
              <div className="num">02</div>
              <h3>Momentum</h3>
              <p>We ship in steps you can see. Progress you can point at beats a big reveal at the end.</p>
            </div>
            <div className="cell">
              <div className="num">03</div>
              <h3>Confidence</h3>
              <p>We’ll tell you honestly what will work, what won’t, and what isn’t worth doing yet.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="split">
            <div>
              <div className="kicker">// the mark</div>
              <h2>Why the logo looks like that.</h2>
              <p className="lede">
                Two interlocking blades turn around a single point. It’s the moment separate pieces lock together — software, marketing, and brand, all clicking into place.
              </p>
            </div>
            <div className="panel-box">
              <h4>How we work</h4>
              <ul className="ticks">
                <li><b>One lead per project</b> — a single person who knows the whole picture</li>
                <li><b>Written plans</b> — scope, timeline, and success measures before work starts</li>
                <li><b>Regular check-ins</b> — short, on a fixed day, with something to show</li>
                <li><b>Plain reporting</b> — numbers you can read without a glossary</li>
                <li><b>Clean handover</b> — you own the work and can take it elsewhere</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ paddingBottom: "110px" }}>
        <div className="wrap">
          <div className="cta-banner">
            <h2>Ready to talk?</h2>
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
