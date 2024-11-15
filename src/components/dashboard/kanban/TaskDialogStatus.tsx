import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RatingDialog } from "./RatingDialog";

interface TaskDialogStatusProps {
  status: string;
  onStatusChange: (status: string) => void;
  canEdit: boolean;
  taskId: string;
  mavenId?: string;
  founderId: string;
}

export const TaskDialogStatus = ({
  status,
  onStatusChange,
  canEdit,
  taskId,
  mavenId,
  founderId,
}: TaskDialogStatusProps) => {
  const [showRating, setShowRating] = useState(false);

  const handleStatusChange = (newStatus: string) => {
    onStatusChange(newStatus);
    if (newStatus === "completed" && mavenId) {
      setShowRating(true);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Status</label>
      <Select value={status} onValueChange={handleStatusChange} disabled={!canEdit}>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">To Do</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
      {mavenId && (
        <RatingDialog
          open={showRating}
          onOpenChange={setShowRating}
          taskId={taskId}
          mavenId={mavenId}
          founderId={founderId}
        />
      )}
    </div>
  );
};