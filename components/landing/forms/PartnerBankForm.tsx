"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { submitPartnerBank } from "@/lib/forms";
import { countries } from "@/lib/countries";

interface PartnerBankFormProps {
  onSuccess?: () => void;
}

export function PartnerBankForm({ onSuccess }: PartnerBankFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    role: "",
    country: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await submitPartnerBank(formData);
      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", institution: "", role: "", country: "", message: "" });
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
        <p className="text-[var(--primary)] font-medium">Application received!</p>
        <p className="text-[var(--foreground)]/70 mt-1 text-sm">
          Our team will review and reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="pb-name" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1">
          Name *
        </label>
        <input
          id="pb-name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          placeholder="Your name"
        />
      </div>
      <div>
        <label htmlFor="pb-email" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1">
          Email *
        </label>
        <input
          id="pb-email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
          className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          placeholder="you@bank.com"
        />
      </div>
      <div>
        <label htmlFor="pb-institution" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1">
          Institution *
        </label>
        <input
          id="pb-institution"
          type="text"
          required
          value={formData.institution}
          onChange={(e) => setFormData((p) => ({ ...p, institution: e.target.value }))}
          className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
          placeholder="Bank or financial institution"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="pb-role" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1">
            Role
          </label>
          <input
            id="pb-role"
            type="text"
            value={formData.role}
            onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value }))}
            className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
            placeholder="e.g. ESG Lead"
          />
        </div>
        <div>
          <label htmlFor="pb-country" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1">
            Country
          </label>
          <select
            id="pb-country"
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
      <div>
        <label htmlFor="pb-message" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1">
          Message
        </label>
        <textarea
          id="pb-message"
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
          className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] resize-none"
          placeholder="Tell us about your green finance goals..."
        />
      </div>
      {status === "error" && (
        <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
      )}
      <Button type="submit" className="w-full" disabled={status === "loading"}>
        {status === "loading" ? "Submitting..." : "Apply as Partner Bank"}
      </Button>
    </form>
  );
}
