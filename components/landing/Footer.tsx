"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/theme/ThemeProvider";

export function Footer() {
  const { theme } = useTheme();
  const logoSrc = theme === "dark"
    ? "/brand/logos/GreenLedger Logo S (Light).svg"
    : "/brand/logos/GreenLedger Logo S (Dark).svg";

  return (
    <footer className="py-12 sm:py-16 border-t border-[var(--glass-border)]" aria-label="Footer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="inline-block hover:opacity-80 transition-opacity">
              <Image
                src={logoSrc}
                alt="GreenLedger"
                width={120}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm text-[var(--foreground)]/70 max-w-xs">
              Connecting sustainable African SMEs with banks deploying green finance. Africa-first.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider mb-3">
              Contact
            </h4>
            <a
              href="mailto:greenledger.team@gmail.com"
              className="text-sm text-[var(--primary)] hover:text-[var(--primary-light)]"
            >
              greenledger.team@gmail.com
            </a>
            <p className="mt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--primary)] hover:text-[var(--primary-light)]"
              >
                LinkedIn (placeholder)
              </a>
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--foreground)] uppercase tracking-wider mb-3">
              Legal
            </h4>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-sm text-[var(--foreground)]/70 hover:text-[var(--foreground)]">
                Privacy
              </Link>
              <Link href="/legal" className="block text-sm text-[var(--foreground)]/70 hover:text-[var(--foreground)]">
                Legal
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[var(--glass-border)] text-center text-sm text-[var(--foreground)]/60">
          GreenLedger — Financing Africa&apos;s sustainable future.
        </div>
      </div>
    </footer>
  );
}
