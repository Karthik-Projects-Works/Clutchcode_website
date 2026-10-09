import React, { useState, useEffect, useRef } from "react";

export default function ConsoleDeck() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 3);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleMouseMove = (e) => {
    if (!consoleRef.current || window.innerWidth < 800) return;
    const rect = consoleRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    consoleRef.current.style.transform = `perspective(1200px) rotateY(${(x * 6).toFixed(2)}deg) rotateX(${(-y * 6).toFixed(2)}deg) translateZ(4px)`;
  };

  const handleMouseLeave = () => {
    if (!consoleRef.current) return;
    consoleRef.current.style.transform = "perspective(1200px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
    setIsPaused(false);
  };

  return (
    <div
      className="console"
      id="console"
      ref={consoleRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
    >
      <span className="hud-bracket hb-tl"></span>
      <span className="hud-bracket hb-tr"></span>
      <span className="hud-bracket hb-bl"></span>
      <span className="hud-bracket hb-br"></span>

      <div className="console-hud-status">
        <div className="hud-status-left">
          <span className="hud-beacon"></span>
          <span className="hud-label">LIVE SYSTEM</span>
          <span className="hud-spec">HORIZON // ARCHITECTURE v2.4</span>
        </div>
        <div className="hud-status-right">
          <span className="hud-telemetry">LATENCY <b className="glow-accent">14ms</b></span>
          <span className="hud-telemetry">STATUS <b className="glow-ok">OPTIMAL</b></span>
        </div>
      </div>

      <div className="console-bar" role="tablist" aria-label="Services console tabs">
        <button
          className={`tab-btn ${activeTab === 0 ? "active" : ""}`}
          type="button"
          role="tab"
          aria-selected={activeTab === 0}
          onClick={() => setActiveTab(0)}
        >
          <span className="tdot"></span>Software Engineering
        </button>
        <button
          className={`tab-btn ${activeTab === 1 ? "active" : ""}`}
          type="button"
          role="tab"
          aria-selected={activeTab === 1}
          onClick={() => setActiveTab(1)}
        >
          <span className="tdot"></span>Digital Marketing
        </button>
        <button
          className={`tab-btn ${activeTab === 2 ? "active" : ""}`}
          type="button"
          role="tab"
          aria-selected={activeTab === 2}
          onClick={() => setActiveTab(2)}
        >
          <span className="tdot"></span>Brand Identity
        </button>
      </div>

      <div className="console-body">
        {/* Panel 0: Software */}
        <div className={`panel ${activeTab === 0 ? "active" : ""}`} data-panel="0">
          <div className="panel-meta-row">
            <span className="panel-kicker">// practice 01 — core software</span>
            <span className="panel-pill">RELEASE ACTIVE</span>
          </div>
          <div className="panel-title">Operations Portal — Horizon Retail</div>

          <div className="mock-window">
            <div className="mock-window-bar">
              <div className="window-controls"><span></span><span></span><span></span></div>
              <span className="window-id">terminal: node-03.us-east.horizon</span>
              <span className="window-metric">MEMORY <b>42%</b></span>
            </div>
            <div className="mock-window-body">
              <div className="stat-row">
                <div className="stat-chip">
                  <div className="stat-chip-top"><span className="stat-icon">⚡</span><span className="l">CONCURRENT USERS</span></div>
                  <div className="n">1,204</div>
                </div>
                <div className="stat-chip">
                  <div className="stat-chip-top"><span className="stat-icon">🛡</span><span className="l">UPTIME SLA</span></div>
                  <div className="n glow-ok">99.98%</div>
                </div>
                <div className="stat-chip">
                  <div className="stat-chip-top"><span className="stat-icon">⏱</span><span className="l">QUERY LATENCY</span></div>
                  <div className="n">48ms</div>
                </div>
              </div>
              <div className="flow-graph">
                <div className="flow-meta"><span>TRANSACTIONS PER SEC</span><span className="glow-accent">4.8k ops/s</span></div>
                <div className="flow-chart">
                  <svg viewBox="0 0 400 50" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#5E5DE5" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#5E5DE5" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,40 Q60,10 120,28 T240,15 T340,32 T400,8 L400,50 L0,50 Z" fill="url(#sparkGrad)" />
                    <path d="M0,40 Q60,10 120,28 T240,15 T340,32 T400,8" fill="none" stroke="#C8FF3D" strokeWidth="2" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 1: Marketing */}
        <div className={`panel ${activeTab === 1 ? "active" : ""}`} data-panel="1">
          <div className="panel-meta-row">
            <span className="panel-kicker">// practice 02 — growth marketing</span>
            <span className="panel-pill pill-lime">CAMPAIGN RUNNING</span>
          </div>
          <div className="panel-title">Q3 Customer Acquisition Campaign</div>

          <div className="mock-window">
            <div className="mock-window-bar">
              <div className="window-controls"><span></span><span></span><span></span></div>
              <span className="window-id">analytics: pipeline-meta-v2</span>
              <span className="window-metric glow-accent">ROAS <b>4.8x</b></span>
            </div>
            <div className="mock-window-body">
              <div className="bar-label-row">
                <span>CONVERSION PACING</span>
                <span className="spark-tag">+34% vs last week</span>
              </div>
              <div className="bars" id="barRow" aria-label="Marketing performance graph">
                {[21, 29, 25, 36, 32, 44, 52].map((h, i) => (
                  <div key={i} className="bar" style={{ height: `${h}px` }} role="img" aria-label={`Bar ${h}px`}></div>
                ))}
              </div>
              <div className="stat-row" style={{ marginTop: "14px" }}>
                <div className="stat-chip">
                  <div className="stat-chip-top"><span className="stat-icon">👥</span><span className="l">REACH</span></div>
                  <div className="n">8.2k</div>
                </div>
                <div className="stat-chip">
                  <div className="stat-chip-top"><span className="stat-icon">📞</span><span className="l">BOOKED CALLS</span></div>
                  <div className="n glow-ok">412</div>
                </div>
                <div className="stat-chip">
                  <div className="stat-chip-top"><span className="stat-icon">🎯</span><span className="l">CTR</span></div>
                  <div className="n">5.0%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: Branding */}
        <div className={`panel ${activeTab === 2 ? "active" : ""}`} data-panel="2">
          <div className="panel-meta-row">
            <span className="panel-kicker">// practice 03 — brand identity</span>
            <span className="panel-pill pill-brand">GUIDELINES DELIVERED</span>
          </div>
          <div className="panel-title">Kairali Organics — Brand System</div>

          <div className="mock-window">
            <div className="mock-window-bar">
              <div className="window-controls"><span></span><span></span><span></span></div>
              <span className="window-id">tokens: figma.tokens.export</span>
              <span className="window-metric">PASS <b>AAA</b></span>
            </div>
            <div className="mock-window-body">
              <div className="swatch-strip">
                <div className="swatch" style={{ background: "var(--brand)" }}><span>#5E5DE5</span></div>
                <div className="swatch" style={{ background: "var(--ink)" }}><span>#05060A</span></div>
                <div className="swatch" style={{ background: "var(--paper)" }}><span style={{ color: "#05060A" }}>#EDEBE4</span></div>
                <div className="swatch" style={{ background: "var(--signal-lime)" }}><span style={{ color: "#05060A" }}>#C8FF3D</span></div>
              </div>
              <div className="type-specimen">
                <div className="specimen-item">
                  <span className="type-meta">Display / Title</span>
                  <span className="type-preview serif">Space Grotesk &middot; Bold</span>
                </div>
                <div className="specimen-item">
                  <span className="type-meta">Body / Reading</span>
                  <span className="type-preview">DM Sans &middot; 400 Regular</span>
                </div>
                <div className="specimen-item">
                  <span className="type-meta">Terminal / Monospace</span>
                  <span className="type-preview mono">JetBrains Mono &middot; 500</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
