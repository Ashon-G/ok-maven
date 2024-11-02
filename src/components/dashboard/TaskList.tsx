import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const TaskList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedMaven, setSelectedMaven] = useState("");
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: availableMavens } = useQuery({
    queryKey: ["availableMavens", session?.user.id],
    queryFn: async () => {
      if (userProfile?.user_type !== "founder") return [];

      const { data, error } = await supabase
        .from("founder_maven_assignments")
        .select(`
          maven:profiles!founder_maven_assignments_maven_id_fkey(
            id,
            full_name
          )
        `)
        .eq("founder_id", session?.user.id);

      if (error) throw error;
      return data.map((assignment) => assignment.maven);
    },
    enabled: !!userProfile && userProfile.user_type === "founder",
  });

  const { data: tasks, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select(`
          *,
          assignee:profiles!tasks_assigned_to_fkey(full_name),
          creator:profiles!tasks_created_by_fkey(full_name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const createTask = useMutation({
    mutationFn: async () => {
      if (!session?.user.id) throw new Error("No user found");

      const { error } = await supabase.from("tasks").insert({
        title,
        description,
        created_by: session.user.id,
        assigned_to: selectedMaven || null,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsOpen(false);
      setTitle("");
      setDescription("");
      setSelectedMaven("");
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        {userProfile?.user_type === "founder" && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Task
              </Button>
            </DialogTrigger>
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
                >
                  {createTask.isPending && (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  )}
                  Create Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <div className="grid gap-4">
        {tasks?.map((task) => (
          <div
            key={task.id}
            className="p-4 bg-white rounded-lg border shadow-sm"
          >
            <h3 className="font-semibold">{task.title}</h3>
            {task.description && (
              <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            )}
            <div className="mt-2 text-sm text-gray-500">
              {task.assignee?.full_name
                ? `Assigned to: ${task.assignee.full_name}`
                : "Unassigned"}
              <br />
              Created by: {task.creator?.full_name}
              <br />
              Status: {task.status}
            </div>
            {userProfile?.user_type === "maven" && task.status === "pending" && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() =>
                  updateTaskStatus.mutate({
                    taskId: task.id,
                    status: "completed",
                  })
                }
                disabled={updateTaskStatus.isPending}
              >
                {updateTaskStatus.isPending && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                )}
                Mark as Complete
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};