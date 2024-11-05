import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { AvatarUpload } from "./AvatarUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserType = "founder" | "maven";

type SignupFormProps = {
  userType: UserType;
  title: string;
};

export const SignupForm = ({ userType, title }: SignupFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [mavenSkillset, setMavenSkillset] = useState<string>("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setAvatarError("");

    if (!avatarFile) {
      setAvatarError("Profile picture is required");
      return;
    }

    if (userType === "maven" && !mavenSkillset) {
      toast({
        title: "Error",
        description: "Please select your skillset",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      if (!email || !password || !fullName) {
        throw new Error("Please fill in all required fields");
      }

      // First create the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            user_type: userType,
            maven_skillset: userType === "maven" ? mavenSkillset : null,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (!authData.user) throw new Error("No user data returned");

      // Now that we have a user, upload the avatar
      const fileExt = avatarFile.name.split('.').pop();
      const filePath = `${authData.user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile, {
          upsert: true,
          cacheControl: '3600'
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // Update the user's profile with the avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", authData.user.id);

      if (updateError) throw updateError;

      toast({
        title: "Success!",
        description: "Please check your email to verify your account.",
      });

      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred during signup",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
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

          <Button
            type="submit"
            disabled={isUploading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Sign up"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};