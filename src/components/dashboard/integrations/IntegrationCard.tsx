import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { GitPullRequest, Slack } from "lucide-react";

type IntegrationIcon = "jira" | "slack";

interface IntegrationCardProps {
  name: string;
  description: string;
  icon: IntegrationIcon;
  isConnected: boolean;
  onToggle: () => void;
}

const icons = {
  jira: GitPullRequest,
  slack: Slack,
};

export const IntegrationCard = ({
  name,
  description,
  icon,
  isConnected,
  onToggle,
}: IntegrationCardProps) => {
  const Icon = icons[icon];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg p-2 bg-primary/10">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <Switch checked={isConnected} onCheckedChange={onToggle} />
        </div>
      </CardContent>
    </Card>
  );
};