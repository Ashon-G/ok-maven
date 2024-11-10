export type SlackNotificationType = "all" | "mentions" | "none";

export interface SlackIntegration {
  id: string;
  user_id: string;
  workspace_id: string;
  access_token: string;
  bot_user_id: string;
  channel_id: string;
  notification_preferences?: SlackNotificationType;
  created_at: string;
}