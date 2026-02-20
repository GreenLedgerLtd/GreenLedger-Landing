import { PartnerBankForm } from "@/components/landing/forms/PartnerBankForm";

export default function PartnerBankPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2 text-center">
          Apply as Partner Bank
        </h1>
        <p className="text-[var(--foreground)]/70 text-center mb-8 text-sm">
          Join our verified green deal pipeline. ESG-aligned capital deployment.
        </p>
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <PartnerBankForm />
        </div>
        <p className="mt-4 text-center text-xs text-[var(--foreground)]/50">
          Partner onboarding — coming soon.
        </p>
      </div>
    </main>
  );
}
