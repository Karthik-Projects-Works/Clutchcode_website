import React, { useState } from "react";
import { Link } from "react-router-dom";

const FAQS = [
  {
    q: "Can ClutchKart work when the internet is down?",
    a: "Yes. ClutchKart has a local offline mode that stores transactions and synchronises automatically when your connection is restored."
  },
  {
    q: "Can I manage multiple branch stores from one account?",
    a: "Yes. ClutchKart supports multi-store operations with central inventory, branch-to-branch transfers, and aggregated reporting."
  },
  {
    q: "Does ClutchKart integrate with barcode scanners and receipt printers?",
    a: "Yes. ClutchKart works with standard USB and Bluetooth barcode scanners, thermal receipt printers, and digital weighing scales."
  }
];

export default function ClutchKartPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">// proprietary software &middot; retail</div>
          <h1>ClutchKart — Built for supermarkets that move fast.</h1>
          <p className="lede">
            A complete retail management and billing platform designed specifically for grocery stores, supermarkets, and multi-lane retail. Fast checkout, accurate stock, and clear reports.
          </p>
          <div className="hero-ctas">
            <Link to="/contact?interest=clutchkart" className="btn btn-primary btn-lg">
              Book a live demo
            </Link>
            <a href="#features" className="btn btn-ghost btn-lg">
              See key capabilities
            </a>
          </div>
        </div>
      </section>

      {/* POS SCREEN SIMULATION */}
      <section style={{ borderTop: "none", paddingTop: "0" }}>
        <div className="wrap">
          <div className="pos-screen" id="posScreen">
            <div className="pos-header">
              <span className="live-dot"></span>
              <span className="mono">CLUTCHKART v2.4 // TERMINAL 01 // ONLINE</span>
              <span className="pos-status">READY FOR SCAN</span>
            </div>
            <div className="pos-body">
              <div className="pos-col">
                <div className="pos-label">CURRENT TRANSACTION</div>
                <div className="pos-item"><span>Aashirvaad Atta 5kg</span><b>₹275.00</b></div>
                <div className="pos-item"><span>Amul Butter 500g</span><b>₹285.00</b></div>
                <div className="pos-item"><span>Tata Salt 1kg</span><b>₹28.00</b></div>
                <div className="pos-total"><span>TOTAL (3 ITEMS)</span><b>₹588.00</b></div>
              </div>
              <div className="pos-col">
                <div className="pos-label">STORE TELEMETRY</div>
                <div className="pos-metric"><span>TODAY’S BILLS</span><b>412</b></div>
                <div className="pos-metric"><span>AVG BILL SPEED</span><b>42 sec</b></div>
                <div className="pos-metric"><span>LOW-STOCK ALERTS</span><b style={{ color: "var(--signal-lime)" }}>2</b></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features">
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">// core capabilities</div>
            <h2>Everything a supermarket needs to run smoothly.</h2>
          </div>
          <div className="grid c3">
            <div className="cell">
              <div className="num">01</div>
              <h3>Point of sale &amp; billing</h3>
              <p>Barcode scanning, weighing scale integration, split payments (cash, card, UPI), and thermal receipt printing in seconds.</p>
            </div>
            <div className="cell">
              <div className="num">02</div>
              <h3>Inventory &amp; stock alerts</h3>
              <p>Real-time stock counts, low-stock warnings, batch and expiry date tracking, and automated purchase order generation.</p>
            </div>
            <div className="cell">
              <div className="num">03</div>
              <h3>Daily sales &amp; margin reports</h3>
              <p>Clear, one-page reports on daily turnover, top-selling items, margin by category, and peak-hour customer traffic.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ paddingBottom: "110px" }}>
        <div className="wrap">
          <div className="section-head">
            <div className="kicker">// questions</div>
            <h2>Frequently asked questions.</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div
                key={i}
                className={`panel-box ${openFaq === i ? "active" : ""}`}
                style={{ marginBottom: "16px", cursor: "pointer" }}
                onClick={() => toggleFaq(i)}
              >
                <h4 style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: openFaq === i ? "12px" : "0" }}>
                  <span>{f.q}</span>
                  <span style={{ color: "var(--brand)", fontSize: "20px" }}>{openFaq === i ? "-" : "+"}</span>
                </h4>
                {openFaq === i && <p style={{ color: "var(--grey)", marginTop: "8px", marginBottom: 0 }}>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
