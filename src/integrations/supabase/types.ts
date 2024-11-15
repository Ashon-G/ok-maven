export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      credit_applications: {
        Row: {
          annual_revenue: string
          business_address: string
          city: string
          company_name: string
          contact_email: string
          contact_first_name: string
          contact_last_name: string
          contact_phone: string
          contact_title: string
          created_at: string
          id: string
          state: string
          status: Database["public"]["Enums"]["application_status_enum"]
          tax_id: string
          terms_accepted: boolean
          trade_references: Json
          updated_at: string
          user_id: string | null
          year_established: string
          zip_code: string
        }
        Insert: {
          annual_revenue: string
          business_address: string
          city: string
          company_name: string
          contact_email: string
          contact_first_name: string
          contact_last_name: string
          contact_phone: string
          contact_title: string
          created_at?: string
          id?: string
          state: string
          status?: Database["public"]["Enums"]["application_status_enum"]
          tax_id: string
          terms_accepted?: boolean
          trade_references?: Json
          updated_at?: string
          user_id?: string | null
          year_established: string
          zip_code: string
        }
        Update: {
          annual_revenue?: string
          business_address?: string
          city?: string
          company_name?: string
          contact_email?: string
          contact_first_name?: string
          contact_last_name?: string
          contact_phone?: string
          contact_title?: string
          created_at?: string
          id?: string
          state?: string
          status?: Database["public"]["Enums"]["application_status_enum"]
          tax_id?: string
          terms_accepted?: boolean
          trade_references?: Json
          updated_at?: string
          user_id?: string | null
          year_established?: string
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "credit_applications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      founder_maven_assignments: {
        Row: {
          assigned_by: string
          created_at: string
          founder_id: string
          id: string
          maven_id: string
        }
        Insert: {
          assigned_by: string
          created_at?: string
          founder_id: string
          id?: string
          maven_id: string
        }
        Update: {
          assigned_by?: string
          created_at?: string
          founder_id?: string
          id?: string
          maven_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "founder_maven_assignments_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "founder_maven_assignments_founder_id_fkey"
            columns: ["founder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "founder_maven_assignments_maven_id_fkey"
            columns: ["maven_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      founder_projects: {
        Row: {
          budget: string | null
          created_at: string
          description: string
          founder_id: string
          goals: string[] | null
          id: string
          status: Database["public"]["Enums"]["project_status_enum"]
          target_audience: string | null
          timeline: string | null
          title: string
        }
        Insert: {
          budget?: string | null
          created_at?: string
          description: string
          founder_id: string
          goals?: string[] | null
          id?: string
          status?: Database["public"]["Enums"]["project_status_enum"]
          target_audience?: string | null
          timeline?: string | null
          title?: string
        }
        Update: {
          budget?: string | null
          created_at?: string
          description?: string
          founder_id?: string
          goals?: string[] | null
          id?: string
          status?: Database["public"]["Enums"]["project_status_enum"]
          target_audience?: string | null
          timeline?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "founder_projects_founder_id_fkey"
            columns: ["founder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jira_integrations: {
        Row: {
          api_token: string
          created_at: string
          email: string
          hosting_type: Database["public"]["Enums"]["jira_hosting_type"]
          id: string
          jira_host: string
          jira_project_key: string
          user_id: string
        }
        Insert: {
          api_token: string
          created_at?: string
          email: string
          hosting_type?: Database["public"]["Enums"]["jira_hosting_type"]
          id?: string
          jira_host: string
          jira_project_key: string
          user_id: string
        }
        Update: {
          api_token?: string
          created_at?: string
          email?: string
          hosting_type?: Database["public"]["Enums"]["jira_hosting_type"]
          id?: string
          jira_host?: string
          jira_project_key?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "jira_integrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      maven_availability: {
        Row: {
          end_date: string
          id: string
          location_preference: string
          maven_id: string
          role_type: string
          start_date: string
        }
        Insert: {
          end_date: string
          id?: string
          location_preference: string
          maven_id: string
          role_type: string
          start_date: string
        }
        Update: {
          end_date?: string
          id?: string
          location_preference?: string
          maven_id?: string
          role_type?: string
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "maven_availability_maven_id_fkey"
            columns: ["maven_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      maven_documents: {
        Row: {
          document_type: string
          document_url: string
          id: string
          maven_id: string
        }
        Insert: {
          document_type: string
          document_url: string
          id?: string
          maven_id: string
        }
        Update: {
          document_type?: string
          document_url?: string
          id?: string
          maven_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "maven_documents_maven_id_fkey"
            columns: ["maven_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      maven_education: {
        Row: {
          degree_program: string
          gpa: number | null
          graduation_date: string
          id: string
          major: string
          maven_id: string
          minor: string | null
          university_id: string
          year_of_study: string
        }
        Insert: {
          degree_program: string
          gpa?: number | null
          graduation_date: string
          id?: string
          major: string
          maven_id: string
          minor?: string | null
          university_id: string
          year_of_study: string
        }
        Update: {
          degree_program?: string
          gpa?: number | null
          graduation_date?: string
          id?: string
          major?: string
          maven_id?: string
          minor?: string | null
          university_id?: string
          year_of_study?: string
        }
        Relationships: [
          {
            foreignKeyName: "maven_education_maven_id_fkey"
            columns: ["maven_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maven_education_university_id_fkey"
            columns: ["university_id"]
            isOneToOne: false
            referencedRelation: "universities"
            referencedColumns: ["id"]
          },
        ]
      }
      maven_experience: {
        Row: {
          achievements: string | null
          company_name: string
          end_date: string | null
          experience_type: string
          id: string
          job_title: string
          maven_id: string
          responsibilities: string | null
          start_date: string
        }
        Insert: {
          achievements?: string | null
          company_name: string
          end_date?: string | null
          experience_type: string
          id?: string
          job_title: string
          maven_id: string
          responsibilities?: string | null
          start_date: string
        }
        Update: {
          achievements?: string | null
          company_name?: string
          end_date?: string | null
          experience_type?: string
          id?: string
          job_title?: string
          maven_id?: string
          responsibilities?: string | null
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "maven_experience_maven_id_fkey"
            columns: ["maven_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      maven_skills: {
        Row: {
          id: string
          maven_id: string
          skill_name: string
          skill_type: string
        }
        Insert: {
          id?: string
          maven_id: string
          skill_name: string
          skill_type: string
        }
        Update: {
          id?: string
          maven_id?: string
          skill_name?: string
          skill_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "maven_skills_maven_id_fkey"
            columns: ["maven_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          receiver_id?: string
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          linkedin_profile: string | null
          location: string | null
          maven_skillset:
            | Database["public"]["Enums"]["maven_skillset_enum"]
            | null
          phone_number: string | null
          settings: Json | null
          user_type: Database["public"]["Enums"]["user_type_enum"] | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          linkedin_profile?: string | null
          location?: string | null
          maven_skillset?:
            | Database["public"]["Enums"]["maven_skillset_enum"]
            | null
          phone_number?: string | null
          settings?: Json | null
          user_type?: Database["public"]["Enums"]["user_type_enum"] | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          linkedin_profile?: string | null
          location?: string | null
          maven_skillset?:
            | Database["public"]["Enums"]["maven_skillset_enum"]
            | null
          phone_number?: string | null
          settings?: Json | null
          user_type?: Database["public"]["Enums"]["user_type_enum"] | null
          username?: string | null
        }
        Relationships: []
      }
      slack_integrations: {
        Row: {
          access_token: string
          bot_user_id: string
          channel_id: string
          created_at: string
          id: string
          notification_preferences:
            | Database["public"]["Enums"]["slack_notification_type"]
            | null
          user_id: string
          webhook_url: string | null
          workspace_id: string
        }
        Insert: {
          access_token: string
          bot_user_id: string
          channel_id: string
          created_at?: string
          id?: string
          notification_preferences?:
            | Database["public"]["Enums"]["slack_notification_type"]
            | null
          user_id: string
          webhook_url?: string | null
          workspace_id: string
        }
        Update: {
          access_token?: string
          bot_user_id?: string
          channel_id?: string
          created_at?: string
          id?: string
          notification_preferences?:
            | Database["public"]["Enums"]["slack_notification_type"]
            | null
          user_id?: string
          webhook_url?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "slack_integrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          price_id: string
          quantity: number
          status: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          user_id: string
        }
        Insert: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          price_id: string
          quantity?: number
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          user_id: string
        }
        Update: {
          cancel_at_period_end?: boolean
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          price_id?: string
          quantity?: number
          status?: Database["public"]["Enums"]["subscription_status"]
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      task_ratings: {
        Row: {
          created_at: string
          feedback: string | null
          founder_id: string
          id: string
          maven_id: string
          rating: number
          task_id: string
        }
        Insert: {
          created_at?: string
          feedback?: string | null
          founder_id: string
          id?: string
          maven_id: string
          rating: number
          task_id: string
        }
        Update: {
          created_at?: string
          feedback?: string | null
          founder_id?: string
          id?: string
          maven_id?: string
          rating?: number
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_ratings_founder_id_fkey"
            columns: ["founder_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_ratings_maven_id_fkey"
            columns: ["maven_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "task_ratings_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: true
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          created_at: string
          created_by: string
          description: string | null
          due_date: string | null
          end_date: string | null
          id: string
          jira_issue_key: string | null
          start_date: string | null
          status: string
          title: string
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          due_date?: string | null
          end_date?: string | null
          id?: string
          jira_issue_key?: string | null
          start_date?: string | null
          status?: string
          title: string
        }
        Update: {
          assigned_to?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          due_date?: string | null
          end_date?: string | null
          id?: string
          jira_issue_key?: string | null
          start_date?: string | null
          status?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      universities: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      impersonate_user: {
        Args: {
          impersonator_id: string
          target_user_id: string
        }
        Returns: Json
      }
    }
    Enums: {
      application_status_enum: "pending" | "approved" | "rejected"
      jira_hosting_type: "cloud" | "server"
      maven_skillset_enum:
        | "Developer"
        | "Marketer"
        | "Copywriter"
        | "Designer"
        | "Accounting"
        | "Sales"
        | "Other"
      project_status_enum: "draft" | "active" | "completed" | "archived"
      slack_notification_type: "all" | "mentions" | "none"
      subscription_status: "active" | "canceled" | "past_due" | "incomplete"
      user_type_enum: "founder" | "maven" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
