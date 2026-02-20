"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white hover:from-[var(--primary-light)] hover:to-[var(--primary)] glow-green-sm border-0",
  secondary:
    "border border-[var(--glass-border)] text-[var(--foreground)] hover:border-[var(--primary)] hover:bg-[var(--glass-bg)]",
  ghost:
    "border-0 bg-transparent text-[var(--foreground)]/80 hover:text-[var(--primary-light)] hover:bg-[var(--glass-bg)]",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-[3rem] px-7 text-base",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
    const primaryHover = variant === "primary" ? "btn-primary-hover" : "";
    const combined = `${base} ${variants[variant]} ${sizes[size]} ${primaryHover} ${className}`;

    return (
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 17 }} className="inline-block">
        <button ref={ref} className={combined} {...props}>
          {children}
        </button>
      </motion.div>
    );
  }
);

Button.displayName = "Button";
