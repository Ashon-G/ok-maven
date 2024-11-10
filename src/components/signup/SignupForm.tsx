import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { SignupFormFields } from "./SignupFormFields";
import { handleSignupSubmission } from "./signupUtils";

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
    setIsUploading(true);

    try {
      await handleSignupSubmission(
        {
          email,
          password,
          fullName,
          userType,
          mavenSkillset,
          avatarFile,
        },
        navigate,
        setIsUploading
      );
    } catch (error) {
      setAvatarError(error instanceof Error ? error.message : "An error occurred during signup");
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
          <SignupFormFields
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            fullName={fullName}
            setFullName={setFullName}
            avatarFile={avatarFile}
            setAvatarFile={setAvatarFile}
            avatarError={avatarError}
            userType={userType}
            mavenSkillset={mavenSkillset}
            setMavenSkillset={setMavenSkillset}
          />

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