import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CreateTaskForm } from "./CreateTaskForm";
import { MobileFullscreenDialog } from "./MobileFullscreenDialog";
import { useMediaQuery } from "@/hooks/use-media-query";

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | undefined;
  defaultStatus?: string;
}

export const CreateTaskDialog = ({
  open,
  onOpenChange,
  userId,
  defaultStatus = "pending",
}: CreateTaskDialogProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: availableMavens } = useQuery({
    queryKey: ["availableMavens", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("founder_maven_assignments")
        .select(`
          maven:profiles!founder_maven_assignments_maven_id_fkey(
            id,
            full_name
          )
        `)
        .eq("founder_id", userId);

      if (error) throw error;
      return data.map((assignment) => assignment.maven);
    },
    enabled: !!userId,
  });

  const { data: jiraIntegration } = useQuery({
    queryKey: ["jiraIntegration", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jira_integrations")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

  const createTask = useMutation({
    mutationFn: async (taskData: any) => {
      if (!userId) throw new Error("No user found");

      const { data, error } = await supabase
        .from("tasks")
        .insert({
          ...taskData,
          created_by: userId,
          status: defaultStatus,
        })
        .select()
        .single();

      if (error) throw error;

      if (jiraIntegration) {
        const response = await fetch("/api/jira/create-issue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskId: data.id,
            title: taskData.title,
            description: taskData.description,
            jiraConfig: jiraIntegration,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create Jira issue");
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      onOpenChange(false);
      toast({
        title: "Success",
        description: "Task created successfully",
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

  const dialogContent = (
    <CreateTaskForm
      availableMavens={availableMavens}
      jiraIntegration={jiraIntegration}
      onSubmit={createTask.mutate}
      isSubmitting={createTask.isPending}
    />
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
      <DialogContent>{dialogContent}</DialogContent>
    </Dialog>
  );
};