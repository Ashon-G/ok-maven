import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { KanbanBoard } from "./kanban/KanbanBoard";
import { CreateTaskDialog } from "./kanban/CreateTaskDialog";
import { JiraIntegrationDialog } from "./jira/JiraIntegrationDialog";
import { GenerateTasksDialog } from "./kanban/GenerateTasksDialog";
import { SlackIntegrationDialog } from "./slack/SlackIntegrationDialog";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export const TaskList = () => {
  const [searchParams] = useSearchParams();
  const showJiraDialog = searchParams.get("jira") === "true";
  const showSlackDialog = searchParams.get("slack") === "true";
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isJiraOpen, setIsJiraOpen] = useState(showJiraDialog);
  const [isSlackOpen, setIsSlackOpen] = useState(showSlackDialog);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
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
          assignee:profiles!tasks_assigned_to_fkey(id, full_name),
          creator:profiles!tasks_created_by_fkey(full_name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="space-y-4">
      {userProfile?.user_type === "founder" && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsSlackOpen(true)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Connect Slack
          </Button>
        </div>
      )}

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
          <SlackIntegrationDialog
            open={isSlackOpen}
            onOpenChange={setIsSlackOpen}
          />
          <GenerateTasksDialog
            open={isGenerateOpen}
            onOpenChange={setIsGenerateOpen}
            userId={session?.user.id}
          />
        </>
      )}
    </div>
  );
};