"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { navLinks } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/components/theme/ThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface HeaderProps {
  onJoinWaitlist?: () => void;
}

export function Header({ onJoinWaitlist }: HeaderProps) {
  const { theme } = useTheme();
  const logoSrc = theme === "dark" 
    ? "/brand/logos/GreenLedger Logo S (Green).svg"
    : "/brand/logos/GreenLedger Logo S (Dark).svg";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 glass-header"
      aria-label="Main navigation"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <Image
            src={logoSrc}
            alt="GreenLedger"
            width={120}
            height={112}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Site navigation">
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

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button variant="primary" size="sm" onClick={onJoinWaitlist}>
            Join Waitlist
          </Button>
        </div>
      </div>
    </header>
  );
}
