import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ConsoleDeck from "../components/home/ConsoleDeck";
import HeroVideo from "../components/home/HeroVideo";
import BentoShowcase from "../components/home/BentoShowcase";
import FadeWords from "../components/common/FadeWords";
import QuoteCard from "../components/common/QuoteCard";
import Ticker from "../components/common/Ticker";
import useScrollReveal from "../hooks/useScrollReveal";
import { Magnetic } from "../lib/motion";

const TICKER_ITEMS = [
  "Software that scales",
  "Marketing that converts",
  "Brands that last",
  "One team",
  "No handoffs",
];

const INDUSTRIES = [
  "Supermarkets & retail",
  "Cafés & restaurants",
  "Clinics & healthcare",
  "Education",
  "Real estate",
  "Trade & manufacturing",
  "Start-ups",
];

const WHY_CELLS = [
  {
    id: 1,
    num: "01",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    title: "One team, one brief",
    sub: "Tell us your goals once. The people building the software, running the campaign, and designing the brand all work from the same page.",
    detail: [
      "When software engineers, marketers, and brand designers sit under separate roofs, things inevitably get lost in translation. Technical constraints surprise the creative team, campaigns push features that haven't shipped, and the brand identity looks disjointed across web and ads.",
      "At Clutch Code, every project shares a single technical roadmap, a unified repository, and an aligned creative direction from kickoff through launch.",
    ],
  },
  {
    id: 2,
    num: "02",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    title: "Plain-language everything",
    sub: "No jargon in proposals, reports, or meetings. If we can't explain a decision simply, we haven't finished thinking about it.",
    detail: [
      "We reject consulting buzzwords and vanity jargon. Our specifications, progress memos, and architectural decisions are presented in transparent, executive-level language.",
      "You always know precisely what is being built, why technical trade-offs were chosen, and how every rupee is being allocated.",
    ],
  },
  {
    id: 3,
    num: "03",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
      </svg>
    ),
    title: "Built to be measured",
    sub: "Every piece of work has a number attached — enquiries, hours saved, sales, footfall — so you can see what's earning its keep.",
    detail: [
      "We don't build software or launch marketing campaigns based on abstract feelings. We define hard key performance indicators from week one.",
      "Whether tracking server query latency, cart checkout conversions, customer acquisition cost, or manual hours eliminated by internal automation, work is judged strictly by tangible commercial impact.",
    ],
  },
  {
    id: 4,
    num: "04",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    ),
    title: "We stay after launch",
    sub: "Software needs maintenance, campaigns need tuning, brands need looking after. We're still here when the launch party ends.",
    detail: [
      "Traditional agencies deliver zip files and disappear. Real digital operations begin the day users arrive.",
      "We provide ongoing infrastructure management, security patching, campaign creative rotation, and brand stewardship so your systems remain modern and resilient as your company grows.",
    ],
  },
];

const QUOTES = [
  {
    quote:
      "We had worked with a developer, a marketing freelancer, and a designer before — separately, and it showed. Clutch Code was the first team that built the software, ran the launch campaign, and kept the brand consistent across all of it.",
    name: "Dana Okafor",
    role: "Head of Operations",
  },
  {
    quote:
      "One brief, one team, one point of contact. Our new ordering system was live in eight weeks and our staff actually enjoyed the rollout.",
    name: "Rahul Menon",
    role: "Founder, Retail Group",
  },
  {
    quote:
      "They measured everything. Within a quarter our enquiries doubled and we finally knew which campaigns were worth the money.",
    name: "Priya Nair",
    role: "Marketing Lead",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Discover", text: "We learn how your store, team, and customers actually move before we write a line of code or copy." },
  { num: "02", title: "Plan", text: "A written plan with scope, timeline, and the numbers we'll track — in plain language you can sign off." },
  { num: "03", title: "Build & launch", text: "Software gets built, campaigns get planned, brands get designed — in steps you can see along the way." },
  { num: "04", title: "Grow", text: "We stay on to maintain, measure, and improve — so launch day is a starting line, not a finish line." },
];

const PROMISES = [
  {
    num: "01",
    title: "Software that fits how you work.",
    body: "We build around the way your business already runs, so the tools feel familiar from day one instead of forcing a new process on your team.",
  },
  {
    num: "02",
    title: "Marketing you can actually measure.",
    body: "Every campaign is tracked to real enquiries, bookings, and sales, so you always know exactly what is working and what to change.",
  },
  {
    num: "03",
    title: "A brand that stays consistent.",
    body: "One identity system carried across your signage, packaging, and social feeds, so customers recognise you everywhere they meet you.",
  },
];

const WORK_CARDS = [
  {
    tags: ["Software", "Marketing"],
    title: "Horizon Retail — Inventory dashboard and launch campaign",
    challenge: "Stock for three branches lived in separate spreadsheets, and nobody trusted the totals.",
    did: "Built one internal dashboard, connected supplier data, then ran the launch campaign for the new ordering flow.",
    result: "Weekly stock counts dropped from a full day to under an hour.",
    thumb: (
      <div className="thumb">
        <span className="ln" style={{ top: "20px", width: "90px" }}></span>
        <span className="ln" style={{ top: "34px", width: "60px" }}></span>
        <span className="b" style={{ height: "26px" }}></span>
        <span className="b" style={{ height: "38px" }}></span>
        <span className="b" style={{ height: "32px" }}></span>
        <span className="b" style={{ height: "52px" }}></span>
        <span className="b" style={{ height: "44px" }}></span>
        <span className="b" style={{ height: "66px" }}></span>
      </div>
    ),
  },
  {
    tags: ["Branding"],
    title: "Greenleaf Organics — A brand identity for a regional organic grocer",
    challenge: "A growing grocer with three different logos across signage, bags, and social.",
    did: "Defined the positioning, designed one identity system, and delivered a full brand book with print-ready files.",
    result: "New identity rolled out across stores, packaging, and social in six weeks.",
    thumb: (
      <div className="thumb sw">
        <span className="s" style={{ background: "#5E5DE5" }}></span>
        <span className="s" style={{ background: "#05060A" }}></span>
        <span className="s" style={{ background: "#FFFFFF" }}></span>
        <span className="s" style={{ background: "#8C8BF0" }}></span>
      </div>
    ),
  },
  {
    tags: ["Marketing"],
    title: "Brightside Café — Local search and social growth",
    challenge: "Great coffee, but nobody outside the street knew the café existed.",
    did: "Fixed the local listings, set up a weekly content rhythm, and ran small, measured paid campaigns.",
    result: "Map views and walk-in bookings climbed steadily across the first three months.",
    thumb: (
      <div className="thumb">
        <span className="b" style={{ height: "22px" }}></span>
        <span className="b" style={{ height: "30px" }}></span>
        <span className="b" style={{ height: "28px" }}></span>
        <span className="b" style={{ height: "44px" }}></span>
        <span className="b" style={{ height: "52px" }}></span>
        <span className="b" style={{ height: "70px" }}></span>
        <span className="b" style={{ height: "88px" }}></span>
      </div>
    ),
  },
];

const FAQ_ITEMS = [
  {
    q: "Do I have to buy all three services?",
    a: "No. Plenty of clients start with just one — a website, a campaign, or a brand refresh. The advantage of having all three under one roof shows up when you're ready to add the next.",
  },
  {
    q: "How long does a typical project take?",
    a: "It depends on scope. As a rough guide, a brand identity takes a few weeks, a marketing campaign can be live in under a month, and custom software is usually measured in months. You'll get a written timeline before anything starts.",
  },
  {
    q: "Do you work with small businesses?",
    a: "Yes — most of our clients are small and mid-sized businesses. We'll scope the work to fit, and tell you honestly if something isn't worth doing yet.",
  },
  {
    q: "How do you price your work?",
    a: "Projects are fixed-scope; ongoing marketing and support run monthly. We don't publish a price list because no two businesses need the same thing — you'll get a clear written quote after our first conversation.",
  },
  {
    q: "What happens after launch?",
    a: "We stay on if you want us to: maintaining and improving the software, tuning campaigns against the numbers, and keeping the brand consistent as you grow. If you'd rather take things in-house, we'll hand over cleanly.",
  },
  {
    q: "Who owns the work?",
    a: "You do. Source code, design files, brand assets, and ad accounts are handed over to you.",
  },
];

function BentoWhy() {
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
    };
  }, [active]);

  const cell = active ? WHY_CELLS.find((c) => c.id === active) : null;

  return (
    <>
      <div className="grid c2 why-grid">
        {WHY_CELLS.map((c, i) => (
          <div
            key={c.id}
            className="cell bento-cell"
            tabIndex={0}
            role="button"
            aria-haspopup="dialog"
            data-reveal
            style={{ "--d": `${(i % 2) * 90}ms` }}
            onClick={() => setActive(c.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActive(c.id);
              }
            }}
          >
            <div className="bento-cell-header">
              <div className="bento-icon-box">{c.icon}</div>
              <div className="num">{c.num}</div>
            </div>
            <h3>{c.title}</h3>
            <p>{c.sub}</p>
            <div className="bento-expand-cue">
              <span>Details</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {cell && (
        <div className="bento-modal-overlay is-active" role="dialog" aria-modal="true" aria-hidden="false">
          <div className="bento-modal-backdrop" onClick={() => setActive(null)}></div>
          <div className="bento-modal-container">
            <div className="bento-modal-card">
              <button className="bento-modal-close" aria-label="Close dialog" onClick={() => setActive(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div className="bento-modal-banner">
                <div className="bento-modal-icon">{cell.icon}</div>
              </div>
              <div className="bento-modal-body">
                <div className="bento-modal-head">
                  <div>
                    <div className="bento-modal-num">{cell.num}</div>
                    <h3 className="bento-modal-title">{cell.title}</h3>
                  </div>
                  <Link to="/contact" className="btn btn-primary btn-sm bento-modal-action">
                    Talk to team
                  </Link>
                </div>
                <p className="bento-modal-sub">{cell.sub}</p>
                <div className="bento-modal-content">
                  {cell.detail.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function HomePage() {
  const rootRef = useRef(null);
  useScrollReveal(rootRef);

  const handleCardMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <main ref={rootRef}>
      <section className="hero-master" style={{ borderTop: "none" }}>
        <HeroVideo />

        <div className="hero-orbs" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className="hero-content">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">// software &middot; marketing &middot; branding</div>
              <h1>
                <span className="line">Everything</span>
                <span className="line">clicks into <span className="accent">place</span>.</span>
              </h1>
              <p className="lede">
                Clutch Code builds the systems growing businesses run on — custom software, the marketing that brings people to it, and the brand that makes them stay. One team, three practices, built to work together from day one.
              </p>
              <div className="hero-ctas">
                <Magnetic strength={10}>
                  <Link to="/contact" className="btn btn-primary btn-lg">
                    Talk to our team
                  </Link>
                </Magnetic>
                <Magnetic strength={10}>
                  <Link to="/services" className="btn btn-ghost btn-lg">
                    See what we do
                  </Link>
                </Magnetic>
              </div>
              <div className="trust">one team for the software, the marketing, and the brand</div>
              <span className="hero-scroll-cue" aria-hidden="true">scroll</span>
            </div>

            <ConsoleDeck />
          </div>
        </div>
      </section>

      {/* INDUSTRIES STRIP */}
      <div className="industries-strip">
        <div className="wrap strip-reveal">
          <div className="kicker strip-reveal-item">// who we work with</div>
          <div className="chips strip-reveal-item" style={{ "--d": "90ms" }}>
            {INDUSTRIES.map((name) => (
              <span key={name} className="chip chip-static">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* TICKER */}
      <Ticker items={TICKER_ITEMS} />

      {/* THREE PRACTICES BENTO — TAILWIND + FRAMER MOTION */}
      <BentoShowcase />

      {/* THREE PROMISES — WORD-BY-WORD FADE */}
      <section id="promises">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="kicker">// built around you</div>
            <h2>Three promises we keep.</h2>
            <p className="section-sub">The same three things, every single project.</p>
          </div>
          <div className="grid c3 promise-grid">
            {PROMISES.map((b) => (
              <div className="cell promise-cell" key={b.num}>
                <div className="num">{b.num}</div>
                <h3>
                  <FadeWords>{b.title}</FadeWords>
                </h3>
                <p>
                  <FadeWords stagger={45}>{b.body}</FadeWords>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CLUTCH CODE */}
      <section id="why">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="kicker">// why clutch code</div>
            <h2>Fewer handoffs. Fewer surprises.</h2>
            <p className="section-sub">Most projects go wrong in the gaps between people. We're set up to close them.</p>
          </div>
          <BentoWhy />
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="paper-substrate">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="kicker">// how we work</div>
            <h2>We learn the business first.</h2>
            <p className="section-sub">Most proposals skip straight to the pitch. We don't.</p>
          </div>
          <div className="steps four">
            {PROCESS_STEPS.map((s, i) => (
              <div key={s.num} className="step" data-reveal style={{ "--d": `${i * 110}ms` }}>
                <div className="step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section id="work">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="kicker">// selected work</div>
            <h2>Recent projects.</h2>
            <p className="section-sub">A few examples of what "one team" looks like in practice.</p>
          </div>
          <div className="cards">
            {WORK_CARDS.map((w, i) => (
              <article key={w.title} className="card" data-reveal style={{ "--d": `${(i % 2) * 90}ms` }} onMouseMove={handleCardMove}>
                {w.thumb}
                <div className="card-body">
                  <div className="tags">
                    {w.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3>{w.title}</h3>
                  <p><b>Challenge.</b> {w.challenge}</p>
                  <p><b>What we did.</b> {w.did}</p>
                  <div className="result">{w.result}</div>
                </div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: "34px" }} data-reveal>
            <Link className="btn btn-ghost" to="/work">
              See all work
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section>
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="kicker">// what clients say</div>
            <h2>Trusted by teams who wanted one partner.</h2>
          </div>
          <div className="quotes-grid">
            {QUOTES.map((q) => (
              <QuoteCard key={q.name} quote={q.quote} name={q.name} role={q.role} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="kicker">// questions</div>
            <h2>Things people ask first.</h2>
          </div>
          <div className="faq">
            {FAQ_ITEMS.map((item, i) => (
              <details className="q" key={item.q} data-reveal style={{ "--d": `${i * 60}ms` }}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ paddingBottom: "110px" }}>
        <div className="wrap">
          <div className="cta-banner" data-reveal>
            <h2>Tell us what you're building.</h2>
            <p>Software, a campaign, a brand, or all three — we'll tell you honestly what we can do and when.</p>
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
