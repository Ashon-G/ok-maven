import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Task } from "@/integrations/supabase/types/task";

export const useTaskDialog = (task: Task, onOpenChange: (open: boolean) => void) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || "");
  const [editedStartDate, setEditedStartDate] = useState<string | null>(task.start_date);
  const [editedEndDate, setEditedEndDate] = useState<string | null>(task.end_date);
  const [showRating, setShowRating] = useState(false);

  const updateTask = useMutation({
    mutationFn: async ({ 
      title, 
      description, 
      status,
      start_date,
      end_date,
    }: { 
      title?: string; 
      description?: string;
      status?: string;
      start_date?: string | null;
      end_date?: string | null;
    }) => {
      const updateData: any = {};
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (status !== undefined) updateData.status = status;
      if (start_date !== undefined) updateData.start_date = start_date;
      if (end_date !== undefined) updateData.end_date = end_date;

      const { error } = await supabase
        .from("tasks")
        .update(updateData)
        .eq("id", task.id);

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
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "You don't have permission to update this task",
        variant: "destructive",
      });
    },
  });

  const deleteTask = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("tasks")
        .delete()
        .eq("id", task.id);

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
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: "You don't have permission to delete this task",
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = (newStatus: string) => {
    if (newStatus === task.status) return;
    updateTask.mutate({ status: newStatus });
    if (newStatus === "completed" && task.assignee?.id) {
      setShowRating(true);
    }
  };

  const handleSave = () => {
    if (!editedTitle.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }
    updateTask.mutate({ 
      title: editedTitle, 
      description: editedDescription,
      start_date: editedStartDate,
      end_date: editedEndDate,
    });
  };

  return {
    isEditing,
    setIsEditing,
    editedTitle,
    setEditedTitle,
    editedDescription,
    setEditedDescription,
    editedStartDate,
    setEditedStartDate,
    editedEndDate,
    setEditedEndDate,
    showRating,
    setShowRating,
    updateTask,
    deleteTask,
    handleStatusChange,
    handleSave,
  };
};