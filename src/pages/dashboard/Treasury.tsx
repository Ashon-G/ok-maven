import { SwipeCarousel } from "@/components/dashboard/treasury/SwipeCarousel";
import { MavenMarketplace } from "@/components/dashboard/treasury/MavenMarketplace";

const Treasury = () => {
  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-8 text-3xl font-bold">Treasury</h1>
      <SwipeCarousel />
      <MavenMarketplace />
    </div>
  );
};

export default Treasury;