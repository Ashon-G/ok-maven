import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tables, Enums } from "@/integrations/supabase/types";

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
  const [notificationPreference, setNotificationPreference] = useState<Enums<'slack_notification_type'>>("mentions");

  const { data: integration, isError } = useQuery({
    queryKey: ["slackIntegration", session?.user.id],
    queryFn: async () => {
      if (!session?.user.id) return null;

      const { data, error } = await supabase
        .from("slack_integrations")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (error && error.code !== "PGRST116") {
        throw error;
      }
      return data as Tables<"slack_integrations"> | null;
    },
    enabled: !!session?.user.id,
  });

  const connectSlack = async () => {
    const clientId = import.meta.env.VITE_SLACK_CLIENT_ID;
    const redirectUri = `${window.location.origin}/dashboard/tasks?slack=true`;
    const scope = "chat:write,commands,incoming-webhook";
    
    window.location.href = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
  };

  const updateNotifications = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("slack_integrations")
        .update({ notification_preferences: notificationPreference })
        .eq("user_id", session?.user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["slackIntegration"] });
      toast({
        title: "Success",
        description: "Notification preferences updated",
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

  if (isError) {
    toast({
      title: "Error",
      description: "Failed to fetch Slack integration details",
      variant: "destructive",
    });
    return null;
  }

  const handleValueChange = (value: Enums<'slack_notification_type'>) => {
    setNotificationPreference(value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Slack Integration</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {integration ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Workspace Connected</span>
                <span className="text-xs text-green-500">✓</span>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notification Preferences</label>
                <Select
                  value={notificationPreference}
                  onValueChange={handleValueChange}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Updates</SelectItem>
                    <SelectItem value="mentions">Only Mentions</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => updateNotifications.mutate()}
                disabled={updateNotifications.isPending}
              >
                Update Preferences
              </Button>
            </div>
          ) : (
            <Button onClick={connectSlack} className="w-full">
              Connect to Slack
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};