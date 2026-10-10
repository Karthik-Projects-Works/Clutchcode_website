import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { EASE_SPRING, VIEWPORT_ONCE } from "./config";

export default function FadeIn({
  children,
  className,
  delay = 0,
  distance = 24,
  duration = 0.65,
  align = "y",
  reduce,
  ...rest
}) {
  const reduced = reduce ?? useReducedMotion();
  const hidden = { opacity: 0, ...(align === "y" ? { y: distance } : { x: distance }) };

  return (
    <motion.div
      className={twMerge(clsx(className))}
      initial={reduced ? { opacity: 0 } : hidden}
      whileInView={reduced ? { opacity: 1 } : { opacity: 1, [align]: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration, ease: EASE_SPRING, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}