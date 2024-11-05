import { Badge } from "@/components/ui/badge";
import { BadgeCheck } from "lucide-react";

type SkillsetBadgeProps = {
  skillset: string | null;
};

const getSkillsetColor = (skillset: string | null) => {
  switch (skillset) {
    case "Developer":
      return "bg-blue-100 text-blue-800";
    case "Marketer":
      return "bg-green-100 text-green-800";
    case "Copywriter":
      return "bg-purple-100 text-purple-800";
    case "Designer":
      return "bg-pink-100 text-pink-800";
    case "Accounting":
      return "bg-yellow-100 text-yellow-800";
    case "Sales":
      return "bg-orange-100 text-orange-800";
    case "Other":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const MavenSkillsetBadge = ({ skillset }: SkillsetBadgeProps) => {
  if (!skillset) return null;

  return (
    <Badge variant="outline" className={`${getSkillsetColor(skillset)} gap-1`}>
      <BadgeCheck className="h-3 w-3" />
      {skillset}
    </Badge>
  );
};