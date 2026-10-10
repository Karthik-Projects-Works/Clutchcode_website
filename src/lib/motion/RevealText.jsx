import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { EASE_SPRING } from "./config";

/**
 * Masked, clip-line text reveal for headings.
 * Each entry in `lines` is wrapped in an overflow-hidden mask and revealed
 * with a translateY + rotate sweep. Renders as a block-level heading.
 */
export default function RevealText({
  lines,
  as: TagName = "h2",
  className,
  delay = 0,
  stagger = 0.09,
  reduce,
  ...rest
}) {
  const reduced = reduce ?? useReducedMotion();
  const Tag = motion[TagName];

  return (
    <Tag
      className={twMerge(clsx("reveal-text", className))}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {lines.map((line, i) => (
        <span className="rt-line" key={i}>
          <motion.span
            className="rt-inner"
            variants={{
              hidden: { y: reduced ? "0%" : "112%" },
              visible: {
                y: "0%",
                transition: { duration: 0.85, ease: EASE_SPRING },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}