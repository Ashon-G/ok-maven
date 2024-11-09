import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMaven, setSelectedMaven] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
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
    mutationFn: async () => {
      if (!userId) throw new Error("No user found");

      const { data, error } = await supabase.from("tasks").insert({
        title,
        description,
        created_by: userId,
        assigned_to: selectedMaven || null,
        status: defaultStatus,
        start_date: startDate?.toISOString() || null,
        end_date: endDate?.toISOString() || null,
      }).select().single();

      if (error) throw error;

      // If Jira integration exists, create Jira issue
      if (jiraIntegration) {
        const response = await fetch("/api/jira/create-issue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            taskId: data.id,
            title,
            description,
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
      setTitle("");
      setDescription("");
      setSelectedMaven("");
      setStartDate(undefined);
      setEndDate(undefined);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Task description"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Start Date</label>
              <Input
                type="date"
                onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : undefined)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">End Date</label>
              <Input
                type="date"
                onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : undefined)}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Assign to Maven</label>
            <Select value={selectedMaven} onValueChange={setSelectedMaven}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Maven" />
              </SelectTrigger>
              <SelectContent>
                {availableMavens?.map((maven) => (
                  <SelectItem key={maven.id} value={maven.id}>
                    {maven.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => createTask.mutate()}
            disabled={!title || createTask.isPending}
            className="w-full"
          >
            {createTask.isPending && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            )}
            Create Task {jiraIntegration && "& Jira Issue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};