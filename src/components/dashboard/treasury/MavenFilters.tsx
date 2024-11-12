import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckPill } from "@/components/supports/CheckPill";
import { useState } from "react";
import { MavenSkillset } from "@/integrations/supabase/types/profile";

interface MavenFiltersProps {
  onFilterChange: (filters: string[]) => void;
}

export const MavenFilters = ({ onFilterChange }: MavenFiltersProps) => {
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);
  const filters: MavenSkillset[] = [
    "Developer",
    "Marketer",
    "Copywriter",
    "Designer",
    "Accounting",
    "Sales",
  ];

  const handleFilterSelect = (index: number) => {
    const newFilters = selectedFilters.includes(index)
      ? selectedFilters.filter((i) => i !== index)
      : [...selectedFilters, index];
    
    setSelectedFilters(newFilters);
    onFilterChange(newFilters.map((i) => filters[i]));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-full">
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4" align="start">
        <div className="space-y-2">
          {filters.map((filter, index) => (
            <CheckPill
              key={filter}
              selected={selectedFilters.includes(index)}
              setSelected={() => handleFilterSelect(index)}
              index={index}
            >
              {filter}
            </CheckPill>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};