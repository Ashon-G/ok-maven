export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  due_date: string | null;
  assigned_to: string | null;
  created_by: string;
  created_at: string;
  jira_issue_key: string | null;
  start_date: string | null;
  end_date: string | null;
}