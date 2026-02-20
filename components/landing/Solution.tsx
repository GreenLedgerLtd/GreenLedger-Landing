"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { solutionSteps } from "@/lib/content";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function Solution() {
  return (
    <Section
      id="solution"
      title="GreenLedger Bridges the Gap"
      subtitle="We turn fragmented green initiatives into a verified, bank-ready pipeline."
    >
      <motion.div
        className="relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <div className="grid md:grid-cols-3 gap-8 relative">
          {solutionSteps.map((step, i) => (
            <motion.div
              key={step.step}
              variants={staggerItem}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/20 border-2 border-[var(--primary)] flex items-center justify-center text-[var(--primary)] font-bold mb-4 relative z-10">
                {step.step}
              </div>
              <h3 className="text-lg font-semibold text-[var(--foreground)]">{step.title}</h3>
              <p className="mt-2 text-sm text-[var(--foreground)]/70 max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
        <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--primary)]/50 to-transparent z-0" />
      </motion.div>
    </Section>
  );
}
