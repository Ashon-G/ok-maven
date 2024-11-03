import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { KanbanColumn } from "./KanbanColumn";
import { Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const sensors = useSensors(useSensor(PointerSensor));

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as string;

    if (newStatus !== active.data.current?.status) {
      updateTaskStatus.mutate({ taskId, status: newStatus });
    }
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
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <ScrollArea className="w-full whitespace-nowrap rounded-md scrollbar-hide">
        <div className="flex space-x-4 p-4">
          <div className="min-w-[300px]">
            <KanbanColumn title="To Do" tasks={columns.pending} status="pending" />
          </div>
          <div className="min-w-[300px]">
            <KanbanColumn
              title="In Progress"
              tasks={columns["in-progress"]}
              status="in-progress"
            />
          </div>
          <div className="min-w-[300px]">
            <KanbanColumn
              title="Completed"
              tasks={columns.completed}
              status="completed"
            />
          </div>
        </div>
      </ScrollArea>
    </DndContext>
  );
};