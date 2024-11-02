import { Check } from "lucide-react";

export const Pricing = () => {
  const features = [
    "Dedicated Maven expert",
    "Unlimited consultations",
    "Product development support",
    "Marketing strategy",
    "Technical guidance",
    "Weekly progress reports",
  ];

  return (
    <section id="pricing" className="bg-white py-24">
      <div className="container">
        <h2 className="mb-16 text-center text-4xl font-bold">
          Simple, Transparent <span className="gradient-text">Pricing</span>
        </h2>
        <div className="mx-auto max-w-lg rounded-2xl border border-secondary bg-white p-8 shadow-lg">
          <div className="mb-8 text-center">
            <h3 className="mb-2 text-2xl font-semibold">Maven Membership</h3>
            <div className="mb-4">
              <span className="text-5xl font-bold">$500</span>
              <span className="text-muted">/month</span>
            </div>
            <p className="text-muted">Cancel anytime. No contracts.</p>
          </div>
          <ul className="mb-8 space-y-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <Check className="h-5 w-5 text-secondary" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <button className="w-full rounded-full bg-secondary py-4 font-semibold text-white transition-all hover:bg-secondary/90">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};