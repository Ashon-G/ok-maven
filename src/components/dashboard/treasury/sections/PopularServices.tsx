import { Profile } from "@/integrations/supabase/types/profile";
import { ServiceCard } from "../ServiceCard";

interface PopularServicesProps {
  mavens: Profile[];
}

export const PopularServices = ({ mavens }: PopularServicesProps) => {
  // For demo, just show first 6 mavens as popular
  const popularMavens = mavens.slice(0, 6);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Popular services</h2>
        <button className="text-sm text-secondary hover:underline">See All</button>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {popularMavens.map((maven) => (
          <ServiceCard key={maven.id} maven={maven} compact />
        ))}
      </div>
    </section>
  );
};