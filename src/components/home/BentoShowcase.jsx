import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, MotionConfig, useMotionValue, useSpring } from "framer-motion";

const EASE = [0.21, 0.47, 0.32, 0.98];
const VIEWPORT = { once: true, margin: "-80px 0px" };

const headerVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stageVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

const listVariant = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const liVariant = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
};

const CAPABILITIES = [
  <><b>Point of sale &amp; billing</b> — fast checkout with barcode and weighing scale support</>,
  <><b>Inventory management</b> — stock levels, expiry tracking, and purchase orders</>,
  <><b>Reports &amp; analytics</b> — daily sales, margins, and fast-moving items</>,
];

function PracticeCell({ className, num, tag, title, body, children, to }) {
  const spotRef = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18, mass: 0.4 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18, mass: 0.4 });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (spotRef.current) {
      spotRef.current.style.setProperty("--sx", `${e.clientX - rect.left}px`);
      spotRef.current.style.setProperty("--sy", `${e.clientY - rect.top}px`);
    }
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 5);
    rx.set((0.5 - py) * 5);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      variants={cardVariant}
      className={`cell ckg-card ${className}`}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <div ref={spotRef} className="ckg-spot" aria-hidden="true" />
      <div className="bento-cell-header">
        <span className="num">{num}</span>
        <span className="tag-bracket">{tag}</span>
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
      {children}
      <Link to={to} className="inline-action">
        Learn more &rarr;
      </Link>
    </motion.div>
  );
}

export default function BentoShowcase() {
  return (
    <MotionConfig reducedMotion="user">
      <section aria-label="Three things that work better together">
        <div className="wrap">
          <motion.div
            className="section-head"
            variants={headerVariant}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <div className="kicker">// one team &middot; three practices</div>
            <h2>Three things that work better together.</h2>
            <p className="section-sub">
              Most businesses hire three different vendors and spend their own time connecting them. We do all three under one roof.
            </p>
          </motion.div>

          <motion.div
            className="grid bento-layout"
            variants={stageVariant}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
          >
            <PracticeCell
              className="bento-hero"
              num="01"
              tag="[ CORE ]"
              title="Software Solutions"
              body="Custom applications, business systems, and tools built for how your business actually operates — not off-the-shelf software you have to work around."
              to="/services#software"
            >
              <div className="micro-preview">
                <span className="mono-badge">REACT &middot; NODE &middot; PYTHON &middot; POSTGRES</span>
              </div>
            </PracticeCell>

            <PracticeCell
              className="bento-accent"
              num="02"
              tag="[ GROWTH ]"
              title="Digital Marketing"
              body="Campaigns, SEO, and content that bring the right people to your business — tracked to actual enquiries and sales, not vanity impressions."
              to="/services#marketing"
            />

            <PracticeCell
              className="bento-light"
              num="03"
              tag="[ IDENTITY ]"
              title="Branding"
              body="Visual identity, messaging, and brand guidelines that make your business look like one company everywhere customers see it."
              to="/services#branding"
            />

            <motion.div variants={cardVariant} className="cell bento-full ckg-card">
              <div className="ckg-beam" aria-hidden="true" />
              <div className="spec-header">
                <span>OUR OWN PRODUCT &middot; PROOF OF WORK</span>
                <span className="spec-tag">
                  <span className="ck-dot" aria-hidden="true"></span>
                  v2.4 STABLE
                </span>
              </div>
              <div className="split">
                <div>
                  <div className="kicker">// built by clutch code</div>
                  <h2>ClutchKart — for supermarkets.</h2>
                  <p className="lede">
                    We don't just build software for clients — we run our own. ClutchKart is a complete management system built specifically for supermarkets and grocery retail.
                  </p>
                  <Link to="/clutchkart" className="btn btn-primary ckg-shine">
                    See ClutchKart &rarr;
                  </Link>
                </div>
                <div className="panel-box">
                  <h4>Key capabilities</h4>
                  <motion.ul className="ticks" variants={listVariant}>
                    {CAPABILITIES.map((item, i) => (
                      <motion.li key={i} variants={liVariant}>
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}