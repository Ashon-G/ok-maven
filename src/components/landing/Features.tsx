import { CheckCircle } from "lucide-react";

export const Features = () => {
  const features = [
    {
      title: "Expert Mavens",
      description: "Access to pre-vetted, experienced professionals who've built successful startups",
    },
    {
      title: "Fixed Monthly Rate",
      description: "Predictable pricing at $500/month with no hidden fees or long-term contracts",
    },
    {
      title: "Full-Stack Support",
      description: "From product development to marketing strategy and everything in between",
    },
    {
      title: "Rapid Execution",
      description: "Get your projects moving quickly with proven methodologies and frameworks",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="container">
        <h2 className="mb-12 text-center text-4xl font-bold">
          Why Choose <span className="gradient-text">Maven</span>?
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-gray-200 p-6 transition-all hover:border-secondary"
            >
              <CheckCircle className="mb-4 h-8 w-8 text-secondary" />
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};