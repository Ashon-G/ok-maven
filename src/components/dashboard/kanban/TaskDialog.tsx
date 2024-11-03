import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { useAuth } from "@/components/auth/AuthProvider";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { TaskDialogHeader } from "./TaskDialogHeader";
import { TaskDialogContent } from "./TaskDialogContent";
import { TaskDialogFooter } from "./TaskDialogFooter";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
  assignee?: { full_name: string } | null;
  created_by: string;
}

interface TaskDialogProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TaskDialog = ({ task, open, onOpenChange }: TaskDialogProps) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task?.title || "");
  const [editedDescription, setEditedDescription] = useState(task?.description || "");

  const updateTask = useMutation({
    mutationFn: async ({ 
      title, 
      description, 
      status 
    }: { 
      title: string; 
      description: string;
      status?: string;
    }) => {
      const { error } = await supabase
        .from("tasks")
        .update({ title, description, ...(status && { status }) })
        .eq("id", task?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Task updated successfully",
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
    mutationFn: async () => {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", task?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onOpenChange(false);
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

  if (!task) return null;

  const canEdit = session?.user.id === task.created_by;

  const handleSave = () => {
    if (!editedTitle.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }
    updateTask.mutate({ title: editedTitle, description: editedDescription });
  };

  const handleStatusChange = (newStatus: string) => {
    updateTask.mutate({ 
      title: task.title, 
      description: task.description || "", 
      status: newStatus 
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
            "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
            "sm:rounded-lg"
          )}
        >
          <div className="max-h-[80vh] overflow-y-auto">
            <TaskDialogHeader
              title={task.title}
              isEditing={isEditing}
              editedTitle={editedTitle}
              setEditedTitle={setEditedTitle}
            />

            <TaskDialogContent
              description={task.description}
              isEditing={isEditing}
              editedDescription={editedDescription}
              setEditedDescription={setEditedDescription}
              assignee={task.assignee}
              dueDate={task.due_date}
              status={task.status}
              onStatusChange={handleStatusChange}
            />

            <TaskDialogFooter
              canEdit={canEdit}
              isEditing={isEditing}
              onEdit={() => {
                setEditedTitle(task.title);
                setEditedDescription(task.description || "");
                setIsEditing(true);
              }}
              onCancel={() => {
                setIsEditing(false);
                setEditedTitle(task.title);
                setEditedDescription(task.description || "");
              }}
              onSave={handleSave}
              onDelete={() => deleteTask.mutate()}
            />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </Dialog>
  );
};