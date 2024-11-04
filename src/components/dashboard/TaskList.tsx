import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { KanbanBoard } from "./kanban/KanbanBoard";
import { CreateTaskDialog } from "./kanban/CreateTaskDialog";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { JiraIntegrationDialog } from "./jira/JiraIntegrationDialog";

export const TaskList = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJiraOpen, setIsJiraOpen] = useState(false);
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

  const { data: jiraIntegration } = useQuery({
    queryKey: ["jiraIntegration", session?.user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jira_integrations")
        .select("*")
        .eq("user_id", session?.user.id)
        .maybeSingle(); // Changed from single() to maybeSingle()

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user.id,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <div className="flex items-center gap-2">
          {userProfile?.user_type === "founder" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsJiraOpen(true)}
              >
                <Settings className="h-4 w-4 mr-2" />
                {jiraIntegration ? "Update Jira Settings" : "Connect to Jira"}
              </Button>
              <Button
                onClick={() => setIsCreateOpen(true)}
                size="sm"
              >
                Create Task
              </Button>
            </>
          )}
        </div>
      </div>

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