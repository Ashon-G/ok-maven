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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/components/auth/AuthProvider";

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
        .single();

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Configure Jira Integration</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Jira Host</label>
            <Input
              value={host}
              onChange={(e) => setHost(e.target.value)}
              placeholder="https://your-domain.atlassian.net"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Project Key</label>
            <Input
              value={projectKey}
              onChange={(e) => setProjectKey(e.target.value)}
              placeholder="PROJECT"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Hosting Type</label>
            <Select value={hostingType} onValueChange={(v: "cloud" | "server") => setHostingType(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cloud">Cloud</SelectItem>
                <SelectItem value="server">Server</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">API Token</label>
            <Input
              type="password"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              placeholder="Your Jira API token"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Jira account email"
            />
          </div>
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
      </DialogContent>
    </Dialog>
  );
};