"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-[var(--background)]"
      aria-hidden="true"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-light)]"
        style={{ width: `${progress}%` }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />
    </div>
  );
}
