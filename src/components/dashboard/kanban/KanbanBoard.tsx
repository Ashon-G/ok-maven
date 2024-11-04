import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor, MouseSensor, TouchSensor } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { KanbanColumn } from "./KanbanColumn";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { TaskDialog } from "./TaskDialog";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
  assignee?: { full_name: string } | null;
  created_by: string;
}

interface KanbanBoardProps {
  tasks: Task[];
  isLoading: boolean;
}

export const KanbanBoard = ({ tasks, isLoading }: KanbanBoardProps) => {
  const queryClient = useQueryClient();
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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
    },
  });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as string;
    const task = tasks.find(t => t.id === taskId);
    
    if (task && task.status !== newStatus) {
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

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <DndContext 
      sensors={sensors} 
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-[calc(100vh-12rem)] bg-[#f9fafc] p-6">
        <div className="flex gap-4 overflow-x-auto pb-4">
          <KanbanColumn 
            title="To Do" 
            tasks={columns.pending} 
            status="pending"
            onTaskClick={handleTaskClick}
          />
          <KanbanColumn
            title="In Progress"
            tasks={columns["in-progress"]}
            status="in-progress"
            onTaskClick={handleTaskClick}
          />
          <KanbanColumn
            title="Completed"
            tasks={columns.completed}
            status="completed"
            onTaskClick={handleTaskClick}
          />
        </div>
      </div>
      <TaskDialog
        task={selectedTask}
        open={!!selectedTask}
        onOpenChange={() => setSelectedTask(null)}
      />
    </DndContext>
  );
};