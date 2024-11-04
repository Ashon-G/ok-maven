import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { KanbanBoard } from "./kanban/KanbanBoard";
import { CreateTaskDialog } from "./kanban/CreateTaskDialog";
import { JiraIntegrationDialog } from "./jira/JiraIntegrationDialog";
import { useSearchParams } from "react-router-dom";

export const TaskList = () => {
  const [searchParams] = useSearchParams();
  const showJiraDialog = searchParams.get("jira") === "true";
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJiraOpen, setIsJiraOpen] = useState(showJiraDialog);
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
      <KanbanBoard tasks={tasks || []} isLoading={isLoading} />
      
      {userProfile?.user_type === "founder" && (
        <>
          <CreateTaskDialog
            open={isCreateOpen}
            onOpenChange={setIsCreateOpen}
            userId={session?.user.id}
          />
          <JiraIntegrationDialog
            open={isJiraOpen}
            onOpenChange={setIsJiraOpen}
          />
        </>
      )}
    </div>
  );
};