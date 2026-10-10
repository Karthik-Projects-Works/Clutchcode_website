import React, { useEffect, useRef } from "react";

export default function HeroVideo({ src = "/assets/hero.mp4", poster = "/assets/hero-poster.jpg", fade = 0.7 }) {
  const aRef = useRef(null);
  const bRef = useRef(null);
  const activeRef = useRef("a");

  useEffect(() => {
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const vids = { a: aRef.current, b: bRef.current };
    if (!vids.a || !vids.b) return;

    const play = (v) => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const start = (v) => {
      try {
        v.currentTime = 0;
      } catch (e) {
        /* ignore */
      }
      play(v);
    };

    const crossfade = () => {
      const curKey = activeRef.current;
      const nextKey = curKey === "a" ? "b" : "a";
      start(vids[nextKey]);
      vids[nextKey].classList.add("active");
      vids[curKey].classList.remove("active");
      activeRef.current = nextKey;
    };

    start(vids.a);
    vids.a.classList.add("active");

    let raf = 0;
    const tick = () => {
      const cur = vids[activeRef.current];
      const dur = cur.duration;
      if (dur && isFinite(dur) && cur.currentTime >= dur - fade) crossfade();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, [fade]);

  return (
    <div className="hero-master-video-wrap" id="seamlessVideoWrap" aria-hidden="true">
      <video
        ref={aRef}
        className="hero-master-video v-layer active"
        id="heroVidA"
        muted
        playsInline
        preload="auto"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
      <video
        ref={bRef}
        className="hero-master-video v-layer"
        id="heroVidB"
        muted
        playsInline
        preload="auto"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="hero-master-video-overlay"></div>
    </div>
  );
}
