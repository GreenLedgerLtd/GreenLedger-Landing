"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { problemStats } from "@/lib/content";
import { staggerContainer, staggerItem } from "@/lib/animations";

export function Problem() {
  return (
    <Section
      id="problem"
      title="The Green Finance Gap in Africa"
      subtitle="A disconnect between capital and impact is holding back Africa's sustainable growth."
    >
      <motion.div
        className="grid md:grid-cols-3 gap-6 lg:gap-8"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {problemStats.map((stat, i) => (
          <motion.div key={stat.title} variants={staggerItem}>
            <Card variant="glow" className="h-full border-l-4 border-l-[var(--primary)]">
              <h3 className="text-lg font-semibold text-[var(--foreground)]">{stat.title}</h3>
              <ul className="mt-3 space-y-1.5 text-[var(--foreground)]/70 text-sm">
                <li>{stat.description}</li>
                {i === 0 && (
                  <li>
                    <span className="font-semibold text-[var(--foreground)]">
                      No standardized green products
                    </span>{" "}
                    across many SME portfolios.
                  </li>
                )}
                {i === 1 && (
                  <li>
                    <span className="font-semibold text-[var(--foreground)]">
                      Hard to evidence ESG impact
                    </span>{" "}
                    with fragmented project data.
                  </li>
                )}
                {i === 2 && (
                  <li>
                    <span className="font-semibold text-[var(--foreground)]">
                      Capital deployment friction
                    </span>{" "}
                    slows down climate transition and inclusion.
                  </li>
                )}
              </ul>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
