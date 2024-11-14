import { useState } from "react";
import { Profile } from "@/integrations/supabase/types/profile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MavenDetailsDialog } from "./MavenDetailsDialog";

interface ServiceCardProps {
  maven: Profile;
  compact?: boolean;
}

export const ServiceCard = ({ maven, compact }: ServiceCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card 
        className="group cursor-pointer overflow-hidden transition-all hover:-translate-y-1"
        onClick={() => setShowDetails(true)}
      >
        <div className="relative">
          <img
            src={maven.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg"}
            alt={maven.full_name || "Maven"}
            className="h-48 w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <img
                src={maven.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg"}
                alt={maven.full_name || "Maven"}
                className="h-8 w-8 rounded-full"
              />
              <div>
                <h3 className="font-medium">
                  {maven.full_name?.split(" ")[0]}
                </h3>
                <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                  {maven.maven_skillset}
                </Badge>
              </div>
            </div>
          </div>
          
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
            {maven.bio || "Maven on the platform"}
          </p>
        </div>
      </Card>

      <MavenDetailsDialog 
        maven={maven}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </>
  );
};