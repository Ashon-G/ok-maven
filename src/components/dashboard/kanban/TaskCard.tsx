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
    <div className="bg-white rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer p-2.5 group transition-all hover:shadow-md">
      <div className="text-sm text-[#172b4d] font-medium">{task.title}</div>
      {task.description && (
        <div className="text-xs text-[#5e6c84] mt-2 line-clamp-2">
          {task.description}
        </div>
      )}
      {task.assignee && (
        <div className="flex items-center mt-2">
          <div className="flex items-center gap-1 px-2 py-1 rounded-sm bg-[#ebecf0] text-xs text-[#5e6c84]">
            <UserCircle className="h-3 w-3" />
            <span>{task.assignee.full_name}</span>
          </div>
        </div>
      )}
    </div>
  );
};