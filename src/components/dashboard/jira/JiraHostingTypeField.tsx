import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface JiraHostingTypeFieldProps {
  value: "cloud" | "server";
  onChange: (value: "cloud" | "server") => void;
}

export const JiraHostingTypeField = ({ value, onChange }: JiraHostingTypeFieldProps) => {
  return (
    <div>
      <label className="text-sm font-medium">Hosting Type</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="cloud">Cloud</SelectItem>
          <SelectItem value="server">Server</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};