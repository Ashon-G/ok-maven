import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Profile } from "@/integrations/supabase/types/profile";
import { StarIcon } from "lucide-react";

interface MavenCardProps {
  maven: Profile;
}

export const MavenCard = ({ maven }: MavenCardProps) => {
  return (
    <Card className="group w-[280px] shrink-0 cursor-pointer overflow-hidden transition-all hover:-translate-y-1">
      <div className="relative">
        <img
          src={maven.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg"}
          alt={maven.full_name || "Maven"}
          className="h-40 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium text-lg">
              {maven.full_name?.split(" ")[0]}
            </h3>
            <div className="flex items-center gap-1 text-sm text-yellow-500">
              <StarIcon className="h-4 w-4 fill-current" />
              <span>5.0</span>
              <span className="text-muted-foreground">(24)</span>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="bg-secondary/10 text-secondary hover:bg-secondary/20"
          >
            {maven.maven_skillset}
          </Badge>
        </div>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
          {maven.bio || "Maven on the platform"}
        </p>
        <div className="mt-4 flex items-center justify-between border-t pt-4">
          <span className="text-xs text-muted-foreground">Starting at</span>
          <span className="font-medium">$50/hr</span>
        </div>
      </CardContent>
    </Card>
  );
};