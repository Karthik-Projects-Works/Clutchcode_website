import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { RevealText } from "../lib/motion";
import { EASE_SPRING } from "../lib/motion/config";
import { WHATSAPP_LINK } from "../lib/contact";

const sideStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const sideItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_SPRING } },
};

export default function ContactPage() {
  const [searchParams] = useSearchParams();
  const [interests, setInterests] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const successRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    budget: "",
    message: ""
  });

  useEffect(() => {
    const interest = searchParams.get("interest");
    if (interest) {
      setInterests([interest]);
    }
  }, [searchParams]);

  useEffect(() => {
    if (submitted && successRef.current) {
      successRef.current.focus();
    }
  }, [submitted]);

  const toggleInterest = (val) => {
    if (interests.includes(val)) {
      setInterests(interests.filter((i) => i !== val));
    } else {
      setInterests([...interests, val]);
    }
  };

  const validateField = (field, val) => {
    let err = "";
    if (field === "name" && !val.trim()) {
      err = "Please enter your name.";
    }
    if (field === "email") {
      if (!val.trim()) {
        err = "Please enter your work email.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        err = "Please enter a valid email address.";
      }
    }
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name.";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your work email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 450);
  };

  const copyEmail = () => {
    navigator.clipboard
      .writeText("hello@clutchcode.com")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      })
      .catch(() => {});
  };

  return (
    <main id="main">
      <section className="page-hero" style={{ paddingBottom: "40px" }}>
        <div className="wrap">
          <div className="eyebrow">// contact</div>
          <RevealText as="h1" lines={["Tell us what you’re", "building."]} />
          <p className="lede">
            Software, a campaign, a brand, or all three. Share a few details and we’ll get back to you with next steps.
          </p>
        </div>
      </section>

      <section style={{ borderTop: "none", paddingTop: "24px", paddingBottom: "110px" }}>
        <div className="wrap">
          <div className="contact-grid">
            {/* WORK ORDER SHEET */}
            <div className="work-order-sheet">
              <div className="wo-header">
                <span>SPECIFICATION // INTAKE DOCKET</span>
                <span className="wo-number">WORK ORDER WO-0001</span>
              </div>
              <div className="form-body">
                {submitted ? (
                  <div
                    className="success contact-success-card"
                    ref={successRef}
                    tabIndex="-1"
                    aria-live="polite"
                    style={{ display: "block" }}
                  >
                    <img className="success-mark-spin" src="/assets/logo.png" alt="" width="26" height="27" />
                    <h3>Thanks — message received.</h3>
                    <p>Someone from our team will reply within one business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="two">
                      <div className="field">
                        <label htmlFor="f-name">Your name</label>
                        <input
                          type="text"
                          id="f-name"
                          name="name"
                          required
                          autoComplete="name"
                          className={errors.name ? "has-error" : ""}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          onBlur={(e) => validateField("name", e.target.value)}
                          aria-invalid={errors.name ? "true" : "false"}
                          aria-describedby={errors.name ? "err-name" : undefined}
                        />
                        {errors.name && (
                          <span className="field-error-msg" id="err-name" role="alert">
                            {errors.name}
                          </span>
                        )}
                      </div>
                      <div className="field">
                        <label htmlFor="f-email">Work email</label>
                        <input
                          type="email"
                          id="f-email"
                          name="email"
                          required
                          autoComplete="email"
                          className={errors.email ? "has-error" : ""}
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          onBlur={(e) => validateField("email", e.target.value)}
                          aria-invalid={errors.email ? "true" : "false"}
                          aria-describedby={errors.email ? "err-email" : undefined}
                        />
                        {errors.email && (
                          <span className="field-error-msg" id="err-email" role="alert">
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="two">
                      <div className="field">
                        <label htmlFor="f-company">Company</label>
                        <input
                          type="text"
                          id="f-company"
                          name="company"
                          autoComplete="organization"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="f-phone">Phone (optional)</label>
                        <input
                          type="tel"
                          id="f-phone"
                          name="phone"
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="field">
                      <span className="lab">I’m interested in</span>
                      <div className="pick">
                        <label className={`pick-label ${interests.includes("software") ? "is-picked" : ""}`}>
                          <input
                            type="checkbox"
                            name="interest"
                            value="software"
                            checked={interests.includes("software")}
                            onChange={() => toggleInterest("software")}
                          />
                          <span>Software</span>
                        </label>
                        <label className={`pick-label ${interests.includes("marketing") ? "is-picked" : ""}`}>
                          <input
                            type="checkbox"
                            name="interest"
                            value="marketing"
                            checked={interests.includes("marketing")}
                            onChange={() => toggleInterest("marketing")}
                          />
                          <span>Digital marketing</span>
                        </label>
                        <label className={`pick-label ${interests.includes("branding") ? "is-picked" : ""}`}>
                          <input
                            type="checkbox"
                            name="interest"
                            value="branding"
                            checked={interests.includes("branding")}
                            onChange={() => toggleInterest("branding")}
                          />
                          <span>Branding</span>
                        </label>
                        <label className={`pick-label ${interests.includes("clutchkart") ? "is-picked" : ""}`}>
                          <input
                            type="checkbox"
                            name="interest"
                            value="clutchkart"
                            checked={interests.includes("clutchkart")}
                            onChange={() => toggleInterest("clutchkart")}
                          />
                          <span>ClutchKart demo</span>
                        </label>
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor="f-budget">Rough budget (optional)</label>
                      <select
                        id="f-budget"
                        name="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      >
                        <option value="">Not sure yet</option>
                        <option>Under ₹50,000</option>
                        <option>₹50,000 – ₹2,00,000</option>
<option>₹2,00,000 – ₹10,00,000</option>
                        <option>₹10,00,000+</option>
                      </select>
                    </div>

                    <div className="field">
                      <label htmlFor="f-msg">What are you trying to achieve?</label>
                      <textarea
                        id="f-msg"
                        name="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>

<motion.button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={isSubmitting}
                      whileTap={isSubmitting ? undefined : { scale: 0.97 }}
                    >
                      {isSubmitting && <span className="btn-spinner" aria-hidden="true" />}
                      {isSubmitting ? "Transmitting docket..." : "Send message"}
                    </motion.button>
                    <div className="note">We’ll only use your details to reply to this enquiry.</div>
                  </form>
                )}
              </div>
            </div>

            {/* ASIDE */}
<aside>
              <motion.div
                className="panel-box side-steps"
                variants={sideStagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px 0px" }}
              >
                <motion.div variants={sideItem}>
                  <h4>What happens next</h4>
                </motion.div>
                <motion.div className="step" variants={sideItem}>
                  <div className="step-num">01</div>
                  <h3>We reply</h3>
                  <p>Within one business day, to set up a short call.</p>
                </motion.div>
                <motion.div className="step" variants={sideItem}>
                  <div className="step-num">02</div>
                  <h3>We talk</h3>
                  <p>A 30-minute conversation about your goals — no sales script.</p>
                </motion.div>
                <motion.div className="step" variants={sideItem} style={{ marginBottom: 0 }}>
                  <div className="step-num">03</div>
                  <h3>You get a plan</h3>
                  <p>A written proposal with scope, timeline, and price.</p>
                </motion.div>
              </motion.div>

              <div className="panel-box">
                <h4>Reach us directly</h4>
                <div className="detail">
                  <div className="k">Email</div>
                  <div className="v copy-row">
                    <span>hello@clutchcode.com</span>
                    <button type="button" className="copy-btn" onClick={copyEmail} aria-label="Copy email address">
                      {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
                    </button>
                  </div>
                  <span className="copy-tip" role="status" aria-live="polite">
                    {copied ? "COPIED" : ""}
                  </span>
                </div>
                <div className="detail"><div className="k">Office</div><div className="v">Kerala, India</div></div>
                <div className="detail" style={{ marginBottom: 0 }}><div className="k">Hours</div><div className="v">Mon &ndash; Fri &middot; 9:00 &ndash; 18:00</div></div>

                <div className="social-dock" aria-label="Social media channels" style={{ marginTop: "20px", width: "100%" }}>
                  <a href="https://instagram.com" className="social-btn social-link1" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="https://twitter.com" className="social-btn social-link2" aria-label="Twitter / X" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
                  </a>
                  <a href="https://discord.com" className="social-btn social-link3" aria-label="Discord" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                  </a>
                  <a href={WHATSAPP_LINK} className="social-btn social-link4" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
