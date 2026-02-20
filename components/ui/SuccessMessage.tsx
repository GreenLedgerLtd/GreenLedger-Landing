"use client";

interface SuccessMessageProps {
  title: string;
  description?: string;
  /** When provided, shows a follow-up line e.g. "We'll be in touch at this address" */
  email?: string;
  className?: string;
}

export function SuccessMessage({ title, description, email, className = "" }: SuccessMessageProps) {
  return (
    <div
      className={`text-center py-8 px-4 rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/5 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
      <p className="text-[var(--primary)] font-semibold text-lg">{title}</p>
      {description && (
        <p className="text-[var(--foreground)]/70 mt-2 text-sm max-w-sm mx-auto">
          {description}
        </p>
      )}
      {email && (
        <p className="text-[var(--foreground)]/60 mt-3 text-xs max-w-sm mx-auto">
          We&apos;ll be in touch at <span className="font-medium text-[var(--foreground)]">{email}</span>. Check your inbox for next steps.
        </p>
      )}
    </div>
  );
}
