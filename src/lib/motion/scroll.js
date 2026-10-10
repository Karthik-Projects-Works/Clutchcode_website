import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSmoothScroll() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduce.matches) return null;

  const lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.4,
    infinite: false,
  });

  lenis.on("scroll", ScrollTrigger.update);

  const raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  window.__lenis = lenis;
  window.__lenisCleanup = () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
    window.__lenis = null;
    window.__lenisCleanup = null;
  };

  return lenis;
}

export function destroySmoothScroll() {
  if (window.__lenisCleanup) window.__lenisCleanup();
}

/**
 * Scroll to top on route change. Prefers Lenis when active so the engine's
 * internal anchor state stays in sync with the actual scroll position.
 */
export function useRouteScrollReset() {
  const location = useLocation();

  useEffect(() => {
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);
}

export function smoothScrollToTop() {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(0, { duration: 0.7 });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export function smoothScrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = window.__lenis;
  if (lenis) {
    const top = el.getBoundingClientRect().top + window.scrollY - 84;
    lenis.scrollTo(top, { duration: 0.8 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}