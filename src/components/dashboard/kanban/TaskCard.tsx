import { UserCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface Task {
  title: string;
  description: string | null;
  assignee?: { full_name: string } | null;
  start_date?: string | null;
  end_date?: string | null;
  created_by: string;
}

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer p-2.5 group transition-all hover:shadow-md"
    >
      <div className="text-sm text-[#172b4d] font-medium">{task.title}</div>
      {task.description && (
        <div className="text-xs text-[#5e6c84] mt-2 line-clamp-2">
          {task.description}
        </div>
      )}
      <div className="flex flex-col gap-2 mt-2">
        {task.assignee && (
          <div className="flex items-center">
            <div className="flex items-center gap-1 px-2 py-1 rounded-sm bg-[#ebecf0] text-xs text-[#5e6c84]">
              <UserCircle className="h-3 w-3" />
              <span>{task.assignee.full_name}</span>
            </div>
          </div>
        )}
        {(task.start_date || task.end_date) && (
          <div className="flex items-center gap-2">
            {task.start_date && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-sm bg-[#ebecf0] text-xs text-[#5e6c84]">
                <Calendar className="h-3 w-3" />
                <span>Start: {format(new Date(task.start_date), "MMM d")}</span>
              </div>
            )}
            {task.end_date && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-sm bg-[#ebecf0] text-xs text-[#5e6c84]">
                <Calendar className="h-3 w-3" />
                <span>Due: {format(new Date(task.end_date), "MMM d")}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};