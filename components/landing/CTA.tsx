"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useCTA } from "./CTAContext";

export function CTA() {
  const { openWaitlist, openPartner } = useCTA();

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-24 overflow-hidden"
      aria-label="Call to action"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--primary)]/5 to-[var(--primary)]/10" />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `var(--radial-gradient-ellipse)`,
        }}
      />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            Ready to unlock green capital?
          </h2>
          <p className="mt-4 text-lg text-[var(--foreground)]/75">
            Join a limited early access cohort and tap into a curated, Africa-first pipeline of verified
            green deals.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" onClick={openWaitlist} className="glow-green-sm">
              Join Waitlist
            </Button>
            <Link href="/book-call">
              <Button variant="secondary" size="lg">
                Book a Call
              </Button>
            </Link>
            <Button variant="secondary" size="lg" onClick={openPartner}>
              Partner With Us
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/playbook" className="text-[var(--primary)] hover:text-[var(--primary-light)] underline underline-offset-4">
              Download Green Finance Playbook (Coming Soon)
            </Link>
            <Link href="/early-access" className="text-[var(--primary)] hover:text-[var(--primary-light)] underline underline-offset-4">
              Become an Early Access Partner
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
