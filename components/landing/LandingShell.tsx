"use client";

import { Header } from "./Header";
import { Modal } from "@/components/ui/Modal";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SkipLink } from "@/components/ui/SkipLink";
import { WaitlistForm } from "./forms/WaitlistForm";
import { PartnerBankForm } from "./forms/PartnerBankForm";
import { CTAProvider, useCTA } from "./CTAContext";

function ShellContent({ children }: { children: React.ReactNode }) {
  const { openWaitlist, openPartner, closeWaitlist, closePartner, waitlistOpen, partnerOpen } =
    useCTA();

  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <Header onJoinWaitlist={openWaitlist} />
      {children}
      <Modal isOpen={waitlistOpen} onClose={closeWaitlist} title="Join the Waitlist">
        <WaitlistForm onSuccess={closeWaitlist} />
      </Modal>
      <Modal isOpen={partnerOpen} onClose={closePartner} title="Apply as Partner Bank">
        <PartnerBankForm onSuccess={closePartner} />
      </Modal>
    </>
  );
}

export function LandingShell({ children }: { children: React.ReactNode }) {
  return (
    <CTAProvider>
      <ShellContent>{children}</ShellContent>
    </CTAProvider>
  );
}
