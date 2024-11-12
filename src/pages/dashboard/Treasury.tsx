import { SwipeCarousel } from "@/components/dashboard/treasury/SwipeCarousel";
import { MavenMarketplace } from "@/components/dashboard/treasury/MavenMarketplace";

const Treasury = () => {
  return (
    <div className="container mx-auto">
      <SwipeCarousel />
      <MavenMarketplace />
    </div>
  );
};

export default Treasury;