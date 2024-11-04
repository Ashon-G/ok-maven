import { Button } from "@/components/ui/button";
import CountdownTimer from "@/components/sales/CountdownTimer"; // Updated import

const UpgradePlan = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/95 to-primary">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            Upgrade to Maven Pro
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/80">
            Get unlimited access to expert Mavens and accelerate your startup's growth
          </p>
        </div>

        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-8 text-center">
            <span className="mb-2 inline-block rounded-full bg-secondary/20 px-4 py-1 text-sm font-medium text-secondary">
              Limited Time Offer
            </span>
            <h2 className="mb-2 text-3xl font-bold text-primary">
              $500<span className="text-lg font-normal text-gray-600">/month</span>
            </h2>
            <CountdownTimer />
          </div>

          <div className="mb-8 space-y-4">
            <Feature text="Access to pre-vetted, experienced startup professionals" />
            <Feature text="Unlimited consultations and support" />
            <Feature text="Priority response times" />
            <Feature text="Custom growth strategies" />
            <Feature text="Monthly progress reviews" />
            <Feature text="Cancel anytime - no long-term contracts" />
          </div>

          <div className="text-center">
            <Button size="lg" className="w-full max-w-md bg-secondary text-white hover:bg-secondary/90">
              Upgrade Now
            </Button>
            <p className="mt-4 text-sm text-gray-600">
              30-day money-back guarantee. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3">
    <svg
      className="h-5 w-5 text-secondary"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 13l4 4L19 7"
      />
    </svg>
    <span className="text-gray-700">{text}</span>
  </div>
);

export default UpgradePlan;