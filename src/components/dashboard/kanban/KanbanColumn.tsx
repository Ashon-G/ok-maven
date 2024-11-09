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
  status: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export const KanbanColumn = ({ title, status, tasks, onTaskClick }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({ 
    id: status,
  });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { session } = useAuth();

  return (
    <div className="w-[400px] flex-shrink-0">
      <div className="bg-[#ebecf0] rounded-lg">
        <div className="flex items-center justify-between px-3 py-2.5">
          <h3 className="text-sm font-medium text-[#172b4d]">{title}</h3>
          <button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="p-1.5 hover:bg-[#dadbe2] rounded-sm transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div
          ref={setNodeRef}
          className="px-2 pb-2 min-h-[50px]"
        >
          <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-3">
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