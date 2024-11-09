import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ProjectBasicFieldsProps {
  title: string;
  description: string;
  targetAudience: string;
  timeline: string;
  onChange: (field: string, value: string) => void;
}

export const ProjectBasicFields = ({
  title,
  description,
  targetAudience,
  timeline,
  onChange,
}: ProjectBasicFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => onChange("title", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Project Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Describe your project in detail..."
          required
          className="min-h-[150px]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="target_audience">Target Audience</Label>
        <Input
          id="target_audience"
          value={targetAudience}
          onChange={(e) => onChange("target_audience", e.target.value)}
          placeholder="Who is this project for?"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeline">Timeline</Label>
        <Input
          id="timeline"
          value={timeline}
          onChange={(e) => onChange("timeline", e.target.value)}
          placeholder="Expected timeline for the project"
        />
      </div>
    </>
  );
};