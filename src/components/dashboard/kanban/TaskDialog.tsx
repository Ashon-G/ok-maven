import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserCircle } from "lucide-react";

interface Task {
  title: string;
  description: string | null;
  assignee?: { full_name: string } | null;
}

interface TaskDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TaskDialog = ({ task, open, onOpenChange }: TaskDialogProps) => {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-[#172b4d]">
            {task.title}
          </DialogTitle>
        </DialogHeader>
        {task.description && (
          <div className="mt-4 text-sm text-[#172b4d]">
            {task.description}
          </div>
        )}
        {task.assignee && (
          <div className="mt-6 flex items-center gap-2">
            <div className="text-sm text-[#5e6c84]">Assigned to:</div>
            <div className="flex items-center gap-1 px-2 py-1 rounded-sm bg-[#ebecf0]">
              <UserCircle className="h-4 w-4" />
              <span className="text-sm">{task.assignee.full_name}</span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};