import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarUpload } from "./AvatarUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SignupFormFieldsProps = {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  fullName: string;
  setFullName: (value: string) => void;
  avatarFile: File | null;
  setAvatarFile: (file: File | null) => void;
  avatarError: string;
  userType: "founder" | "maven";
  mavenSkillset: string;
  setMavenSkillset: (value: string) => void;
};

export const SignupFormFields = ({
  email,
  setEmail,
  password,
  setPassword,
  fullName,
  setFullName,
  avatarFile,
  setAvatarFile,
  avatarError,
  userType,
  mavenSkillset,
  setMavenSkillset,
}: SignupFormFieldsProps) => {
  return (
    <div className="rounded-md shadow-sm space-y-4">
      <AvatarUpload 
        fullName={fullName} 
        onAvatarChange={setAvatarFile} 
        error={avatarError}
      />

      <div>
        <Label htmlFor="fullName" className="text-black">Full Name</Label>
        <Input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="border-black border-[1px]"
          required
        />
      </div>

      {userType === "maven" && (
        <div>
          <Label htmlFor="skillset" className="text-black">Skillset</Label>
          <Select
            value={mavenSkillset}
            onValueChange={setMavenSkillset}
            required
          >
            <SelectTrigger className="w-full border-black border-[1px]">
              <SelectValue placeholder="Select your skillset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Developer">Developer</SelectItem>
              <SelectItem value="Marketer">Marketer</SelectItem>
              <SelectItem value="Copywriter">Copywriter</SelectItem>
              <SelectItem value="Designer">Designer</SelectItem>
              <SelectItem value="Accounting">Accounting</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      <div>
        <Label htmlFor="email" className="text-black">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-black border-[1px]"
          required
        />
      </div>

      <div>
        <Label htmlFor="password" className="text-black">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-black border-[1px]"
          required
        />
      </div>
    </div>
  );
};