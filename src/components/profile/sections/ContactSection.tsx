import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";
import { MavenProfileData } from "../types";

type Props = {
  register: UseFormRegister<MavenProfileData>;
};

export const ContactSection = ({ register }: Props) => {
  return (
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
  );
};