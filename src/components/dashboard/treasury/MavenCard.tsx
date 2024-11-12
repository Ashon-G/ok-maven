import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { MavenSkillsetBadge } from "@/components/admin/MavenSkillsetBadge";
import { Profile } from "@/integrations/supabase/types/profile";

interface MavenCardProps {
  maven: Profile;
}

export const MavenCard = ({ maven }: MavenCardProps) => {
  const firstName = maven.full_name?.split(' ')[0] || 'Maven';
  const shortBio = maven.bio?.slice(0, 100) + (maven.bio && maven.bio.length > 100 ? '...' : '') || 'No bio available';

  return (
    <Card className="w-[300px] h-[200px] mx-2">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={maven.avatar_url || ""} />
            <AvatarFallback>{firstName[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h3 className="font-medium text-lg">{firstName}</h3>
            {maven.maven_skillset && (
              <MavenSkillsetBadge skillset={maven.maven_skillset} />
            )}
          </div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground line-clamp-3">{shortBio}</p>
      </CardContent>
    </Card>
  );
};