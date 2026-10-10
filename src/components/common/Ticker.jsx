import React, { useState, useLayoutEffect, useRef, useCallback } from "react";

const BASE_COPIES = 4;

export default function Ticker({ items = [], duration = 38, className = "", style }) {
  const trackRef = useRef(null);
  const [copies, setCopies] = useState(BASE_COPIES);
  const [tickDur, setTickDur] = useState(duration);

  const compute = useCallback(() => {
    const track = trackRef.current;
    if (!track || !items.length) return;
    const setWidth = track.scrollWidth / copies;
    if (!setWidth || !isFinite(setWidth)) return;
    const needed = Math.ceil((window.innerWidth + setWidth) / setWidth);
    let even = needed + (needed % 2);
    even = Math.max(even, 4);
    if (even !== copies) {
      setCopies(even);
      setTickDur(duration * (even / 2));
    }
  }, [trackRef, items, duration, copies]);

  useLayoutEffect(() => {
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, [compute]);

  const trackItems = Array.from({ length: copies }, () => items).flat();

  return (
    <div className={`ticker-wrap ${className}`} style={style} aria-hidden="true">
      <div className="ticker-track" ref={trackRef} style={{ "--tic-dur": `${tickDur}s` }}>
        {trackItems.map((item, i) => (
          <React.Fragment key={i}>
            <span>{item}</span>
            <span className="dot">&middot;</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}