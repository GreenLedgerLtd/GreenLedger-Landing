"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { submitPlaybook } from "@/lib/forms";

export default function PlaybookPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "submitted" | "error">("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await submitPlaybook({ email });
      if (res.ok) {
        setStatus("submitted");
        setEmail("");
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
          Download Green Finance Playbook
        </h1>
        <p className="text-[var(--foreground)]/70 mb-4 text-sm">
          Coming soon. Enter your email to get notified when it&apos;s available.
        </p>
        <ul className="text-left text-[var(--foreground)]/70 text-xs mb-6 space-y-1.5 max-w-sm mx-auto">
          <li>• Practical checklist for structuring SME green projects.</li>
          <li>• Examples of bank-ready documentation and data points.</li>
          <li>• Insights from African green finance practitioners.</li>
        </ul>
        {status === "submitted" ? (
          <div className="glass-card rounded-2xl p-8">
            <p className="text-[var(--primary)] font-medium">You&apos;re on the list!</p>
            <p className="text-sm text-[var(--foreground)]/70 mt-1">
              We&apos;ll email you when the playbook launches.
            </p>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="pb-email" className="block text-sm font-medium text-[var(--foreground)]/80 mb-1 text-left">
                  Email *
                </label>
                <input
                  id="pb-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[var(--glass-border)] bg-[var(--background)] px-4 py-2.5 text-[var(--foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                  placeholder="you@company.com"
                />
              </div>
              {status === "error" && (
                <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
              )}
              <Button type="submit" className="w-full" disabled={status === "loading"}>
                {status === "loading" ? "Submitting..." : "Notify Me"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
