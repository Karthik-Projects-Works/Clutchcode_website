import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FadeWords from "../components/common/FadeWords";
import useScrollReveal from "../hooks/useScrollReveal";
import { Magnetic, RevealText } from "../lib/motion";
import { EASE_SPRING } from "../lib/motion/config";

const TIMELINE = [
  { phase: "01", name: "Discovery", copy: "We map how your business runs today — the tools, the gaps, and the real goal behind the brief." },
  { phase: "02", name: "Architecture", copy: "One written plan across software, marketing, and brand, so every piece fits before work starts." },
  { phase: "03", name: "Execution", copy: "Sprints and campaigns on a fixed cadence. Progress you can point at, not a big reveal at the end." },
  { phase: "04", name: "Growth", copy: "Post-launch tuning, plain reports, and the next round of improvements decided on evidence." },
];

const timelineItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_SPRING } },
};

export default function AboutPage() {
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  return (
    <main className="ab" ref={rootRef}>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">// about</div>
          <RevealText as="h1" lines={["A small team that", "dislikes handoffs."]} />
          <p className="lede">
            Clutch Code is a software, digital marketing, and branding company. We exist so that businesses don’t have to translate between three different vendors.
          </p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="broadsheet-layout" data-reveal>
            <div className="prose">
              <div className="kicker">// our story</div>
              <h2><FadeWords>Why one team?</FadeWords></h2>
              <p data-reveal>
                Most businesses end up hiring a developer, a marketer, and a designer — separately. Then they spend months playing messenger between them, repeating the same brief and fixing things that fell into the gaps.
              </p>
              <p data-reveal style={{ "--d": "80ms" }}>
                <b>We built Clutch Code to close those gaps.</b> The people building your software, running your campaigns, and designing your brand sit in the same team and work from the same plan.
              </p>
              <p data-reveal style={{ "--d": "160ms" }}>
                We also build our own product, ClutchKart, a management platform for supermarkets. It keeps us honest: we know what it takes to ship, support, and improve something real, not just advise on it.
              </p>
            </div>
            <aside className="margin-rail" aria-label="Manifesto Margin Notes">
              <div className="spec-item" data-reveal>
                <b>// MANIFESTO NOTE 01</b>
                Software and branding built apart always produce friction at the seam.
              </div>
              <div className="spec-item" data-reveal style={{ "--d": "80ms" }}>
                <b>// TOLERANCE</b>
                Zero handoffs between agency and development shop. Single responsible lead.
              </div>
              <div className="spec-item" data-reveal style={{ "--d": "160ms" }}>
                <b>// PRODUCTION</b>
                Headquarters: Bangalore, India &middot; Built for Indian retail, clinical, and enterprise operations.
              </div>
            </aside>
          </div>
          <div className="big-mark" data-reveal style={{ marginTop: "48px" }}>
            <img src="/assets/logo.png" alt="Clutch Code mark" />
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="kicker">// how an engagement runs</div>
            <h2><FadeWords>Four phases, one plan.</FadeWords></h2>
          </div>
          <motion.div
            className="process-timeline"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.14 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px 0px" }}
          >
            <motion.span
              className="process-line"
              aria-hidden="true"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-60px 0px" }}
              transition={{ duration: 1.1, ease: EASE_SPRING }}
              style={{ transformOrigin: "top" }}
            />
            {TIMELINE.map((step) => (
              <motion.div className="process-step" variants={timelineItem} key={step.phase}>
                <div className="process-node">
                  <span className="process-phase">{step.phase}</span>
                  <span className="process-dot" aria-hidden="true" />
                </div>
                <div className="process-card">
                  <h3>{step.name}</h3>
                  <p>{step.copy}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="kicker">// what guides us</div>
            <h2><FadeWords>Three ideas we work by.</FadeWords></h2>
          </div>
          <div className="grid c3">
            <div className="cell" data-reveal>
              <div className="num">01</div>
              <h3>Precision</h3>
              <p>Clean geometry, sharp details, no ornament for its own sake. The small things are the job.</p>
            </div>
            <div className="cell" data-reveal style={{ "--d": "80ms" }}>
              <div className="num">02</div>
              <h3>Momentum</h3>
              <p>We ship in steps you can see. Progress you can point at beats a big reveal at the end.</p>
            </div>
            <div className="cell" data-reveal style={{ "--d": "160ms" }}>
              <div className="num">03</div>
              <h3>Confidence</h3>
              <p>We’ll tell you honestly what will work, what won’t, and what isn’t worth doing yet.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="split" data-reveal>
            <div>
              <div className="kicker">// the mark</div>
              <h2><FadeWords>Why the logo looks like that.</FadeWords></h2>
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

      <section>
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="kicker">// the team</div>
            <h2><FadeWords>The people behind the work.</FadeWords></h2>
          </div>
          <div className="team-ledger" data-reveal>
            <div className="team-row">
              <div className="t-name">[Name]</div>
              <div className="t-role">Founder &middot; Software Lead</div>
              <div className="t-bio">Leads engineering and keeps every project grounded in how the business actually runs.</div>
            </div>
            <div className="team-row">
              <div className="t-name">[Name]</div>
              <div className="t-role">Head of Marketing</div>
              <div className="t-bio">Plans and runs campaigns, and makes sure every rupee spent is tied to a result.</div>
            </div>
            <div className="team-row">
              <div className="t-name">[Name]</div>
              <div className="t-role">Brand &amp; Design Director</div>
              <div className="t-bio">Shapes identities and keeps the look and voice consistent across every channel.</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ paddingBottom: "110px" }}>
        <div className="wrap">
          <div className="cta-banner" data-reveal>
            <h2>Ready to talk?</h2>
            <p>Tell us what you’re working on. We’ll tell you honestly what we can do and what it will take.</p>
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
