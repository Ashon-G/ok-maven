import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <Card className="cursor-move">
      <CardHeader className="p-4">
        <CardTitle className="text-sm font-medium">{task.title}</CardTitle>
        {task.description && (
          <CardDescription className="text-xs mt-1">
            {task.description}
          </CardDescription>
        )}
      </CardHeader>
      {task.assignee && (
        <CardContent className="p-4 pt-0">
          <div className="flex items-center text-xs text-gray-500">
            <UserCircle className="h-3 w-3 mr-1" />
            {task.assignee.full_name}
          </div>
        </CardContent>
      )}
    </Card>
  );
};