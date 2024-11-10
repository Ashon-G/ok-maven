import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { UseFormRegister } from "react-hook-form";
import { MavenProfileData } from "../types";

type Props = {
  register: UseFormRegister<MavenProfileData>;
  universities: any[];
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
};

export const EducationSection = ({ register, universities, selectedDate, setSelectedDate }: Props) => {
  return (
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
  );
};