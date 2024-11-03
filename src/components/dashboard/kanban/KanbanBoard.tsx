import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { FiPlus, FiTrash } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { motion } from "framer-motion";
import { TaskDialog } from "./TaskDialog";

type ColumnType = "pending" | "in-progress" | "completed";

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
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [active, setActive] = useState(false);
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
        description: "Task status updated successfully",
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

  const deleteTask = useMutation({
    mutationFn: async (taskId: string) => {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", taskId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      toast({
        title: "Success",
        description: "Task deleted successfully",
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

  const columns = [
    { id: "pending", title: "Backlog", headingColor: "text-neutral-500" },
    { id: "in-progress", title: "In Progress", headingColor: "text-blue-200" },
    { id: "completed", title: "Complete", headingColor: "text-emerald-200" },
  ];

  const handleDragEnd = (e: React.DragEvent, columnId: string) => {
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) {
      updateTaskStatus.mutate({ taskId, status: columnId });
    }
    setActive(false);
  };

  return (
    <div className="h-[calc(100vh-12rem)] w-full bg-neutral-900 text-neutral-50">
      <div className="flex h-full w-full gap-3 overflow-scroll p-12">
        {columns.map((column) => (
          <div key={column.id} className="w-56 shrink-0">
            <div className="mb-3 flex items-center justify-between">
              <h3 className={`font-medium ${column.headingColor}`}>
                {column.title}
              </h3>
              <span className="rounded text-sm text-neutral-400">
                {tasks.filter((t) => t.status === column.id).length}
              </span>
            </div>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setActive(true);
              }}
              onDragLeave={() => setActive(false)}
              onDrop={(e) => handleDragEnd(e, column.id)}
              className={`h-full w-full transition-colors ${
                active ? "bg-neutral-800/50" : "bg-neutral-800/0"
              }`}
            >
              {tasks
                .filter((task) => task.status === column.id)
                .map((task) => (
                  <motion.div
                    key={task.id}
                    layout
                    layoutId={task.id}
                    draggable="true"
                    onDragStart={(e) => {
                      e.dataTransfer.setData("taskId", task.id);
                    }}
                    onClick={() => setSelectedTask(task)}
                    className="mb-3 cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
                  >
                    <p className="text-sm text-neutral-100">{task.title}</p>
                    {task.assignee && (
                      <p className="mt-2 text-xs text-neutral-400">
                        {task.assignee.full_name}
                      </p>
                    )}
                  </motion.div>
                ))}
            </div>
          </div>
        ))}

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setActive(true);
          }}
          onDragLeave={() => setActive(false)}
          onDrop={(e) => {
            const taskId = e.dataTransfer.getData("taskId");
            if (taskId) {
              deleteTask.mutate(taskId);
            }
            setActive(false);
          }}
          className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
            active
              ? "border-red-800 bg-red-800/20 text-red-500"
              : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
          }`}
        >
          {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
        </div>
      </div>

      <TaskDialog
        task={selectedTask}
        open={!!selectedTask}
        onOpenChange={() => setSelectedTask(null)}
      />
    </div>
  );
};