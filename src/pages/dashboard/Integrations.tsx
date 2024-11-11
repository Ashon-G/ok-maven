import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/auth/AuthProvider";
import { IntegrationCard } from "@/components/dashboard/integrations/IntegrationCard";
import { JiraIntegrationDialog } from "@/components/dashboard/jira/JiraIntegrationDialog";
import { SlackIntegrationDialog } from "@/components/dashboard/slack/SlackIntegrationDialog";
import { useState } from "react";

const Integrations = () => {
  const { session } = useAuth();
  const [isJiraOpen, setIsJiraOpen] = useState(false);
  const [isSlackOpen, setIsSlackOpen] = useState(false);

  const { data: integrations } = useQuery({
    queryKey: ["integrations", session?.user.id],
    queryFn: async () => {
      const [jiraResponse, slackResponse] = await Promise.all([
        supabase
          .from("jira_integrations")
          .select("*")
          .eq("user_id", session?.user.id)
          .maybeSingle(),
        supabase
          .from("slack_integrations")
          .select("*")
          .eq("user_id", session?.user.id)
          .maybeSingle(),
      ]);

      return {
        jira: jiraResponse.data,
        slack: slackResponse.data,
      };
    },
    enabled: !!session?.user.id,
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Integrations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <IntegrationCard
          name="Jira"
          description="Connect your Jira workspace to sync tasks and issues."
          icon="jira"
          isConnected={!!integrations?.jira}
          onToggle={() => setIsJiraOpen(true)}
        />
        <IntegrationCard
          name="Slack"
          description="Connect Slack to receive notifications and updates."
          icon="slack"
          isConnected={!!integrations?.slack}
          onToggle={() => setIsSlackOpen(true)}
        />
      </div>

      <JiraIntegrationDialog
        open={isJiraOpen}
        onOpenChange={setIsJiraOpen}
      />
      <SlackIntegrationDialog
        open={isSlackOpen}
        onOpenChange={setIsSlackOpen}
      />
    </div>
  );
};

export default Integrations;