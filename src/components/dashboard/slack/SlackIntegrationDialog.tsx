import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SlackIntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SlackIntegrationDialog = ({
  open,
  onOpenChange,
}: SlackIntegrationDialogProps) => {
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const [isConnecting, setIsConnecting] = useState(false);

  // Handle OAuth code from URL
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const { data: integration, isLoading } = useQuery({
    queryKey: ["slackIntegration", session?.user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slack_integrations")
        .select("*")
        .eq("user_id", session?.user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user.id,
  });

  const connectSlack = async () => {
    const clientId = import.meta.env.VITE_SLACK_CLIENT_ID;
    if (!clientId) {
      toast({
        title: "Configuration Error",
        description: "Slack client ID is not configured.",
        variant: "destructive",
      });
      return;
    }

    // Ensure HTTPS is used by replacing http with https if present
    const origin = window.location.origin.replace(/^http:/, 'https:');
    const redirectUri = `${origin}/dashboard/tasks?slack=true`;
    const scope = "commands,chat:write,users:read";
    
    window.location.href = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
  };

  const handleOAuth = useMutation({
    mutationFn: async (code: string) => {
      setIsConnecting(true);
      const { data, error } = await supabase.functions.invoke('slack-integration', {
        body: { action: 'oauth', code },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slackIntegration"] });
      toast({
        title: "Success",
        description: "Slack workspace connected successfully!",
      });
      // Clear the URL parameters
      window.history.replaceState({}, '', window.location.pathname);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to connect Slack workspace",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsConnecting(false);
    },
  });

  // Handle OAuth code when present
  useEffect(() => {
    if (code && !integration) {
      handleOAuth.mutate(code);
    }
    if (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to Slack. Please try again.",
        variant: "destructive",
      });
      // Clear the URL parameters
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [code, error]);

  if (isLoading) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect to Slack</DialogTitle>
          <DialogDescription>
            Connect your Slack workspace to receive notifications and updates.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {integration ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Workspace Connected</span>
                <span className="text-xs text-green-500">✓</span>
              </div>
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Close
              </Button>
            </div>
          ) : (
            <Button
              onClick={connectSlack}
              disabled={isConnecting}
              className="w-full"
            >
              {isConnecting && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              {isConnecting ? "Connecting..." : "Connect to Slack"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};