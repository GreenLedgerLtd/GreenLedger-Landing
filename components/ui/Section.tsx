"use client";

import { type HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  label?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function Section({
  id,
  label,
  title,
  subtitle,
  children,
  className = "",
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-20 lg:py-24 ${className}`}
      aria-labelledby={id ? `${id}-heading` : undefined}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeInUp}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          {label && (
            <p className="text-sm font-medium tracking-wider uppercase text-[var(--primary)] mb-3">
              {label}
            </p>
          )}
          <h2
            id={id ? `${id}-heading` : undefined}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]"
          >
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-lg text-[var(--foreground)]/70 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
