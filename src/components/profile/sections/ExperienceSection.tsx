import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Briefcase } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { MavenProfileData } from "../types";

type Props = {
  register: UseFormRegister<MavenProfileData>;
};

export const ExperienceSection = ({ register }: Props) => {
  return (
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
  );
};