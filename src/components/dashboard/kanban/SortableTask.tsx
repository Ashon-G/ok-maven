import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskCard } from "./TaskCard";
import { GripVertical } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string | null;
  assignee?: { full_name: string } | null;
}

interface SortableTaskProps {
  id: string;
  task: Task;
  onClick: () => void;
}

export const SortableTask = ({ id, task, onClick }: SortableTaskProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style}
      className={`${isDragging ? 'opacity-50' : ''} relative group`}
    >
      <div 
        className="absolute left-0 top-0 bottom-0 w-6 flex items-center justify-center cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
        {...attributes} 
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>
      <div 
        className="pl-6 cursor-pointer"
        onClick={() => !isDragging && onClick()}
      >
        <TaskCard task={task} />
      </div>
    </div>
  );
};