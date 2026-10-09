import React from "react";
import useInViewRepeat from "../../hooks/useInViewRepeat";

export default function FadeWords({ children, as: Tag = "span", className = "", stagger = 80 }) {
  const words = String(children).split(" ");
  const [ref, inView] = useInViewRepeat({ threshold: 0.2, rootMargin: "0px 0px -8% 0px" });

  return (
    <Tag ref={ref} className={`fade-words${inView ? " is-in" : ""} ${className}`.trim()}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="fw" style={{ "--wi": i, "--word-stagger": `${stagger}ms` }}>
            {w}
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}