"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { credibilityPoints } from "@/lib/content";

const logoPlaceholders = [
  { name: "GreenLedger", width: 120 },
  { name: "ESSEC", width: 80 },
  { name: "Pan-African Bank", width: 130 },
  { name: "Regional DFI", width: 110 },
];

export function Credibility() {
  return (
    <Section
      id="credibility"
      title="Built with Institutional Rigor"
      subtitle="Trusted foundations for sustainable finance in Africa."
    >
      <div className="space-y-12">
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {credibilityPoints.map((point) => (
            <span
              key={point}
              className="inline-flex items-center rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-2 text-sm font-medium text-[var(--foreground)]/90"
            >
              {point}
            </span>
          ))}
          <span className="inline-flex items-center rounded-lg border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-2 text-sm font-medium text-[var(--foreground)]/90">
            Early pilots with SMEs in multiple African markets
          </span>
        </motion.div>
        <div className="relative overflow-hidden py-4">
          <div className="flex gap-12 animate-marquee w-max">
            {[...logoPlaceholders, ...logoPlaceholders].map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex-shrink-0 flex items-center justify-center h-12 px-6 rounded-lg border border-[var(--glass-border)] text-[var(--foreground)]/60 text-sm font-medium"
                style={{ minWidth: logo.width }}
              >
                {logo.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
