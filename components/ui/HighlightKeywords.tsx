"use client";

import type React from "react";

const DEFAULT_KEYWORDS = ["GreenLedger", "green"];

interface HighlightKeywordsProps {
  text: string;
  keywords?: string[];
  className?: string;
  keywordClassName?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

/**
 * Renders text with specified keywords highlighted in the primary green.
 * Longer keywords are matched first (e.g. "GreenLedger" before "green").
 * Match is case-insensitive; original casing is preserved. No underline for accessibility.
 */
export function HighlightKeywords({
  text,
  keywords = DEFAULT_KEYWORDS,
  className = "",
  keywordClassName = "text-[var(--primary)] font-medium",
  as: Wrapper = "span",
}: HighlightKeywordsProps) {
  if (!text) return null;

  const sorted = [...keywords].sort((a, b) => b.length - a.length);
  const escaped = sorted.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");

  const parts: (string | React.JSX.Element)[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const re = new RegExp(regex.source, "gi");
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <span key={`${match.index}-${match[0]}`} className={keywordClassName}>
        {match[0]}
      </span>
    );
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <Wrapper className={className}>{parts}</Wrapper>;
}
