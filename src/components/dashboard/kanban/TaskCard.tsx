import { UserCircle } from "lucide-react";

interface Task {
  title: string;
  description: string | null;
  assignee?: { full_name: string } | null;
}

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="bg-white rounded-[3px] shadow-sm hover:bg-gray-50 cursor-pointer p-2 group">
      <div className="text-sm text-gray-700">{task.title}</div>
      {task.description && (
        <div className="text-xs text-gray-500 mt-1">
          {task.description}
        </div>
      )}
      {task.assignee && (
        <div className="flex items-center mt-2 text-xs text-gray-500">
          <div className="flex items-center gap-1 px-2 py-1 rounded-sm bg-gray-100">
            <UserCircle className="h-3 w-3" />
            <span>{task.assignee.full_name}</span>
          </div>
        </div>
      )}
    </div>
  );
};