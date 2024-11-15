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
  assignee?: {
    id: string;
    full_name: string;
  } | null;
  creator?: {
    full_name: string;
  } | null;
}

export interface TaskRating {
  id: string;
  task_id: string;
  maven_id: string;
  founder_id: string;
  rating: number;
  feedback: string | null;
  created_at: string;
}