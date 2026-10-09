import React, { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    name: "Operations Portal — Horizon Retail",
    kicker: "// practice 01 — core software",
    pill: "RELEASE ACTIVE",
    pillClass: "",
    windowId: "terminal: node-03.us-east.horizon",
    winLabel: "MEMORY",
    winVal: "42%",
    winOk: false,
    kind: "software",
    chips: [
      { icon: "⚡", l: "CONCURRENT USERS", n: "1,204" },
      { icon: "🛡", l: "UPTIME SLA", n: "99.98%", ok: true },
      { icon: "⏱", l: "QUERY LATENCY", n: "48ms" },
    ],
    plan: [
      { phase: "Discover", pct: 100, done: true },
      { phase: "Build", pct: 64 },
      { phase: "Launch", pct: 12 },
    ],
    eta: "8 WEEKS",
    foot: "Every milestone reviewed end-to-end by the same team.",
  },
  {
    name: "Q3 Customer Acquisition Campaign",
    kicker: "// practice 02 — growth marketing",
    pill: "CAMPAIGN RUNNING",
    pillClass: "pill-lime",
    windowId: "analytics: pipeline-meta-v2",
    winLabel: "ROAS",
    winVal: "4.8x",
    winOk: true,
    kind: "marketing",
    bars: [21, 29, 25, 36, 32, 44, 52],
    chipNote: "+34% vs last week",
    chips: [
      { icon: "📊", l: "REACH", n: "8.2k" },
      { icon: "📞", l: "BOOKED CALLS", n: "412", ok: true },
      { icon: "📈", l: "CTR", n: "5.0%" },
    ],
    plan: [
      { phase: "Discover", pct: 100, done: true },
      { phase: "Build", pct: 85 },
      { phase: "Launch", pct: 30 },
    ],
    eta: "6 WEEKS",
    foot: "Funnel tracked weekly to booked calls and revenue.",
  },
  {
    name: "Kairali Organics — Brand System",
    kicker: "// practice 03 — brand identity",
    pill: "GUIDELINES DELIVERED",
    pillClass: "pill-brand",
    windowId: "tokens: figma.tokens.export",
    winLabel: "PASS",
    winVal: "AAA",
    winOk: false,
    kind: "brand",
    chips: [
      { icon: "🎨", l: "TOKENS", n: "120" },
      { icon: "🔤", l: "TYPE PAIRINGS", n: "3" },
      { icon: "🏷", l: "SWATCHES", n: "24" },
    ],
    plan: [
      { phase: "Discover", pct: 100, done: true },
      { phase: "Build", pct: 100, done: true },
      { phase: "Launch", pct: 45 },
    ],
    eta: "4 WEEKS",
    foot: "Identity exported as tokens for every surface.",
  },
];

function ProjectChips({ chips }) {
  return (
    <div className="stat-row">
      {chips.map((c) => (
        <div className="stat-chip" key={c.l}>
          <div className="stat-chip-top">
            <span className="stat-icon">{c.icon}</span>
            <span className="l">{c.l}</span>
          </div>
          <div className={`n${c.ok ? " glow-ok" : ""}`}>{c.n}</div>
        </div>
      ))}
    </div>
  );
}

export default function ConsoleDeck() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [tabProgress, setTabProgress] = useState(0);
  const consoleRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;
    const step = 50;
    const duration = 4000;
    const timer = setInterval(() => {
      setTabProgress((prev) => {
        if (prev >= 100) {
          setActiveTab((t) => (t + 1) % PROJECTS.length);
          return 0;
        }
        return prev + (step / duration) * 100;
      });
    }, step);

    return () => clearInterval(timer);
  }, [isPaused, activeTab]);

  const selectTab = (index) => {
    setActiveTab(index);
    setTabProgress(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      selectTab((activeTab + 1) % PROJECTS.length);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      selectTab((activeTab - 1 + PROJECTS.length) % PROJECTS.length);
    }
  };

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

  const active = PROJECTS[activeTab];

  return (
    <div
      className="console"
      id="console"
      ref={consoleRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      tabIndex="0"
      onKeyDown={handleKeyDown}
      role="region"
      aria-label="Interactive Disciplines Console"
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
        {PROJECTS.map((p, i) => (
          <button
            key={p.name}
            className={`tab-btn ${activeTab === i ? "active" : ""}`}
            type="button"
            role="tab"
            aria-selected={activeTab === i}
            onClick={() => selectTab(i)}
          >
            <span className="tdot"></span>
            {i === 0 ? "Software Engineering" : i === 1 ? "Digital Marketing" : "Brand Identity"}
            {activeTab === i && (
              <span
                className="tab-progress-line"
                style={{ width: `${tabProgress}%` }}
                aria-hidden="true"
              ></span>
            )}
          </button>
        ))}
      </div>

      <div className="console-body">
        {PROJECTS.map((p, i) => (
          <div key={p.name} className={`panel ${activeTab === i ? "active" : ""}`} data-panel={i} role="tabpanel">
            <div className="panel-meta-row">
              <span className="panel-kicker">{p.kicker}</span>
              <span className={`panel-pill ${p.pillClass}`}>{p.pill}</span>
            </div>
            <div className="panel-title">{p.name}</div>

            <div className="mock-window">
              <div className="mock-window-bar">
                <div className="window-controls"><span></span><span></span><span></span></div>
                <span className="window-id">{p.windowId}</span>
                <span className={`window-metric${p.winOk ? " glow-accent" : ""}`}>
                  {p.winLabel} <b>{p.winVal}</b>
                </span>
              </div>
              <div className="mock-window-body">
                {p.kind === "software" && (
                  <>
                    <ProjectChips chips={p.chips} />
                    <div className="flow-graph">
                      <div className="flow-meta">
                        <span>TRANSACTIONS PER SEC</span>
                        <span className="glow-accent">4.8k ops/s</span>
                      </div>
                      <div className="flow-chart">
                        <svg viewBox="0 0 400 50" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#5E5DE5" stopOpacity="0.45" />
                              <stop offset="100%" stopColor="#5E5DE5" stopOpacity="0.0" />
                            </linearGradient>
                          </defs>
                          <path d="M0,40 Q60,10 120,28 T240,15 T340,32 T400,8 L400,50 L0,50 Z" fill="url(#sparkGrad)" />
                          <path className="animated-spark-path" d="M0,40 Q60,10 120,28 T240,15 T340,32 T400,8" fill="none" stroke="#C8FF3D" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>
                  </>
                )}

                {p.kind === "marketing" && (
                  <>
                    <div className="bar-label-row">
                      <span>CONVERSION PACING</span>
                      <span className="spark-tag">{p.chipNote}</span>
                    </div>
                    <div className="bars" id="barRow" aria-label="Marketing performance graph">
                      {p.bars.map((h, bi) => (
                        <div
                          key={bi}
                          className="bar animated-grow-bar"
                          style={{ "--h": `${h}px`, height: `${h}px`, "--stagger-i": bi }}
                          role="img"
                          aria-label={`Bar ${h}px`}
                        />
                      ))}
                    </div>
                    <ProjectChips chips={p.chips} />
                  </>
                )}

                {p.kind === "brand" && (
                  <>
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
                  </>
                )}
              </div>
            </div>

            <div className="plan">
              <div className="plan-head">
                <span>PROJECT PLAN // 3 PHASES</span>
                <span className="plan-eta">EST. {p.eta}</span>
              </div>
              <div className="plan-rows">
                {p.plan.map((pl) => (
                  <div className="plan-row" key={pl.phase}>
                    <div className="plan-label">
                      <span>{pl.phase}</span>
                      <span className={`plan-pct${pl.done ? " glow-ok" : ""}`}>{pl.pct}%</span>
                    </div>
                    <div className="plan-track">
                      <span style={{ width: `${pl.pct}%` }}></span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="plan-foot">
                <span className="hud-beacon"></span>
                <span>{p.foot}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
