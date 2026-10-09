import { useEffect } from "react";

export default function useScrollReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll("[data-reveal]"));
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) return;

    root.classList.add("is-reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}
