import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import CountdownTimer from "@/components/sales/CountdownTimer";

const CompliancePackages = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePurchase = (packageName: string) => {
    // TODO: Implement Stripe checkout
    toast({
      title: "Coming soon!",
      description: `${packageName} package will be available for purchase soon.`,
    });
  };

  const packages = [
    {
      name: "Project Manager",
      originalPrice: 1000,
      discountedPrice: 299,
      period: "per 3 months",
      features: [
        "Dedicated project manager",
        "Weekly progress reports",
        "Resource allocation",
        "Risk management",
        "Stakeholder communication",
      ],
    },
    {
      name: "Documentation Package",
      originalPrice: 250,
      discountedPrice: 49,
      period: "one-time",
      features: [
        "Custom crafted policies",
        "Maven handbook",
        "Best practices guide",
        "Process documentation",
        "Compliance templates",
      ],
    },
    {
      name: "Done-for-You Program",
      originalPrice: 2050,
      discountedPrice: 169,
      period: "per 3 months",
      features: [
        "Complete orientation",
        "Project timeline setup",
        "Deliverables management",
        "Product feedback collection",
        "Academic credit processing",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <CountdownTimer />
      <div className="container max-w-6xl py-16">
        <div className="mb-12 text-center">
          <span className="inline-block mb-4 px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
            Limited Time Offer - Mix & Match Your Perfect Package
          </span>
          <h1 className="text-4xl font-bold mb-4">
            Customize Your <span className="gradient-text">Compliance Package</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
            Choose the components that best fit your needs. Purchase individually or
            combine for maximum value. Each package is carefully designed to enhance
            your Maven experience.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="bg-white rounded-2xl border border-border p-8 shadow-lg hover:border-secondary transition-colors"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold">${pkg.discountedPrice}</span>
                  <span className="text-muted-foreground">{pkg.period}</span>
                </div>
                <div className="text-sm text-secondary line-through mb-4">
                  Originally ${pkg.originalPrice}
                </div>
                <p className="text-muted-foreground">
                  {pkg.name === "Documentation Package"
                    ? "One-time purchase for permanent access"
                    : "Quarterly subscription, cancel anytime"}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handlePurchase(pkg.name)}
                className="w-full bg-secondary text-white hover:bg-secondary/90"
              >
                Get Started Now
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-secondary/5 rounded-xl p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Why Choose Our Compliance Packages?
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Flexible Solutions</p>
                <p className="text-sm text-muted-foreground">
                  Mix and match packages to create your perfect compliance solution
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Significant Savings</p>
                <p className="text-sm text-muted-foreground">
                  Save up to 90% with our limited-time promotional pricing
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Immediate Access</p>
                <p className="text-sm text-muted-foreground">
                  Get started right away with instant digital delivery
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Expert Support</p>
                <p className="text-sm text-muted-foreground">
                  Access to our team of compliance and program management experts
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CompliancePackages;