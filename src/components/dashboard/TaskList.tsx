import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { KanbanBoard } from "./kanban/KanbanBoard";
import { CreateTaskDialog } from "./kanban/CreateTaskDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const TaskList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useAuth();

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tasks</h2>
        {userProfile?.user_type === "founder" && (
          <Button onClick={() => setIsOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Task
          </Button>
        )}
      </div>

      <KanbanBoard tasks={tasks || []} isLoading={isLoading} />
      
      {userProfile?.user_type === "founder" && (
        <CreateTaskDialog
          open={isOpen}
          onOpenChange={setIsOpen}
          userId={session?.user.id}
        />
      )}
    </div>
  );
};