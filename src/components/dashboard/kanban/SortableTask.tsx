import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskCard } from "./TaskCard";

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

  const handleClick = (e: React.MouseEvent) => {
    // Only trigger click if we're not dragging
    if (!isDragging) {
      e.stopPropagation();
      onClick();
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className={`${isDragging ? 'opacity-50' : ''}`}
      onClick={handleClick}
    >
      <TaskCard task={task} />
    </div>
  );
};