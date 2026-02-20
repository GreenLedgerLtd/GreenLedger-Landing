"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { solutionSteps } from "@/lib/content";

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Section
      id="how-it-works"
      title="How It Works"
      subtitle="Three steps from green initiative to capital deployment."
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        <div className="w-full lg:w-1/2 space-y-2">
          {solutionSteps.map((step, i) => (
            <motion.button
              key={step.step}
              onClick={() => setActiveStep(i)}
              className={`w-full text-left rounded-xl p-4 border transition-all ${
                activeStep === i
                  ? "border-[var(--primary)] bg-[var(--glass-bg)]"
                  : "border-[var(--glass-border)] hover:border-[var(--primary)]/50"
              }`}
              style={activeStep === i ? { boxShadow: "var(--howitworks-shadow)" } : undefined}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.99 }}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    activeStep === i ? "bg-[var(--primary)] text-white" : "bg-[var(--primary)]/20 text-[var(--primary)]"
                  }`}
                >
                  {step.step}
                </span>
                <span className="font-medium text-[var(--foreground)]">{step.title}</span>
              </div>
            </motion.button>
          ))}
        </div>
        <div className="w-full lg:w-1/2 glass-card rounded-2xl p-8 min-h-[220px] flex flex-col gap-4">
          <div className="relative h-10 mb-1 hidden sm:block">
            <div className="absolute inset-y-1 left-0 right-0 flex items-center justify-between px-2">
              {solutionSteps.map((step, i) => (
                <div
                  key={step.step}
                  className={`w-2 h-2 rounded-full ${
                    activeStep === i ? "bg-[var(--primary)]" : "bg-[var(--primary)]/30"
                  }`}
                />
              ))}
            </div>
            <motion.div
              className="absolute top-1/2 left-2 right-2 h-0.5 bg-[var(--primary)]/30 -translate-y-1/2"
              initial={false}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)] rounded-full"
                animate={{ width: `${((activeStep + 1) / solutionSteps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </div>
          <div className="flex-1 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-[var(--foreground)]">
                {solutionSteps[activeStep].title}
              </h3>
              <p className="text-[var(--foreground)]/75">
                {solutionSteps[activeStep].description}
              </p>
            </motion.div>
          </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}
