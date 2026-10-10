import React from "react";
import useInViewRepeat from "../../hooks/useInViewRepeat";

export default function QuoteCard({ quote, name, role, stagger = 55 }) {
  const words = String(quote).split(" ");
  const [ref, inView] = useInViewRepeat({ threshold: 0.25, rootMargin: "0px 0px -8% 0px" });

  return (
    <div ref={ref} className={`quote-wrap${inView ? " is-in" : ""}`}>
      <div className="quote-mark">&ldquo;</div>
      <blockquote className="quote-words">
        {words.map((w, i) => (
          <React.Fragment key={i}>
            <span className="fw" style={{ "--wi": i, "--word-stagger": `${stagger}ms` }}>
              {w}
            </span>
            {i < words.length - 1 ? " " : null}
          </React.Fragment>
        ))}
      </blockquote>
      <div className="quote-attr">
        <span className="name">{name}</span> &middot; {role}
      </div>
    </div>
  );
}