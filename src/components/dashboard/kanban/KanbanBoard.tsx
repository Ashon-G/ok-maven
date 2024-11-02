import { DragDropContext, Droppable, Draggable } from "@dnd-kit/core";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { KanbanColumn } from "./KanbanColumn";
import { Loader2 } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  assignee?: { full_name: string } | null;
}

interface KanbanBoardProps {
  tasks: Task[];
  isLoading: boolean;
}

export const KanbanBoard = ({ tasks, isLoading }: KanbanBoardProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateTaskStatus = useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: string }) => {
      const { error } = await supabase
        .from("tasks")
        .update({ status })
        .eq("id", taskId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "Success",
        description: "Task status updated",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    updateTaskStatus.mutate({ taskId, status: newStatus });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const columns = {
    pending: tasks.filter((task) => task.status === "pending"),
    "in-progress": tasks.filter((task) => task.status === "in-progress"),
    completed: tasks.filter((task) => task.status === "completed"),
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KanbanColumn title="To Do" tasks={columns.pending} status="pending" />
        <KanbanColumn
          title="In Progress"
          tasks={columns["in-progress"]}
          status="in-progress"
        />
        <KanbanColumn
          title="Completed"
          tasks={columns.completed}
          status="completed"
        />
      </div>
    </DragDropContext>
  );
};