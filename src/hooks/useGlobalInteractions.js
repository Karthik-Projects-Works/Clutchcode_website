import { useState, useEffect, useCallback } from "react";

export default function useGlobalInteractions() {
  const [state, setState] = useState({
    scrollProgress: 0,
    showBackToTop: false,
    isScrolled: false,
  });

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      setState({
        isScrolled: scrollTop > 24,
        showBackToTop: scrollTop > window.innerHeight * 1.5,
        scrollProgress: scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0,
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { ...state, scrollToTop };
}
