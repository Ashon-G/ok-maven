import { Button } from "@/components/ui/button";
import { MavenSkillset } from "@/integrations/supabase/types/profile";

interface MavenFiltersProps {
  selectedSkillset: MavenSkillset | "all";
  onSkillsetChange: (skillset: MavenSkillset | "all") => void;
}

const SKILLSETS: MavenSkillset[] = [
  "Developer",
  "Marketer",
  "Copywriter",
  "Designer",
  "Accounting",
  "Sales",
  "Other",
];

export const MavenFilters = ({ selectedSkillset, onSkillsetChange }: MavenFiltersProps) => {
  return (
    <div className="flex flex-wrap gap-2 py-4">
      <Button
        variant={selectedSkillset === "all" ? "default" : "outline"}
        onClick={() => onSkillsetChange("all")}
      >
        All Mavens
      </Button>
      {SKILLSETS.map((skillset) => (
        <Button
          key={skillset}
          variant={selectedSkillset === skillset ? "default" : "outline"}
          onClick={() => onSkillsetChange(skillset)}
        >
          {skillset}
        </Button>
      ))}
    </div>
  );
};