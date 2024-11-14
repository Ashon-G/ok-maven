import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Profile } from "@/integrations/supabase/types/profile";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, GraduationCap, Briefcase, Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface MavenDetailsDialogProps {
  maven: Profile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const MavenDetailsDialog = ({ maven, open, onOpenChange }: MavenDetailsDialogProps) => {
  const { data: education, isLoading: loadingEducation } = useQuery({
    queryKey: ["maven-education", maven.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("maven_education")
        .select("*, universities(name)")
        .eq("maven_id", maven.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: open,
  });

  const { data: experience, isLoading: loadingExperience } = useQuery({
    queryKey: ["maven-experience", maven.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("maven_experience")
        .select("*")
        .eq("maven_id", maven.id)
        .order("start_date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
    enabled: open,
  });

  const { data: skills, isLoading: loadingSkills } = useQuery({
    queryKey: ["maven-skills", maven.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("maven_skills")
        .select("*")
        .eq("maven_id", maven.id);
      
      if (error) throw error;
      return data;
    },
    enabled: open,
  });

  const { data: availability, isLoading: loadingAvailability } = useQuery({
    queryKey: ["maven-availability", maven.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("maven_availability")
        .select("*")
        .eq("maven_id", maven.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: open,
  });

  const isLoading = loadingEducation || loadingExperience || loadingSkills || loadingAvailability;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <img
              src={maven.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg"}
              alt={maven.full_name || "Maven"}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <DialogTitle className="text-2xl">{maven.full_name}</DialogTitle>
              <Badge variant="secondary" className="mt-1">
                {maven.maven_skillset}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <div>
              <p className="text-muted-foreground whitespace-pre-wrap">{maven.bio}</p>
            </div>

            {education && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Education
                </h3>
                <div className="bg-secondary/10 rounded-lg p-4">
                  <p className="font-medium">{education.universities?.name}</p>
                  <p>{education.degree_program} in {education.major}</p>
                  {education.minor && <p>Minor in {education.minor}</p>}
                  <p className="text-sm text-muted-foreground mt-1">
                    Graduating {format(new Date(education.graduation_date), 'MMMM yyyy')}
                  </p>
                </div>
              </div>
            )}

            {experience && experience.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Experience
                </h3>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="bg-secondary/10 rounded-lg p-4">
                      <p className="font-medium">{exp.job_title}</p>
                      <p>{exp.company_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(exp.start_date), 'MMM yyyy')} - 
                        {exp.end_date ? format(new Date(exp.end_date), ' MMM yyyy') : ' Present'}
                      </p>
                      {exp.responsibilities && (
                        <p className="mt-2 text-sm">{exp.responsibilities}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {skills && skills.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill.id} variant="secondary">
                      {skill.skill_name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {availability && (
              <div className="space-y-2">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Availability
                </h3>
                <div className="bg-secondary/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span>{availability.location_preference}</span>
                  </div>
                  <p>{availability.role_type}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(availability.start_date), 'MMM dd, yyyy')} - 
                    {format(new Date(availability.end_date), ' MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};