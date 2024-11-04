import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ComplianceWarning } from "@/components/compliance/ComplianceWarning";
import { CompliancePackageCard } from "@/components/compliance/CompliancePackageCard";
import { WhyChooseUs } from "@/components/compliance/WhyChooseUs";

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
    toast({
      title: "Coming soon!",
      description: `Selected packages will be available for purchase soon.`,
    });
  };

  const totalPrice = selectedPackages.reduce((sum, pkg) => {
    const packageData = packages.find(p => p.name === pkg);
    return sum + (packageData?.price || 0);
  }, 0);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container max-w-6xl py-16">
        <ComplianceWarning />

        <div className="space-y-6">
          {packages.map((pkg) => (
            <CompliancePackageCard
              key={pkg.name}
              {...pkg}
              isSelected={selectedPackages.includes(pkg.name)}
              onToggle={() => handleTogglePackage(pkg.name)}
            />
          ))}
        </div>

        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-black">
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

        <WhyChooseUs />
      </div>
    </main>
  );
};

export default CompliancePackages;
