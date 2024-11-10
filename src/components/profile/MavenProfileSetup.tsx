import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, GraduationCap, Briefcase, BookOpen, Upload } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

type MavenProfileData = {
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

  const { register, handleSubmit, formState: { errors } } = useForm<MavenProfileData>();

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

      // Add education
      const { error: educationError } = await supabase
        .from("maven_education")
        .insert({
          maven_id: session.user.id,
          ...data.education,
        });

      if (educationError) throw educationError;

      // Add experience
      const { error: experienceError } = await supabase
        .from("maven_experience")
        .insert({
          maven_id: session.user.id,
          ...data.experience,
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

      // Add availability
      const { error: availabilityError } = await supabase
        .from("maven_availability")
        .insert({
          maven_id: session.user.id,
          ...data.availability,
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
      {/* Education Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Education</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>University</Label>
            <Select {...register("education.university_id")}>
              <SelectTrigger>
                <SelectValue placeholder="Select university" />
              </SelectTrigger>
              <SelectContent>
                {universities?.map((uni) => (
                  <SelectItem key={uni.id} value={uni.id}>
                    {uni.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Degree Program</Label>
            <Input {...register("education.degree_program")} />
          </div>

          <div className="space-y-2">
            <Label>Major</Label>
            <Input {...register("education.major")} />
          </div>

          <div className="space-y-2">
            <Label>Minor (Optional)</Label>
            <Input {...register("education.minor")} />
          </div>

          <div className="space-y-2">
            <Label>Year of Study</Label>
            <Input {...register("education.year_of_study")} />
          </div>

          <div className="space-y-2">
            <Label>GPA (Optional)</Label>
            <Input type="number" step="0.01" {...register("education.gpa")} />
          </div>

          <div className="space-y-2">
            <Label>Graduation Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-full justify-start text-left font-normal")}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Experience</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input {...register("experience.company_name")} />
          </div>

          <div className="space-y-2">
            <Label>Job Title</Label>
            <Input {...register("experience.job_title")} />
          </div>

          <div className="space-y-2">
            <Label>Experience Type</Label>
            <Select {...register("experience.experience_type")}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 col-span-2">
            <Label>Responsibilities</Label>
            <Textarea {...register("experience.responsibilities")} />
          </div>

          <div className="space-y-2 col-span-2">
            <Label>Achievements</Label>
            <Textarea {...register("experience.achievements")} />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Contact Information</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input {...register("contact.phone_number")} />
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Input {...register("contact.location")} />
          </div>

          <div className="space-y-2">
            <Label>LinkedIn Profile</Label>
            <Input {...register("contact.linkedin_profile")} />
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Save Profile
      </Button>
    </form>
  );
};