import { Dialog } from "@/components/ui/dialog";
import { useAuth } from "@/components/auth/AuthProvider";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TaskDialogHeader } from "./TaskDialogHeader";
import { TaskDialogContent } from "./TaskDialogContent";
import { TaskDialogFooter } from "./TaskDialogFooter";
import { MobileFullscreenDialog } from "./MobileFullscreenDialog";
import { useMediaQuery } from "@/hooks/use-media-query";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
  start_date: string | null;
  end_date: string | null;
  assignee?: { full_name: string } | null;
  created_by: string;
}

interface TaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TaskDialog = ({ task, open, onOpenChange }: TaskDialogProps) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || "");
  const [editedStartDate, setEditedStartDate] = useState<string | null>(task.start_date);
  const [editedEndDate, setEditedEndDate] = useState<string | null>(task.end_date);
  const isMobile = useMediaQuery("(max-width: 768px)");

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

      const { data, error } = await supabase
        .from("tasks")
        .update(updateData)
        .eq("id", task.id)
        .select();

      if (error) throw error;
      return data;
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
    updateTask.mutate({ 
      title: editedTitle, 
      description: editedDescription,
      start_date: editedStartDate,
      end_date: editedEndDate,
    });
  };

  const handleStatusChange = (newStatus: string) => {
    if (newStatus === task.status) return;
    updateTask.mutate({ status: newStatus });
  };

  const dialogContent = (
    <div className="flex flex-col h-full">
      <TaskDialogHeader
        title={task.title}
        isEditing={isEditing}
        editedTitle={editedTitle}
        setEditedTitle={setEditedTitle}
      />
      <div className="flex-1 overflow-y-auto">
        <TaskDialogContent
          description={task.description}
          isEditing={isEditing}
          editedDescription={editedDescription}
          setEditedDescription={setEditedDescription}
          assignee={task.assignee}
          dueDate={task.due_date}
          status={task.status}
          onStatusChange={handleStatusChange}
          startDate={task.start_date}
          endDate={task.end_date}
          onStartDateChange={setEditedStartDate}
          onEndDateChange={setEditedEndDate}
        />
      </div>
      <TaskDialogFooter
        canEdit={canEdit}
        isEditing={isEditing}
        onEdit={() => {
          setEditedTitle(task.title);
          setEditedDescription(task.description || "");
          setEditedStartDate(task.start_date);
          setEditedEndDate(task.end_date);
          setIsEditing(true);
        }}
        onCancel={() => {
          setIsEditing(false);
          setEditedTitle(task.title);
          setEditedDescription(task.description || "");
          setEditedStartDate(task.start_date);
          setEditedEndDate(task.end_date);
        }}
        onSave={handleSave}
        onDelete={() => deleteTask.mutate()}
      />
    </div>
  );

  if (isMobile) {
    return (
      <MobileFullscreenDialog open={open} onClose={() => onOpenChange(false)}>
        {dialogContent}
      </MobileFullscreenDialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="max-h-[80vh] overflow-y-auto p-6">
        {dialogContent}
      </div>
    </Dialog>
  );
};