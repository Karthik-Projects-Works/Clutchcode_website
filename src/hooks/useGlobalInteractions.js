import { useState, useEffect } from "react";

export default function useGlobalInteractions() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      setIsScrolled(scrollTop > 24);
      setShowBackToTop(scrollTop > window.innerHeight * 1.5);

      if (scrollHeight > 0) {
        setScrollProgress((scrollTop / scrollHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { scrollProgress, showBackToTop, isScrolled, scrollToTop };
}
