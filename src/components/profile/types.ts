export type MavenProfileData = {
  education: {
    university_id: string;
    degree_program: string;
    major: string;
    minor?: string;
    year_of_study: string;
    graduation_date: Date;
    gpa?: number;
  };
  experience: {
    experience_type: string;
    company_name: string;
    job_title: string;
    start_date: Date;
    end_date?: Date;
    responsibilities?: string;
    achievements?: string;
  };
  skills: {
    skill_type: string;
    skill_name: string;
  }[];
  availability: {
    start_date: Date;
    end_date: Date;
    role_type: string;
    location_preference: string;
  };
  contact: {
    phone_number: string;
    location: string;
    linkedin_profile?: string;
  };
};