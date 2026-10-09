import React, { useEffect, useState, useRef } from "react";

export default function CountUp({
  to,
  duration = 1400,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = ""
}) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setVal(to);
      return;
    }
    let raf;
    let started = false;
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(to * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            run();
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  const display = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString("en-IN");

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
