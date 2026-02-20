"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { submitEarlyAccess } from "@/lib/forms";

export default function EarlyAccessPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "submitted" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", company: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await submitEarlyAccess(formData);
      if (res.ok) {
        setStatus("submitted");
        setFormData({ name: "", email: "", company: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-[60vh] flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
          Become an Early Access Partner
        </h1>
        <p className="text-[var(--foreground)]/70 mb-4 text-sm">
          Get priority access to our platform. Limited spots.
        </p>
        <ul className="text-left text-[var(--foreground)]/70 text-xs mb-6 space-y-1.5 max-w-sm mx-auto">
          <li>• Influence product roadmap for African green finance.</li>
          <li>• Early visibility on curated SME and project pipeline.</li>
          <li>• Priority onboarding and support for partner teams.</li>
        </ul>
        {status === "submitted" ? (
          <div className="glass-card rounded-2xl p-8">
            <p className="text-[var(--primary)] font-medium">Thank you!</p>
            <p className="text-sm text-[var(--foreground)]/70 mt-1">
              We&apos;ll reach out with early access details.
            </p>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="ea-name" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1 text-left">
                  Name *
                </label>
                <input
                  id="ea-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="ea-email" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1 text-left">
                  Email *
                </label>
                <input
                  id="ea-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="ea-company" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1 text-left">
                  Company
                </label>
                <input
                  id="ea-company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                  className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                  placeholder="Your company"
                />
              </div>
              {status === "error" && (
                <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
              )}
              <Button type="submit" className="w-full" disabled={status === "loading"}>
                {status === "loading" ? "Submitting..." : "Apply for Early Access"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
