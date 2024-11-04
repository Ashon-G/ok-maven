import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableTask } from "./SortableTask";

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

  return (
    <div className="flex-shrink-0 w-80">
      <div className="mb-3 text-sm font-medium text-muted-foreground">
        {title} ({tasks.length})
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
    </div>
  );
};