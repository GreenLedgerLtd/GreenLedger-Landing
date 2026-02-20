"use client";

import { forwardRef, type HTMLAttributes } from "react";
import { motion } from "framer-motion";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glow";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", className = "", children, ...props }, ref) => {
    const base =
      "rounded-xl p-6 border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl transition-all duration-300";
    const glowClass =
      variant === "glow" ? "hover:border-[var(--primary)]/40 card-glow" : "";
    const combined = `${base} ${glowClass} ${className}`;

    return (
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="h-full">
        <div ref={ref} className={combined} {...props}>
          {children}
        </div>
      </motion.div>
    );
  }
);

Card.displayName = "Card";
