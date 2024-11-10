import { SlackIntegration, SlackNotificationType } from './slack';
import { Profile } from './profile';
import { Project } from './project';
import { Task } from './task';
import { Message } from './message';
import { Subscription } from './subscription';

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile>;
        Update: Partial<Profile>;
      };
      slack_integrations: {
        Row: SlackIntegration;
        Insert: Omit<SlackIntegration, 'id' | 'created_at'>;
        Update: Partial<Omit<SlackIntegration, 'id' | 'created_at'>>;
      };
      tasks: {
        Row: Task;
        Insert: Omit<Task, 'id' | 'created_at'>;
        Update: Partial<Omit<Task, 'id' | 'created_at'>>;
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, 'id' | 'created_at'>;
        Update: Partial<Omit<Message, 'id' | 'created_at'>>;
      };
      subscriptions: {
        Row: Subscription;
        Insert: Omit<Subscription, 'id' | 'created_at'>;
        Update: Partial<Omit<Subscription, 'id' | 'created_at'>>;
      };
    };
    Enums: {
      slack_notification_type: SlackNotificationType;
    };
  };
};

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];