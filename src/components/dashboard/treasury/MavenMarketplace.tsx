import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MavenCarousel } from "./MavenCarousel";
import { MavenFilters } from "./MavenFilters";
import { useState } from "react";
import { Profile } from "@/integrations/supabase/types/profile";

export const MavenMarketplace = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const { data: mavens } = useQuery({
    queryKey: ["mavens"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_type", "maven");

      if (error) throw error;
      return data as Profile[];
    },
  });

  const filteredMavens = mavens?.filter(
    (maven) =>
      selectedFilters.length === 0 ||
      (maven.maven_skillset && selectedFilters.includes(maven.maven_skillset))
  );

  const mavensByLocation = filteredMavens?.reduce((acc, maven) => {
    const location = maven.location || "Remote";
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(maven);
    return acc;
  }, {} as Record<string, Profile[]>);

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between border-b border-gray-200 pb-6">
        <h2 className="text-2xl font-bold">Maven Marketplace</h2>
        <MavenFilters onFilterChange={setSelectedFilters} />
      </div>
      <div className="mt-6 space-y-8">
        {mavensByLocation &&
          Object.entries(mavensByLocation).map(([location, mavens]) => (
            <MavenCarousel
              key={location}
              title={`${location} Mavens`}
              mavens={mavens}
            />
          ))}
      </div>
    </div>
  );
};