"use client";

import { type HTMLAttributes } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { HighlightKeywords } from "@/components/ui/HighlightKeywords";

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
      className={`py-14 sm:py-20 lg:py-24 ${className}`}
      aria-labelledby={id ? `${id}-heading` : undefined}
      {...props}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
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
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]"
          >
            <HighlightKeywords text={title} as="span" />
          </h2>
          {subtitle && (
            <p className="mt-4 text-base sm:text-lg text-[var(--foreground)]/70 max-w-2xl mx-auto">
              <HighlightKeywords text={subtitle} as="span" />
            </p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}
