"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { HighlightKeywords } from "@/components/ui/HighlightKeywords";
import { useCTA } from "./CTAContext";

export function Hero() {
  const { openWaitlist, openPartner } = useCTA();

  const particles = useMemo(() => {
    const rand = (n: number) => {
      const x = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
      return x - Math.floor(x);
    };

    return Array.from({ length: 20 }, (_, i) => ({
      left: rand(i * 2) * 100,
      top: rand(i * 2 + 1) * 100,
      duration: 2 + rand(i * 2 + 2) * 2,
    }));
  }, []);

  return (
    <section
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center pt-[calc(env(safe-area-inset-top)+3.5rem)] sm:pt-[calc(env(safe-area-inset-top)+4rem)] overflow-hidden"
      aria-label="Hero"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background)] to-[var(--emerald)]/10" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `var(--radial-gradient-primary)`,
        }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[var(--primary)]/25 sm:bg-[var(--primary)]/30"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.4rem] font-bold tracking-tight text-[var(--foreground)] leading-[1.05]">
                <HighlightKeywords text="Unlock Verified Green Capital in Africa" keywords={["Green"]} as="span" />
              </h1>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-[var(--foreground)]/75 max-w-xl mx-auto lg:mx-0">
                <HighlightKeywords
                  text="GreenLedger connects sustainable African SMEs with banks deploying ESG-aligned green finance through a verified deal pipeline."
                  as="span"
                />
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4 items-stretch sm:items-center justify-center lg:justify-start">
                <Button variant="primary" size="lg" className="w-full sm:w-auto sm:px-8 min-h-[48px]" onClick={openWaitlist}>
                  Join the Waitlist
                </Button>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto min-h-[48px]" onClick={openPartner}>
                  Apply as Partner Bank
                </Button>
                <Link href="/book-call" className="w-full sm:w-auto">
                  <Button variant="ghost" size="lg" className="w-full sm:w-auto min-h-[48px]">
                    Book a Call
                  </Button>
                </Link>
              </div>
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-start">
                <span className="inline-flex items-center rounded-full border border-[var(--glass-border)] px-3 py-1.5 sm:py-1 text-xs font-medium text-[var(--foreground)]/80">
                  Backed by ESSEC Business School
                </span>
                <span className="inline-flex items-center rounded-full border border-[var(--glass-border)] px-3 py-1.5 sm:py-1 text-xs font-medium text-[var(--foreground)]/80">
                  Early traction with African SMEs
                </span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="glass-card p-8 rounded-2xl relative overflow-hidden glow-green-sm">
              <div className="absolute inset-0 opacity-40 pointer-events-none">
                <div className="absolute inset-6 rounded-3xl border border-[var(--glass-border)]" />
                <div className="absolute inset-10 rounded-[999px] border border-[var(--primary)]/40" />
              </div>
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--primary)]">
                    Africa Green Pipeline
                  </span>
                  <span className="text-xs text-[var(--foreground)]/60">Live snapshot</span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "SME submissions", value: "128", tone: "primary" },
                    { label: "Verified green deals", value: "42", tone: "emerald" },
                    { label: "Partner banks", value: "7", tone: "muted" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      className="glass rounded-lg p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <p className="text-[0.65rem] uppercase tracking-[0.14em] text-[var(--foreground)]/50">
                        <HighlightKeywords text={item.label} as="span" keywordClassName="text-[var(--primary)]" />
                      </p>
                      <p
                        className={`mt-2 text-2xl font-semibold ${
                          item.tone === "primary"
                            ? "text-[var(--primary-light)]"
                            : item.tone === "emerald"
                            ? "text-[var(--emerald)]"
                            : "text-[var(--foreground)]"
                        }`}
                      >
                        {item.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-[var(--foreground)]/70">
                      Africa focus
                    </p>
                    <p className="text-[0.75rem] text-[var(--foreground)]/55">
                      Pipeline spanning East, West and Southern Africa with SME and climate
                      infrastructure projects.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-[var(--foreground)]/70">
                      ESG alignment
                    </p>
                    <p className="text-[0.75rem] text-[var(--foreground)]/55">
                      <HighlightKeywords
                        text="Deals structured against green taxonomies and climate finance guidelines."
                        as="span"
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
