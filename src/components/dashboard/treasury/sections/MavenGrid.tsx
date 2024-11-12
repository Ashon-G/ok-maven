import { Profile } from "@/integrations/supabase/types/profile";
import { ServiceCard } from "../ServiceCard";

interface MavenGridProps {
  title: string;
  mavens: Profile[];
}

export const MavenGrid = ({ title, mavens }: MavenGridProps) => {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button className="text-sm text-secondary hover:underline">See All</button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {mavens.map((maven) => (
          <ServiceCard key={maven.id} maven={maven} />
        ))}
      </div>
    </section>
  );
};