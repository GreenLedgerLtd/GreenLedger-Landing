"use client";

import { motion } from "framer-motion";

export function Vision() {
  return (
    <section id="vision" className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "var(--radial-gradient-vision)",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10"
          style={{ background: "var(--vision-pulse)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            Financing Africa&apos;s Sustainable Future
          </h2>
          <div className="mt-6 text-[var(--foreground)]/75 text-base sm:text-lg leading-relaxed space-y-3">
            <p>
              Africa&apos;s climate transition depends on connecting{" "}
              <span className="font-semibold text-[var(--foreground)]">
                green entrepreneurs and climate infrastructure
              </span>{" "}
              with institutional capital that is ready to move.
            </p>
            <p>
              GreenLedger builds the rails for{" "}
              <span className="font-semibold text-[var(--foreground)]">
                scalable, ESG-aligned green finance
              </span>
              : structured documentation, verified projects, and transparent impact signals banks can trust.
            </p>
            <p>
              The result is more{" "}
              <span className="font-semibold text-[var(--foreground)]">
                inclusive, resilient growth
              </span>{" "}
              for African SMEs, cities, and communities.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
