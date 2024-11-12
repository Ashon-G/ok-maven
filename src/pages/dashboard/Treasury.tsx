import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MavenCarousel } from "@/components/dashboard/treasury/MavenCarousel";
import { MavenFilters } from "@/components/dashboard/treasury/MavenFilters";
import { Loader2 } from "lucide-react";
import { MavenSkillset, Profile } from "@/integrations/supabase/types/profile";

const Treasury = () => {
  const [selectedSkillset, setSelectedSkillset] = useState<MavenSkillset | "all">("all");

  const { data: mavens, isLoading } = useQuery({
    queryKey: ["mavens"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_type", "maven")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Profile[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const filteredMavens = mavens?.filter(
    (maven) => selectedSkillset === "all" || maven.maven_skillset === selectedSkillset
  );

  // Group mavens by location
  const mavensByLocation = filteredMavens?.reduce((acc, maven) => {
    const location = maven.location || "Other Locations";
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(maven);
    return acc;
  }, {} as Record<string, Profile[]>);

  return (
    <div className="container mx-auto px-4">
      <h1 className="mb-8 text-3xl font-bold">Maven Marketplace</h1>
      
      <MavenFilters
        selectedSkillset={selectedSkillset}
        onSkillsetChange={setSelectedSkillset}
      />

      <div className="space-y-8">
        {mavensByLocation && Object.entries(mavensByLocation).map(([location, locationMavens]) => (
          <MavenCarousel
            key={location}
            title={location}
            mavens={locationMavens}
          />
        ))}
      </div>
    </div>
  );
};

export default Treasury;