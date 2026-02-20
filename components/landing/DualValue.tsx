"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { HighlightKeywords } from "@/components/ui/HighlightKeywords";
import { smeValueProps, bankValueProps } from "@/lib/content";
import { useCTA } from "./CTAContext";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function DualValue() {
  const { openWaitlist, openPartner } = useCTA();

  return (
    <Section
      id="value"
      title="Built for Both Sides"
      subtitle="Clear value for SMEs seeking funding and banks seeking verified green projects."
    >
      <motion.div
        className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        <motion.div
          variants={staggerItem}
          className="glass-card rounded-2xl p-6 sm:p-8 border-t-4 border-t-[var(--primary)] bg-gradient-to-br from-[var(--primary)]/12 via-transparent to-transparent text-center lg:text-left"
        >
          <h3 className="text-2xl font-bold text-[var(--foreground)]">For SMEs & Startups</h3>
          <ul className="mt-6 space-y-3 text-left">
            {smeValueProps.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[var(--foreground)]/85">
                <span className="mt-0.5 shrink-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-xs">
                  ✓
                </span>
                <HighlightKeywords text={item} as="span" />
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-[var(--foreground)]/60">
            For founders, CFOs and sustainability leads at African SMEs and startups.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Button variant="primary" className="mt-6" onClick={openWaitlist}>
              Join Waitlist
            </Button>
          </div>
        </motion.div>
        <motion.div
          variants={staggerItem}
          className="glass-card rounded-2xl p-6 sm:p-8 border-t-4 border-t-[var(--muted-green)] bg-gradient-to-bl from-[var(--muted-green)]/14 via-transparent to-transparent text-center lg:text-left"
        >
          <h3 className="text-2xl font-bold text-[var(--foreground)]">
            For Banks & Financial Institutions
          </h3>
          <ul className="mt-6 space-y-3 text-left">
            {bankValueProps.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[var(--foreground)]/85">
                <span className="mt-0.5 shrink-0 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--muted-green)]/18 text-[var(--muted-green)] text-xs">
                  ✓
                </span>
                <HighlightKeywords text={item} as="span" />
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs text-[var(--foreground)]/60">
            For ESG, risk, treasury and sustainable finance teams at banks and DFIs.
          </p>
          <div className="flex justify-center lg:justify-start">
            <Button variant="primary" className="mt-6" onClick={openPartner}>
              Apply as Partner Bank
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
