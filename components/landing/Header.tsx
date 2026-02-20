"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface HeaderProps {
  onJoinWaitlist?: () => void;
}

export function Header({ onJoinWaitlist }: HeaderProps) {
  const { theme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoSrc = theme === "dark"
    ? "/brand/logos/GreenLedger Logo S (Green).svg"
    : "/brand/logos/GreenLedger Logo S (Dark).svg";

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 glass-header pt-[env(safe-area-inset-top)]"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-14 sm:h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity min-h-[44px] min-w-[44px] items-center justify-center -ml-2 sm:ml-0 sm:min-w-0"
          onClick={closeMobileMenu}
        >
          <Image
            src={logoSrc}
            alt="GreenLedger"
            width={120}
            height={112}
            priority
            className="h-7 sm:h-8 w-auto"
          />
        </Link>

        <nav className="hidden sm:flex items-center gap-6 lg:gap-8" aria-label="Site navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--foreground)]/80 hover:text-[var(--primary-light)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Button
            variant="primary"
            size="sm"
            onClick={onJoinWaitlist}
            className="hidden sm:inline-flex"
          >
            Join Waitlist
          </Button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="sm:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg text-[var(--foreground)] hover:bg-[var(--glass-bg)] transition-colors -mr-2"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm sm:hidden top-[calc(env(safe-area-inset-top)+3.5rem)] sm:top-[calc(env(safe-area-inset-top)+4rem)]"
              onClick={closeMobileMenu}
              aria-hidden
            />
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="fixed left-0 right-0 z-50 sm:hidden border-b border-[var(--glass-border)] glass-header top-[calc(env(safe-area-inset-top)+3.5rem)] sm:top-[calc(env(safe-area-inset-top)+4rem)]"
              aria-label="Mobile navigation"
            >
              <div className="mx-auto max-w-7xl px-5 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="block py-3 px-3 rounded-lg text-base font-medium text-[var(--foreground)]/90 hover:text-[var(--primary-light)] hover:bg-[var(--glass-bg)] transition-colors min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 mt-3 border-t border-[var(--glass-border)]">
                  <Button
                    variant="primary"
                    className="w-full justify-center min-h-[44px]"
                    size="md"
                    onClick={() => {
                      closeMobileMenu();
                      onJoinWaitlist?.();
                    }}
                  >
                    Join Waitlist
                  </Button>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
