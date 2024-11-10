export type ProjectStatus = 'draft' | 'active' | 'completed' | 'archived';

export interface Project {
  id: string;
  founder_id: string;
  description: string;
  created_at: string;
  title: string;
  status: ProjectStatus;
  goals: string[] | null;
  target_audience: string | null;
  timeline: string | null;
  budget: string | null;
}