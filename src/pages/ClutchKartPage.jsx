import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import FadeWords from "../components/common/FadeWords";

const TICKER_ITEMS = [
  "Online storefront",
  "WhatsApp ordering",
  "Fast billing & POS",
  "Live inventory",
  "Home delivery",
  "Store pickup",
  "Offers & coupons",
  "Loyalty rewards",
  "Multi-branch"
];

const STATS = [
  { to: 0, prefix: "", suffix: "%", label: "Marketplace commission" },
  { to: 100, prefix: "", suffix: "%", label: "Of every sale stays yours" },
  { to: 500, prefix: "", suffix: "+", label: "Branches per network" },
  { to: 3200, prefix: "", suffix: "+", label: "Products ready to sell" }
];

const ICONS = {
  store: (
    <>
      <path d="M4 4h16l-1 6H5L4 4Z" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  chat: (
    <>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </>
  ),
  receipt: (
    <>
      <path d="M5 3h14v18l-2-1-2 1-2-1-2 1-2-1-2 1Z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  box: (
    <>
      <path d="M3 7l9-4 9 4v10l-9 4-9-4Z" />
      <path d="M3 7l9 4 9-4M12 11v10" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </>
  ),
  bag: (
    <>
      <path d="M6 8h12l-1 12H7L6 8Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </>
  ),
  tag: (
    <>
      <path d="M3 11l8-8 10 10-8 8Z" />
      <circle cx="8.5" cy="8.5" r="1.2" />
    </>
  ),
  star: (
    <>
      <path d="M12 3l2.6 5.6L20 9.3l-4 4.1.9 5.6L12 16.6 7.1 19l.9-5.6-4-4.1 5.4-.7Z" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20V4M4 20h16" />
      <path d="M8 20v-6M13 20v-10M18 20v-4" />
    </>
  )
};

function Icon({ name }) {
  return (
    <span className="bento-icon-box" aria-hidden="true">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {ICONS[name]}
      </svg>
    </span>
  );
}

const PRODUCT_CARDS = [
  {
    icon: "store",
    tag: "[ STOREFRONT ]",
    title: "Your own online store",
    body: "A branded shop on web and mobile that installs to any phone. Customers order from you — not from a marketplace that owns them."
  },
  {
    icon: "chat",
    tag: "[ WHATSAPP ]",
    title: "Ordering over WhatsApp",
    body: "Customers browse, verify with a one-time code, and get every order update on WhatsApp. No passwords and no app to download."
  },
  {
    icon: "receipt",
    tag: "[ BILLING ]",
    title: "Fast counter billing",
    body: "Barcode scanning, weighing scale support, cash / card / UPI split payments, and a printed receipt in seconds."
  },
  {
    icon: "box",
    tag: "[ STOCK ]",
    title: "Live inventory",
    body: "Accurate stock as you sell, low-stock alerts, and batch and expiry tracking so nothing quietly runs out."
  },
  {
    icon: "truck",
    tag: "[ DELIVERY ]",
    title: "Home delivery",
    body: "Assign orders to riders, track them live, and collect payment by cash or a doorstep UPI QR."
  },
  {
    icon: "bag",
    tag: "[ PICKUP ]",
    title: "Store pickup",
    body: "Let customers collect their own bags with free pickup, chosen time slots, and a simple handover code."
  },
  {
    icon: "tag",
    tag: "[ OFFERS ]",
    title: "Offers & coupons",
    body: "Run percentage or flat vouchers with minimum-spend rules, plus festival and weekend campaigns that pull shoppers back."
  },
  {
    icon: "star",
    tag: "[ LOYALTY ]",
    title: "Loyalty & repeat orders",
    body: "Customers earn points on every purchase, and can set up weekly or monthly grocery deliveries on autopilot."
  },
  {
    icon: "chart",
    tag: "[ REPORTS ]",
    title: "Reports that make sense",
    body: "Daily sales, top-selling items, margins, and your busiest hours — all on one clear page."
  }
];

const SHOP_STEPS = [
  {
    num: "01",
    title: "Find your store",
    body: "Shoppers open your storefront from a shared link or a WhatsApp message — no app store, no sign-up friction."
  },
  {
    num: "02",
    title: "Fill the cart",
    body: "They browse departments, search products, and add items — seeing a live meter that shows how close they are to free delivery."
  },
  {
    num: "03",
    title: "Pay how they like",
    body: "Choose home delivery or store pickup, pick a time slot, apply a coupon, and pay online or on delivery."
  },
  {
    num: "04",
    title: "Track to the door",
    body: "A live tracker follows the order from packing to doorstep, with WhatsApp updates at every stage."
  }
];

const ROLES = [
  {
    tag: "[ OWNER ]",
    title: "See the whole business",
    body: "One dashboard for every branch — sales, orders, customers, and performance side by side."
  },
  {
    tag: "[ MANAGER ]",
    title: "Run the floor",
    body: "A live board of incoming orders, staff tasks, and stock so the rush hour never spirals."
  },
  {
    tag: "[ CASHIER ]",
    title: "Bill without slowing",
    body: "Scan, weigh, split the payment, and print — trained in minutes, fast at the counter."
  },
  {
    tag: "[ RIDER ]",
    title: "Deliver with clarity",
    body: "A phone app with routes, one-tap customer messages, proof of delivery, and daily cash handover."
  }
];

const TOGETHER = [
  {
    title: "Multi-store & multi-branch",
    body: "Run one outlet or hundreds, each with its own prices, stock, hours, and delivery area — managed from one place."
  },
  {
    title: "Delivery zones & free-delivery meter",
    body: "Set how far you deliver and after how much the delivery is free. Customers see exactly where they stand."
  },
  {
    title: "Missing-item handling",
    body: "If something runs out while packing, mark it unavailable — the bill updates instantly and the customer is told."
  },
  {
    title: "Bring customers back with WhatsApp",
    body: "Send offers and new-arrival messages to your own customers, with photos and a direct link back to the cart."
  },
  {
    title: "Reviews & feedback",
    body: "Collect a star rating after every delivery and see what each branch does well — and what to fix."
  },
  {
    title: "Customer accounts & saved addresses",
    body: "Shoppers keep their address book, order history, and favourite branch, so checkout gets faster every time."
  }
];

const FAQS = [
  {
    q: "How is ClutchKart different from Instamart, Zepto, or Blinkit?",
    a: "Those are marketplaces that charge a commission on every order and keep the customer. ClutchKart is your own branded store, so you keep 100% of the sale, your customer list, and your margin."
  },
  {
    q: "Do my customers need to download an app?",
    a: "No. Your store opens in any browser and can be added to a phone's home screen in one tap. Ordering and updates also work over WhatsApp."
  },
  {
    q: "Can I offer both home delivery and pickup?",
    a: "Yes. Customers choose delivery to their door or free pickup from the store, and can pick a convenient time slot for either."
  },
  {
    q: "Can I run more than one branch?",
    a: "Yes. Manage a single store or a whole chain of branches, each with its own prices, stock, operating hours, and delivery range."
  },
  {
    q: "How do offers and loyalty work?",
    a: "Create percentage or flat coupons with minimum-spend rules, and let customers earn points on every purchase that they can redeem for discounts."
  },
  {
    q: "What happens if the internet goes down?",
    a: "Billing keeps working offline and syncs automatically once the connection returns, so the counter never stops."
  },
  {
    q: "How quickly can we go live?",
    a: "Typically within days, not months. We set up your branches and delivery rules, connect your WhatsApp number, and load your products with you."
  }
];

const ROLLOUT_STEPS = [
  {
    num: "01",
    title: "Store walkthrough",
    body: "We see how your counters, stockroom, and back office work today."
  },
  {
    num: "02",
    title: "Setup & import",
    body: "Products, prices, suppliers, and opening stock loaded from your existing sheets."
  },
  {
    num: "03",
    title: "Staff training",
    body: "Hands-on sessions for cashiers and managers, on your own hardware."
  },
  {
    num: "04",
    title: "Go-live support",
    body: "We’re on hand through the first week of real trading, and after."
  }
];

function Counter({ to, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setVal(to);
      return;
    }
    let raf;
    let started = false;
    const run = () => {
      const dur = 1400;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(to * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <b ref={ref}>
      <span className="ck-grad">{prefix}{Math.round(val).toLocaleString("en-IN")}{suffix}</span>
    </b>
  );
}

export default function ClutchKartPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const rootRef = useRef(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (!("IntersectionObserver" in window)) return;
    const els = Array.from(root.querySelectorAll("[data-reveal]"));
    if (!els.length) return;
    root.classList.add("reveal-ready");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <main className="ck" ref={rootRef}>
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">// proprietary software &middot; retail</div>
          <h1>
            <span className="line">Run your supermarket online</span>
            <span className="line"><span className="ck-grad">— and keep every rupee.</span></span>
          </h1>
          <p className="lede">
            ClutchKart gives your store its own branded storefront, fast counter billing, live inventory, home delivery, and WhatsApp ordering — without paying a single rupee of marketplace commission.
          </p>
          <div className="tag-bracket" style={{ marginTop: "20px" }}>
            <span className="ck-dot" aria-hidden="true"></span>
            ONLINE STOREFRONT &middot; BILLING &middot; DELIVERY &middot; WHATSAPP
          </div>
          <div className="hero-ctas">
            <Link to="/contact?interest=clutchkart" className="btn btn-primary btn-lg">
              Book a live demo
            </Link>
            <a href="#product" className="btn btn-ghost btn-lg">
              See what’s inside
            </a>
          </div>
          <div className="trust" style={{ marginTop: "18px" }}>
            0% marketplace commission &middot; your own customers &middot; guided onboarding
          </div>
          <div className="subnav">
            <a className="chip" href="#product">What’s inside</a>
            <a className="chip" href="#shopping">How shopping works</a>
            <a className="chip" href="#roles">For every role</a>
            <a className="chip" href="#rollout">Getting started</a>
          </div>
        </div>
      </section>

      {/* STATS + MARQUEE */}
      <section style={{ borderTop: "none", paddingTop: "0", paddingBottom: "56px" }}>
        <div className="wrap">
          <div className="ck-stats">
            {STATS.map((s, i) => (
              <div className="ck-stat" key={s.label} data-reveal style={{ "--d": `${i * 90}ms` }}>
                <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="ticker-wrap" aria-hidden="true" style={{ marginTop: "40px" }}>
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <React.Fragment key={i}>
                <span>{item}</span>
                <span className="dot">&middot;</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT */}
      <section id="product">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="kicker">// what’s inside</div>
            <h2><FadeWords>One system, the whole shop.</FadeWords></h2>
            <p className="section-sub">From the till to the doorstep — everything a supermarket needs to sell online and offline, working together.</p>
          </div>
          <div className="ck-grid">
            {PRODUCT_CARDS.map((c, i) => (
              <div className="ck-card" key={c.title} data-reveal style={{ "--d": `${(i % 3) * 90}ms` }}>
                <Icon name={c.icon} />
                <div className="tag-bracket">{c.tag}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW SHOPPING WORKS */}
      <section id="shopping">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="kicker">// how shopping works</div>
            <h2><FadeWords>From a shared link to the doorstep.</FadeWords></h2>
            <p className="section-sub">A simple, familiar journey your customers already understand.</p>
          </div>
          <div className="steps four ck-flow">
            {SHOP_STEPS.map((s, i) => (
              <div className="step" key={s.num} data-reveal style={{ "--d": `${i * 110}ms` }}>
                <div className="step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roles">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="kicker">// for every role</div>
            <h2><FadeWords>Made for everyone behind the counter.</FadeWords></h2>
            <p className="section-sub">Simple screens for each person, so nobody has to learn a complicated system.</p>
          </div>
          <div className="ck-grid c2">
            {ROLES.map((r, i) => (
              <div className="ck-card" key={r.tag} data-reveal style={{ "--d": `${(i % 2) * 90}ms` }}>
                <div className="tag-bracket">{r.tag}</div>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVERYTHING TOGETHER */}
      <section id="together">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="kicker">// everything runs together</div>
            <h2><FadeWords>The details that keep customers coming back.</FadeWords></h2>
          </div>
          <div className="ck-grid">
            {TOGETHER.map((t, i) => (
              <div className="ck-card" key={t.title} data-reveal style={{ "--d": `${(i % 3) * 90}ms` }}>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROLLOUT */}
      <section id="rollout">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="kicker">// getting started</div>
            <h2><FadeWords>From first visit to go-live.</FadeWords></h2>
            <p className="section-sub">We do the setup with you — you don’t get a login and a manual.</p>
          </div>
          <div className="steps four">
            {ROLLOUT_STEPS.map((s, i) => (
              <div className="step" key={s.num} data-reveal style={{ "--d": `${i * 110}ms` }}>
                <div className="step-num">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="ck-trust" style={{ marginTop: "40px" }} data-reveal>
            <span className="chip chip-static">Your brand, your customers</span>
            <span className="chip chip-static">Runs on your own hardware</span>
            <span className="chip chip-static">Works offline</span>
            <span className="chip chip-static">Guided onboarding</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ paddingBottom: "110px" }}>
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="kicker">// questions</div>
            <h2><FadeWords>Frequently asked questions.</FadeWords></h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div
                key={i}
                className="panel-box"
                style={{ marginBottom: "16px", cursor: "pointer", "--d": `${i * 70}ms` }}
                onClick={() => toggleFaq(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleFaq(i);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-expanded={openFaq === i ? "true" : "false"}
                data-open={openFaq === i ? "true" : undefined}
                data-reveal
              >
                <h4 style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: openFaq === i ? "12px" : "0" }}>
                  <span>{f.q}</span>
                  <span className="faq-plus">+</span>
                </h4>
                {openFaq === i && <p className="ck-faq-a" style={{ color: "var(--grey)", marginTop: "8px", marginBottom: 0 }}>{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ paddingBottom: "110px" }}>
        <div className="wrap">
          <div className="cta-banner" data-reveal>
            <h2>See ClutchKart on your own store’s data.</h2>
            <p>Book a demo and we’ll walk through billing, stock, and reports using a sample of your product list.</p>
            <Link to="/contact?interest=clutchkart" className="btn btn-primary btn-lg">
              Request a demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
