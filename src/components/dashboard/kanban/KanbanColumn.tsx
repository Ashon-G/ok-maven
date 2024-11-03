import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
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
  status: string;
  tasks: Task[];
}

export const KanbanColumn = ({ title, status, tasks }: KanbanColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div className="bg-gray-50 rounded-lg p-4 h-[calc(100vh-16rem)]">
      <h3 className="font-semibold mb-4">{title}</h3>
      <div ref={setNodeRef} className="space-y-3 h-full overflow-y-auto">
        <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableTask key={task.id} id={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};