import { Profile } from "@/integrations/supabase/types/profile";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  maven: Profile;
  compact?: boolean;
}

export const ServiceCard = ({ maven, compact }: ServiceCardProps) => {
  return (
    <Card className={cn(
      "group cursor-pointer overflow-hidden transition-all hover:-translate-y-1",
      compact ? "w-full" : "w-full"
    )}>
      <div className="relative">
        <img
          src={maven.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg"}
          alt={maven.full_name || "Maven"}
          className={cn(
            "w-full object-cover",
            compact ? "h-32" : "h-48"
          )}
        />
        <button className="absolute right-3 top-3 rounded-full bg-white p-1.5 opacity-0 transition-opacity group-hover:opacity-100">
          <Heart className="h-4 w-4" />
        </button>
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
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span>5.0</span>
                <span className="text-muted-foreground">(24)</span>
              </div>
            </div>
          </div>
          {!compact && (
            <Badge variant="secondary" className="bg-secondary/10 text-secondary">
              {maven.maven_skillset}
            </Badge>
          )}
        </div>
        
        {!compact && (
          <>
            <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
              {maven.bio || "Maven on the platform"}
            </p>
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <span className="text-xs text-muted-foreground">Starting at</span>
              <span className="font-medium">$50/hr</span>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};