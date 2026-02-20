import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { Solution } from "@/components/landing/Solution";
import { DualValue } from "@/components/landing/DualValue";
import { Credibility } from "@/components/landing/Credibility";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Vision } from "@/components/landing/Vision";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main id="main-content" aria-label="Main content">
      <Hero />
      <Problem />
      <Solution />
      <DualValue />
      <Credibility />
      <HowItWorks />
      <Vision />
      <CTA />
      <Footer />
    </main>
  );
}
