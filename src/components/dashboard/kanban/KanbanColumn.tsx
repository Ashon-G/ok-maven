import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { SortableTask } from "./SortableTask";
import { CreateTaskDialog } from "./CreateTaskDialog";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

interface Task {
  id: string;
  title: string;
  description: string | null;
  assignee?: { full_name: string } | null;
}

interface KanbanColumnProps {
  title: string;
  tasks: Task[];
  status: string;
  onTaskClick: (task: Task) => void;
}

export const KanbanColumn = ({ title, tasks, status, onTaskClick }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { session } = useAuth();

  return (
    <div className="flex-shrink-0 w-80">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-muted-foreground">
          {title} ({tasks.length})
        </div>
        <button 
          onClick={() => setIsCreateDialogOpen(true)}
          className="p-1.5 hover:bg-muted rounded-sm transition-colors"
        >
          <Plus className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <div
        ref={setNodeRef}
        className="bg-muted/30 rounded-lg p-2 min-h-[200px]"
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {tasks.map((task) => (
              <SortableTask
                key={task.id}
                id={task.id}
                task={task}
                onClick={() => onTaskClick(task)}
              />
            ))}
          </div>
        </SortableContext>
      </div>
      <CreateTaskDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        userId={session?.user.id}
        defaultStatus={status}
      />
    </div>
  );
};