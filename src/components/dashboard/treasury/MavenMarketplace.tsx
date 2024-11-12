import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/integrations/supabase/types/profile";
import { PopularServices } from "./sections/PopularServices";
import { RecentlyViewed } from "./sections/RecentlyViewed";
import { MavenGrid } from "./sections/MavenGrid";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const MavenMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredMavens = mavens?.filter((maven) =>
    maven.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    maven.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    maven.maven_skillset?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-8 space-y-12">
      <div className="flex items-center gap-4">
        <Input
          placeholder="Search services"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>
      
      <PopularServices mavens={mavens || []} />
      <RecentlyViewed mavens={mavens || []} />
      <MavenGrid title="All Services" mavens={filteredMavens || []} />
    </div>
  );
};