"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { submitBookCall } from "@/lib/forms";

export default function BookCallPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "submitted" | "error">("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await submitBookCall(formData);
      if (res.ok) {
        setStatus("submitted");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "submitted") {
    return (
      <main className="min-h-[60vh] flex items-center justify-center py-24 px-4">
        <div className="w-full max-w-md text-center">
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-4">
            Request Received
          </h1>
          <p className="text-[var(--foreground)]/70 mb-6">
            We&apos;ll be in touch shortly to schedule your call.
          </p>
          <Link href="/">
            <Button variant="secondary">Back to Home</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[60vh] flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2 text-center">
          Book a Call
        </h1>
        <p className="text-[var(--foreground)]/70 text-center mb-8 text-sm">
          Schedule a conversation with our team. We&apos;d love to hear about your green finance goals.
        </p>
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="bc-name" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1">
                Name *
              </label>
              <input
                id="bc-name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="bc-email" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1">
                Email *
              </label>
              <input
                id="bc-email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="bc-message" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1">
                Message
              </label>
              <textarea
                id="bc-message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] resize-none"
                placeholder="What would you like to discuss?"
              />
            </div>
            {status === "error" && (
              <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
            )}
            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? "Submitting..." : "Request Call"}
            </Button>
          </form>
        </div>
        <p className="mt-4 text-center text-xs text-[var(--foreground)]/50">
          Calendly integration — coming soon.
        </p>
      </div>
    </main>
  );
}
