import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreateTaskFormProps {
  availableMavens: any[];
  jiraIntegration: any;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export const CreateTaskForm = ({
  availableMavens,
  jiraIntegration,
  onSubmit,
  isSubmitting,
}: CreateTaskFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMaven, setSelectedMaven] = useState("");
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();

  const handleSubmit = () => {
    onSubmit({
      title,
      description,
      assigned_to: selectedMaven || null,
      start_date: startDate ? new Date(startDate).toISOString() : null,
      end_date: endDate ? new Date(endDate).toISOString() : null,
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium">Title</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Description</label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Start Date</label>
          <Input
            type="date"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium">End Date</label>
          <Input
            type="date"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Assign to Maven</label>
        <Select value={selectedMaven} onValueChange={setSelectedMaven}>
          <SelectTrigger>
            <SelectValue placeholder="Select a Maven" />
          </SelectTrigger>
          <SelectContent>
            {availableMavens?.map((maven) => (
              <SelectItem key={maven.id} value={maven.id}>
                {maven.full_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        onClick={handleSubmit}
        disabled={!title || isSubmitting}
        className="w-full"
      >
        {isSubmitting && (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        )}
        Create Task {jiraIntegration && "& Jira Issue"}
      </Button>
    </div>
  );
};