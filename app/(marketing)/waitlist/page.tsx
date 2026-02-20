import { WaitlistForm } from "@/components/landing/forms/WaitlistForm";

export default function WaitlistPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center py-24 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2 text-center">
          Join the Waitlist
        </h1>
        <p className="text-[var(--foreground)]/70 text-center mb-8 text-sm">
          Be the first to access green capital for your sustainable business.
        </p>
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <WaitlistForm />
        </div>
        <p className="mt-4 text-center text-xs text-[var(--foreground)]/50">
          Full onboarding and platform access — coming soon.
        </p>
      </div>
    </main>
  );
}
