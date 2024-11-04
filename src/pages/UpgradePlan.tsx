import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import CountdownTimer from "@/components/sales/CountdownTimer";

const UpgradePlan = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUpgrade = () => {
    // TODO: Implement Stripe checkout
    toast({
      title: "Coming soon!",
      description: "Payment integration will be available soon.",
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <CountdownTimer />
      <div className="container max-w-5xl py-16">
        <div className="mb-8 text-center">
          <span className="inline-block mb-4 px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
            Limited Time Offer - Only 5 Spots Left!
          </span>
          <p className="mt-4 text-secondary font-medium">
            🔥 Over 50 founders upgraded this month - Don't miss out!
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-secondary p-8 shadow-lg max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-8 border-b">
            <div>
              <p className="text-foreground">
                Double your expertise, accelerate your success
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-secondary line-through mb-1">$299/month</div>
              <div className="text-4xl font-bold">$99</div>
              <div className="text-muted-foreground">/month</div>
              <div className="text-xs text-secondary font-medium mt-1">Early adopter pricing</div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Two Additional Maven Students</p>
                <p className="text-foreground text-sm">
                  Unlock the power of specialized expertise with dedicated support in marketing,
                  development, or design - tailored to your startup's unique needs
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Diverse Skill Sets</p>
                <p className="text-foreground text-sm">
                  Leverage the knowledge of top students from prestigious universities,
                  bringing fresh perspectives and cutting-edge strategies to your business
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Faster Progress</p>
                <p className="text-foreground text-sm">
                  Triple your execution speed with parallel support across multiple
                  areas, turning your vision into reality faster than ever
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-secondary mt-1 flex-shrink-0" />
              <div>
                <p className="font-medium">Priority Support</p>
                <p className="text-foreground text-sm">
                  Get VIP treatment with faster response times and dedicated attention
                  from your expanded Maven team, ensuring no opportunity is missed
                </p>
              </div>
            </div>
          </div>

          <div className="bg-secondary/5 p-4 rounded-lg mb-8">
            <p className="text-sm text-foreground">
              <span className="font-medium">⚡ Act fast:</span> This special pricing is only available for the next 48 hours. Join the 200+ founders who have already accelerated their growth with Maven Plus.
            </p>
          </div>

          <Button
            onClick={handleUpgrade}
            className="w-full bg-secondary text-white hover:bg-secondary/90 py-6 text-lg"
          >
            Upgrade Now - Limited Spots Available
          </Button>

          <p className="text-center text-muted-foreground text-sm mt-4">
            No long-term commitment - cancel or modify your subscription anytime
          </p>
        </div>
      </div>
    </main>
  );
};

export default UpgradePlan;
