import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
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
    <div className="w-[272px] flex-shrink-0">
      <div className="bg-[#f1f2f4] rounded-[3px]">
        <div className="flex items-center justify-between p-2 font-medium text-sm">
          <h3>{title}</h3>
          <button className="p-1.5 hover:bg-black/5 rounded-sm">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div
          ref={setNodeRef}
          className="p-1 min-h-[1px]"
        >
          <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-2">
              {tasks.map((task) => (
                <SortableTask key={task.id} id={task.id} task={task} />
              ))}
            </div>
          </SortableContext>
        </div>
      </div>
    </div>
  );
};