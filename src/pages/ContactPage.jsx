import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { RevealText } from "../lib/motion";
import { EASE_SPRING } from "../lib/motion/config";
import useDocumentMeta from "../hooks/useDocumentMeta";
import SocialDock from "../components/common/SocialDock";

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
  const [submitError, setSubmitError] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const successRef = useRef(null);

  useDocumentMeta({
    title: "Contact",
    description:
      "Tell Clutch Code what you're building — software, marketing, branding, or all three. We'll reply within one business day.",
    path: "/contact",
  });

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
      const firstInvalid = newErrors.name ? "f-name" : "f-email";
      const el = document.getElementById(firstInvalid);
      if (el) el.focus();
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, interests, _honey: honeypot }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Request failed");
        return res.json().catch(() => ({}));
      })
      .then(() => {
        setIsSubmitting(false);
        setSubmitted(true);
      })
      .catch(() => {
        setIsSubmitting(false);
        setSubmitError(
          "We couldn't send your message just now. Please try again, or email hello@clutchcode.com."
        );
      });
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
                    <h2>Thanks — message received.</h2>
                    <p>Someone from our team will reply within one business day.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <input
                      type="text"
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
                    />
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
                    {submitError && (
                      <p className="field-error-msg" role="alert" style={{ marginTop: "12px" }}>
                        {submitError}
                      </p>
                    )}
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
                  <h2 className="panel-heading">What happens next</h2>
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
                <h2 className="panel-heading">Reach us directly</h2>
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

                <SocialDock style={{ marginTop: "20px", width: "100%" }} />
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
