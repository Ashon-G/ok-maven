import { UserCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface Task {
  title: string;
  description: string | null;
  assignee?: { full_name: string } | null;
  due_date?: string | null;
}

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  // Extract milestone title from description if it exists
  const milestoneTitle = task.description?.split('\n\n')[0] || '';
  const duration = task.description?.split('\n\n')[1] || '';
  const description = task.description?.split('\n\n').slice(2).join('\n\n') || '';

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer p-4 group transition-all hover:shadow-md space-y-3"
    >
      {milestoneTitle && (
        <div className="text-xs font-medium text-blue-600 uppercase tracking-wider">
          {milestoneTitle}
        </div>
      )}
      <div className="text-sm text-[#172b4d] font-medium">{task.title}</div>
      {duration && (
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          {duration}
        </div>
      )}
      {description && (
        <div className="text-xs text-[#5e6c84] line-clamp-3">
          {description}
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
    </motion.div>
  );
};