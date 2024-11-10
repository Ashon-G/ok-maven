export type UserType = 'founder' | 'maven' | 'admin';
export type MavenSkillset = 'Developer' | 'Marketer' | 'Copywriter' | 'Designer' | 'Accounting' | 'Sales' | 'Other';

export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  bio: string | null;
  settings: Record<string, any> | null;
  user_type: UserType | null;
  maven_skillset: MavenSkillset | null;
  phone_number: string | null;
  location: string | null;
  linkedin_profile: string | null;
}