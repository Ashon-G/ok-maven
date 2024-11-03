import { Textarea } from "@/components/ui/textarea";
import { UserCircle, Calendar } from "lucide-react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskDialogContentProps {
  description: string | null;
  isEditing: boolean;
  editedDescription: string;
  setEditedDescription: (description: string) => void;
  assignee?: { full_name: string } | null;
  dueDate: string | null;
  status: string;
  onStatusChange: (status: string) => void;
}

export const TaskDialogContent = ({
  description,
  isEditing,
  editedDescription,
  setEditedDescription,
  assignee,
  dueDate,
  status,
  onStatusChange,
}: TaskDialogContentProps) => {
  const columns = [
    { id: "pending", title: "To Do" },
    { id: "in-progress", title: "In Progress" },
    { id: "completed", title: "Completed" },
  ];

  return (
    <div className="mt-4 space-y-6">
      {isEditing ? (
        <Textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          placeholder="Add a description..."
          className="min-h-[100px]"
        />
      ) : (
        <div className="text-sm text-[#172b4d]">
          {description || "No description provided"}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {columns.map((column) => (
                <SelectItem key={column.id} value={column.id}>
                  {column.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {assignee && (
          <div className="flex items-center gap-2">
            <UserCircle className="h-4 w-4 text-[#5e6c84]" />
            <span className="text-sm">{assignee.full_name}</span>
          </div>
        )}
        {dueDate && (
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#5e6c84]" />
            <span className="text-sm">
              {format(new Date(dueDate), "PPP")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};