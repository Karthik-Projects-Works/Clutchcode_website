import React, { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Bento-style spotlight card. Renders a radial glow that tracks the pointer
 * using only GPU-composited properties (opacity / CSS custom properties).
 * Pass the existing card classes (e.g. "cell model-cell") as `className`.
 */
export default function GlowCard({
  children,
  className,
  glowIntensity = "normal",
  lift = -4,
  ...rest
}) {
  const reduced = useReducedMotion();
  const glowRef = useRef(null);

  const onMove = (e) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (glowRef.current) {
      glowRef.current.style.setProperty("--gx", `${e.clientX - rect.left}px`);
      glowRef.current.style.setProperty("--gy", `${e.clientY - rect.top}px`);
    }
  };

  return (
    <motion.div
      className={twMerge(clsx("glow-card", glowIntensity !== "normal" && `glow-${glowIntensity}`, className))}
      onMouseMove={onMove}
      whileHover={reduced ? undefined : { y: lift }}
      transition={{ type: "spring", stiffness: 320, damping: 24, mass: 0.5 }}
      {...rest}
    >
      <span ref={glowRef} className="glow-card-spot" aria-hidden="true" />
      {children}
    </motion.div>
  );
}