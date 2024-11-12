import { Profile } from "@/integrations/supabase/types/profile";
import { ServiceCard } from "../ServiceCard";

interface RecentlyViewedProps {
  mavens: Profile[];
}

export const RecentlyViewed = ({ mavens }: RecentlyViewedProps) => {
  // For demo, just show last 4 mavens as recently viewed
  const recentMavens = mavens.slice(-4);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recently viewed</h2>
        <button className="text-sm text-secondary hover:underline">See All</button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {recentMavens.map((maven) => (
          <ServiceCard key={maven.id} maven={maven} />
        ))}
      </div>
    </section>
  );
};