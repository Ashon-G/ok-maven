import { HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface JiraFormFieldProps {
  label: string;
  tooltip: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}

export const JiraFormField = ({
  label,
  tooltip,
  value,
  onChange,
  placeholder,
  type = "text",
}: JiraFormFieldProps) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium">{label}</label>
        <Tooltip>
          <TooltipTrigger>
            <HelpCircle className="h-4 w-4" />
          </TooltipTrigger>
          <TooltipContent className="bg-popover border border-border shadow-md">
            <p className="max-w-xs text-popover-foreground">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};