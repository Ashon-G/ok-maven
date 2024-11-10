import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { EducationSection } from "./sections/EducationSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { ContactSection } from "./sections/ContactSection";
import { MavenProfileData } from "./types";

export const MavenProfileSetup = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<Date>();

  const { data: universities } = useQuery({
    queryKey: ["universities"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("universities")
        .select("*")
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const { register, handleSubmit } = useForm<MavenProfileData>();

  const updateProfile = useMutation({
    mutationFn: async (data: MavenProfileData) => {
      if (!session?.user.id) throw new Error("No user ID");

      // Update contact information in profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          phone_number: data.contact.phone_number,
          location: data.contact.location,
          linkedin_profile: data.contact.linkedin_profile,
        })
        .eq("id", session.user.id);

      if (profileError) throw profileError;

      // Add education with formatted date
      const { error: educationError } = await supabase
        .from("maven_education")
        .insert({
          maven_id: session.user.id,
          ...data.education,
          graduation_date: data.education.graduation_date.toISOString().split('T')[0],
        });

      if (educationError) throw educationError;

      // Add experience with formatted dates
      const { error: experienceError } = await supabase
        .from("maven_experience")
        .insert({
          maven_id: session.user.id,
          ...data.experience,
          start_date: data.experience.start_date.toISOString().split('T')[0],
          end_date: data.experience.end_date?.toISOString().split('T')[0],
        });

      if (experienceError) throw experienceError;

      // Add skills
      const { error: skillsError } = await supabase
        .from("maven_skills")
        .insert(
          data.skills.map(skill => ({
            maven_id: session.user.id,
            ...skill,
          }))
        );

      if (skillsError) throw skillsError;

      // Add availability with formatted dates
      const { error: availabilityError } = await supabase
        .from("maven_availability")
        .insert({
          maven_id: session.user.id,
          ...data.availability,
          start_date: data.availability.start_date.toISOString().split('T')[0],
          end_date: data.availability.end_date.toISOString().split('T')[0],
        });

      if (availabilityError) throw availabilityError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast({
        title: "Profile updated",
        description: "Your maven profile has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => updateProfile.mutate(data))} className="space-y-8">
      <EducationSection 
        register={register}
        universities={universities || []}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ExperienceSection register={register} />
      <ContactSection register={register} />
      <Button type="submit" className="w-full">
        Save Profile
      </Button>
    </form>
  );
};