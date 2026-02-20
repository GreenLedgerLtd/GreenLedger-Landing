"use client";

import { createContext, useContext, useState, useCallback } from "react";

type CTAContextType = {
  openWaitlist: () => void;
  openPartner: () => void;
  closeWaitlist: () => void;
  closePartner: () => void;
  waitlistOpen: boolean;
  partnerOpen: boolean;
};

const CTAContext = createContext<CTAContextType | null>(null);

export function CTAProvider({ children }: { children: React.ReactNode }) {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);

  const openWaitlist = useCallback(() => setWaitlistOpen(true), []);
  const openPartner = useCallback(() => setPartnerOpen(true), []);
  const closeWaitlist = useCallback(() => setWaitlistOpen(false), []);
  const closePartner = useCallback(() => setPartnerOpen(false), []);

  return (
    <CTAContext.Provider
      value={{
        openWaitlist,
        openPartner,
        closeWaitlist,
        closePartner,
        waitlistOpen,
        partnerOpen,
      }}
    >
      {children}
    </CTAContext.Provider>
  );
}

export function useCTA() {
  const ctx = useContext(CTAContext);
  if (!ctx) throw new Error("useCTA must be used within CTAProvider");
  return ctx;
}
