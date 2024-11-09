import { UserCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/AuthProvider";

interface Task {
  title: string;
  description: string | null;
  assignee?: { full_name: string } | null;
  due_date?: string | null;
  created_by: string;
}

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { session } = useAuth();
  const isFounder = session?.user?.user_metadata?.user_type === "founder";
  const isOwner = session?.user?.id === task.created_by;

  // Parse the description to extract milestone information
  const sections = task.description?.split('\n\n') || [];
  const milestoneTitle = sections[0] || '';
  const duration = sections[1] || '';
  const objectives = sections[2]?.split('\n').filter(line => line.startsWith('- ')) || [];
  const tasks = sections[3]?.split('\n').filter(line => line.startsWith('- ')) || [];

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer p-4 group transition-all hover:shadow-md space-y-3"
    >
      {/* Milestone Title */}
      {milestoneTitle && (
        <div className="text-sm font-semibold text-blue-600">
          {milestoneTitle}
        </div>
      )}

      {/* Main Title */}
      <div className="text-base font-medium text-gray-900">
        {task.title}
      </div>

      {/* Duration Badge */}
      {duration && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span className="text-xs">{duration}</span>
          </Badge>
        </div>
      )}

      {/* Objectives */}
      {objectives.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-600">Project Objectives:</p>
          <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1">
            {objectives.map((objective, index) => (
              <li key={index}>{objective.replace('- ', '')}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Tasks */}
      {tasks.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-600">Tasks:</p>
          <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1">
            {tasks.map((task, index) => (
              <li key={index}>{task.replace('- ', '')}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer Info */}
      <div className="flex items-center justify-between mt-2">
        {task.assignee && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-sm bg-gray-100 text-xs text-gray-600">
            <UserCircle className="h-3 w-3" />
            <span>{task.assignee.full_name}</span>
          </div>
        )}
        {isFounder && isOwner && (
          <Badge variant="outline" className="text-xs">
            Owner
          </Badge>
        )}
      </div>
    </motion.div>
  );
};