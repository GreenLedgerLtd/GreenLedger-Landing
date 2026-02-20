"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { submitWaitlist } from "@/lib/forms";
import { countries } from "@/lib/countries";

interface WaitlistFormProps {
  onSuccess?: () => void;
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    country: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await submitWaitlist(formData);
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", company: "", role: "", country: "" });
        onSuccess?.();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <p className="text-[var(--primary)] font-medium">You’re on the list!</p>
        <p className="text-[var(--foreground)]/70 mt-1 text-sm">
          We’ll contact you when we launch.
        </p>
      </div>
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
      <div className="grid grid-cols-2 gap-4">
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
        <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
      )}
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Joining..." : "Join Waitlist"}
      </Button>
    </form>
  );
}
