import { VelocityHero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing } from "@/components/landing/Pricing";
import { CTA } from "@/components/landing/CTA";

const Index = () => {
  return (
    <main className="min-h-screen">
      <VelocityHero />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
    </main>
  );
};

export default Index;