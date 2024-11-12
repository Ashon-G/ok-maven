import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Profile } from "@/integrations/supabase/types/profile";

interface MavenCardProps {
  maven: Profile;
}

export const MavenCard = ({ maven }: MavenCardProps) => {
  return (
    <Card className="w-[250px] shrink-0 cursor-pointer transition-all hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <img
            src={maven.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg"}
            alt={maven.full_name || "Maven"}
            className="h-12 w-12 rounded-full"
          />
          <div>
            <h3 className="font-medium">{maven.full_name?.split(" ")[0]}</h3>
            <Badge variant="secondary" className="mt-1">
              {maven.maven_skillset}
            </Badge>
          </div>
        </div>
        <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
          {maven.bio || "Maven on the platform"}
        </p>
      </CardContent>
    </Card>
  );
};