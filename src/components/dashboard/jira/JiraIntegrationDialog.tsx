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
import { useAuth } from "@/components/auth/AuthProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { JiraFormField } from "./JiraFormField";
import { JiraHostingTypeField } from "./JiraHostingTypeField";

interface JiraIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JiraIntegrationDialog = ({
  open,
  onOpenChange,
}: JiraIntegrationDialogProps) => {
  const [host, setHost] = useState("");
  const [projectKey, setProjectKey] = useState("");
  const [hostingType, setHostingType] = useState<"cloud" | "server">("cloud");
  const [apiToken, setApiToken] = useState("");
  const [email, setEmail] = useState("");
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: existingIntegration } = useQuery({
    queryKey: ["jiraIntegration", session?.user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jira_integrations")
        .select("*")
        .eq("user_id", session?.user.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") throw error;
      return data;
    },
    enabled: !!session?.user.id,
  });

  const createIntegration = useMutation({
    mutationFn: async () => {
      if (!session?.user.id) throw new Error("No user found");

      const { error } = await supabase.from("jira_integrations").insert({
        user_id: session.user.id,
        jira_host: host,
        jira_project_key: projectKey,
        hosting_type: hostingType,
        api_token: apiToken,
        email: email,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jiraIntegration"] });
      onOpenChange(false);
      toast({
        title: "Success",
        description: "Jira integration configured successfully",
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
      <DialogContent className="bg-background border-border">
        <DialogHeader>
          <DialogTitle>Configure Jira Integration</DialogTitle>
        </DialogHeader>
        <TooltipProvider>
          <div className="space-y-4">
            <JiraFormField
              label="Jira Host"
              tooltip={
                <>
                  For Cloud: https://your-domain.atlassian.net<br />
                  For Server: Your Jira server URL<br />
                  <a 
                    href="https://support.atlassian.com/jira-cloud-administration/docs/find-your-cloud-site-url/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    How to find your site URL
                  </a>
                </>
              }
              value={host}
              onChange={setHost}
              placeholder="https://your-domain.atlassian.net"
            />
            <JiraFormField
              label="Project Key"
              tooltip={
                <>
                  The project key is the prefix used in your Jira issue keys (e.g., 'PROJ' in PROJ-123)<br />
                  <a 
                    href="https://support.atlassian.com/jira-cloud-administration/docs/what-is-a-project-key/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    How to find your project key
                  </a>
                </>
              }
              value={projectKey}
              onChange={setProjectKey}
              placeholder="PROJECT"
            />
            <JiraHostingTypeField
              value={hostingType}
              onChange={(v) => setHostingType(v)}
            />
            <JiraFormField
              label="API Token"
              tooltip={
                <>
                  Generate an API token from your Atlassian account settings<br />
                  <a 
                    href="https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    How to create an API token
                  </a>
                </>
              }
              value={apiToken}
              onChange={setApiToken}
              placeholder="Your Jira API token"
              type="password"
            />
            <JiraFormField
              label="Email"
              tooltip={
                <>
                  The email address associated with your Atlassian account<br />
                  <a 
                    href="https://id.atlassian.com/manage-profile" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View your Atlassian profile
                  </a>
                </>
              }
              value={email}
              onChange={setEmail}
              placeholder="Your Jira account email"
              type="email"
            />
            <Button
              onClick={() => createIntegration.mutate()}
              disabled={!host || !projectKey || !apiToken || !email || createIntegration.isPending}
              className="w-full"
            >
              {createIntegration.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {existingIntegration ? "Update Integration" : "Configure Integration"}
            </Button>
          </div>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
};
