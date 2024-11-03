import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const CompliancePackages = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPackages, setSelectedPackages] = useState<string[]>([]);

  const handleTogglePackage = (packageName: string) => {
    setSelectedPackages(prev => 
      prev.includes(packageName) 
        ? prev.filter(p => p !== packageName)
        : [...prev, packageName]
    );
  };

  const handlePurchase = () => {
    if (selectedPackages.length === 0) {
      toast({
        title: "No packages selected",
        description: "Please select at least one compliance package to continue.",
        variant: "destructive"
      });
      return;
    }
    // TODO: Implement Stripe checkout
    toast({
      title: "Coming soon!",
      description: `Selected packages will be available for purchase soon.`,
    });
  };

  const packages = [
    {
      name: "Project Manager",
      price: 299,
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
      price: 49,
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
      price: 169,
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

  const totalPrice = selectedPackages.reduce((sum, pkg) => {
    const packageData = packages.find(p => p.name === pkg);
    return sum + (packageData?.price || 0);
  }, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl py-16">
        <div className="mb-12">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-red-800 mb-3">
              Federal Compliance Requirements
            </h2>
            <p className="text-red-700 mb-4">
              Federal law mandates that educational programs maintain proper documentation, 
              oversight, and management systems. Non-compliance can result in serious consequences 
              including program suspension and legal penalties.
            </p>
            <p className="text-red-700">
              Don't risk your program's future. We can help you maintain full compliance 
              with all federal requirements through our comprehensive support services.
            </p>
          </div>

          <h1 className="text-4xl font-bold mb-4 text-center">
            Select Your <span className="gradient-text">Compliance Support</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-muted-foreground text-center">
            Choose the support services you need. Our team will handle all compliance 
            requirements, allowing you to focus on your program's success.
          </p>
        </div>

        <div className="space-y-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`bg-white rounded-2xl border p-6 shadow-sm transition-colors ${
                selectedPackages.includes(pkg.name) 
                  ? "border-secondary" 
                  : "border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold">{pkg.name}</h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold">${pkg.price}</span>
                    <span className="text-muted-foreground">{pkg.period}</span>
                  </div>
                </div>
                <Switch 
                  checked={selectedPackages.includes(pkg.name)}
                  onCheckedChange={() => handleTogglePackage(pkg.name)}
                />
              </div>

              <ul className="space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold">Total Investment</h3>
              <p className="text-muted-foreground mt-1">
                Selected packages: {selectedPackages.length}
              </p>
            </div>
            <span className="text-3xl font-bold">${totalPrice}</span>
          </div>
          
          <Button
            onClick={handlePurchase}
            className="w-full bg-secondary text-white hover:bg-secondary/90"
            disabled={selectedPackages.length === 0}
          >
            Complete Purchase
          </Button>
        </div>

        <div className="mt-12 bg-secondary/5 rounded-xl p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Why Choose Our Compliance Support?
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Expert Compliance Management</p>
                <p className="text-sm text-muted-foreground">
                  Let our specialists handle your compliance requirements
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Risk Mitigation</p>
                <p className="text-sm text-muted-foreground">
                  Protect your program from compliance-related issues
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Dedicated Support</p>
                <p className="text-sm text-muted-foreground">
                  Direct access to compliance experts whenever you need them
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Peace of Mind</p>
                <p className="text-sm text-muted-foreground">
                  Focus on your program while we handle compliance
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