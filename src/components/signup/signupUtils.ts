import { supabase } from "@/integrations/supabase/client";
import { NavigateFunction } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

type SignupData = {
  email: string;
  password: string;
  fullName: string;
  userType: "founder" | "maven";
  mavenSkillset?: string;
  avatarFile: File | null;
};

export const handleSignupSubmission = async (
  data: SignupData,
  navigate: NavigateFunction,
  setIsUploading: (value: boolean) => void
) => {
  const { email, password, fullName, userType, mavenSkillset, avatarFile } = data;

  if (!avatarFile) {
    throw new Error("Profile picture is required");
  }

  if (userType === "maven" && !mavenSkillset) {
    throw new Error("Please select your skillset");
  }

  try {
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

    // Upload avatar
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

    // Update profile with avatar URL
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", authData.user.id);

    if (updateError) throw updateError;

    // Sign in the user immediately after signup
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) throw signInError;

    toast({
      title: "Success!",
      description: "Account created successfully. Redirecting to dashboard...",
    });

    navigate("/dashboard");
  } catch (error) {
    throw error;
  }
};