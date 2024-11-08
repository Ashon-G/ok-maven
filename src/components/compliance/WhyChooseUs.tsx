import React from "react";
import { Check } from "lucide-react";

const benefits = [
  {
    title: "Expert Compliance Management",
    description: "Let our specialists handle your compliance requirements",
  },
  {
    title: "Risk Mitigation",
    description: "Protect your program from compliance-related issues",
  },
  {
    title: "Dedicated Support",
    description: "Direct access to compliance experts whenever you need them",
  },
  {
    title: "Peace of Mind",
    description: "Focus on your program while we handle compliance",
  },
];

export const WhyChooseUs = () => (
  <div className="mt-12 bg-secondary/5 rounded-xl p-8 max-w-3xl mx-auto">
    <h3 className="text-xl font-semibold mb-4 text-center">
      Why Choose Our Compliance Support?
    </h3>
    <div className="grid gap-6 md:grid-cols-2">
      {benefits.map((benefit) => (
        <div key={benefit.title} className="flex items-start gap-3">
          <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
          <div>
            <p className="font-medium text-black">{benefit.title}</p>
            <p className="text-sm text-black">
              {benefit.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);