import React from "react";
import { Link } from "react-router-dom";
import { RevealText } from "../lib/motion";
import useDocumentMeta from "../hooks/useDocumentMeta";

export default function NotFoundPage() {
  useDocumentMeta({
    title: "Page not found",
    description: "The page you were looking for doesn't exist. Head back to Clutch Code.",
    path: "/404",
  });

  return (
    <main id="main">
      <section className="page-hero">
        <div className="wrap">
          <div className="eyebrow">// 404</div>
          <RevealText as="h1" lines={["This page", "doesn't exist."]} />
          <p className="lede">
            The link may be broken or the page may have moved. Let's get you back on track.
          </p>
          <div className="hero-ctas">
            <Link to="/" className="btn btn-primary btn-lg">Back to home</Link>
            <Link to="/work" className="btn btn-ghost btn-lg">See our work</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
