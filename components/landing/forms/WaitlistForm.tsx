"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { SuccessMessage } from "@/components/ui/SuccessMessage";
import { submitWaitlist } from "@/lib/forms";
import { countries } from "@/lib/countries";

interface WaitlistFormProps {
  onSuccess?: () => void;
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    country: "",
  });
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const result = await submitWaitlist(formData);
      if (result.ok) {
        setSubmittedEmail(formData.email || null);
        setStatus("success");
        setFormData({ name: "", email: "", company: "", role: "", country: "" });
        onSuccess?.();
      } else {
        setStatus("error");
        setErrorMessage(result.message || result.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <SuccessMessage
        title="You're on the list!"
        description="Thank you for joining. We'll contact you when we launch."
        email={submittedEmail ?? undefined}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="wl-name" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1">
          Name *
        </label>
        <input
          id="wl-name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="wl-email" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1">
          Email *
        </label>
        <input
          id="wl-email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
          className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label htmlFor="wl-company" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1">
          Company
        </label>
        <input
          id="wl-company"
          type="text"
          value={formData.company}
          onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
          className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          placeholder="Your company"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="wl-role" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1">
            Role
          </label>
          <input
            id="wl-role"
            type="text"
            value={formData.role}
            onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
            className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            placeholder="CEO, Founder..."
          />
        </div>
        <div>
          <label htmlFor="wl-country" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1">
            Country
          </label>
          <select
            id="wl-country"
            value={formData.country}
            onChange={(e) => setFormData((p) => ({ ...p, country: e.target.value }))}
            required={false}
            className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors"
            style={{ color: formData.country ? 'var(--foreground)' : 'var(--placeholder-color)' }}
          >
            <option value="" disabled>
              Select a country
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
      {status === "error" && (
        <div className="text-red-400 text-sm space-y-1">
          <p className="font-medium">Something went wrong.</p>
          {errorMessage && (
            <p className="text-xs opacity-80">{errorMessage}</p>
          )}
        </div>
      )}
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Joining..." : "Join Waitlist"}
      </Button>
    </form>
  );
}
