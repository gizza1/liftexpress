import React from "react";
import { motion } from "framer-motion";

const variants = {
  up: { hidden: { y: 40, opacity: 0 }, show: { y: 0, opacity: 1 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
};

export const Reveal = ({ children, delay = 0, y = "up", className = "" }) => (
  <motion.div
    className={className}
    variants={variants[y]}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-10% 0px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

// Line-by-line masked reveal for large headings. `lines` = array of strings.
export const MaskedLines = ({ lines, className = "", accentIndex = -1, delay = 0 }) => {
  const anim = { y: "0%" };
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            initial={{ y: "110%" }}
            animate={anim}
            transition={{ duration: 0.9, delay: delay + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={i === accentIndex ? "text-brick" : ""}>{line}</span>
          </motion.span>
        </span>
      ))}
    </span>
  );
};
