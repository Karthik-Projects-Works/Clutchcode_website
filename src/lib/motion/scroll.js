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
  const { hash } = location;

  useEffect(() => {
    if (hash) {
      let tries = 0;
      let cancelled = false;
      const find = () => {
        if (cancelled) return;
        const target = document.getElementById(hash.slice(1));
        if (target) {
          smoothScrollToId(hash.slice(1));
          return;
        }
        if (tries++ < 24) setTimeout(find, 40);
      };
      find();
      return () => {
        cancelled = true;
      };
    }
    const lenis = window.__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, hash]);
}

export function smoothScrollToTop() {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(0, { duration: 0.7 });
  } else {
    window.scrollTo(0, 0);
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
    el.scrollIntoView();
  }
}

export function initAnchorScrolling() {
  const onClick = (e) => {
    const link = e.target.closest('a[href^="#"], a[href^="/#"]');
    if (!link) return;
    if (
      link.classList.contains("skip-link") ||
      link.hasAttribute("download") ||
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }
    const href = link.getAttribute("href");
    const id = (href || "").split("#").pop();
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    smoothScrollToId(id);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  };

  document.addEventListener("click", onClick);
  return () => document.removeEventListener("click", onClick);
}