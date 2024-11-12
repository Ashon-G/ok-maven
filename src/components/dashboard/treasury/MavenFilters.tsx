import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { MavenSkillset } from "@/integrations/supabase/types/profile";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

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
        <Button variant="outline" size="sm" className="rounded-full px-6">
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-4" align="end">
        <div className="space-y-2">
          {filters.map((filter, index) => (
            <button
              key={filter}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                selectedFilters.includes(index)
                  ? "bg-secondary text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleFilterSelect(index)}
            >
              {filter}
              {selectedFilters.includes(index) && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};