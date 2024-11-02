import { VelocityHero } from "@/components/landing/Hero";
import { CountUpStats } from "@/components/landing/CountUpStats";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { CTA } from "@/components/landing/CTA";
import ScrollFeatures from "@/components/landing/ScrollFeatures";

const Index = () => {
  return (
    <main className="min-h-screen">
      <VelocityHero />
      <CountUpStats />
      <ScrollFeatures />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
    </main>
  );
};

export default Index;