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
    // First check if user exists
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', email)
      .single();

    if (existingUser) {
      throw new Error("An account with this email already exists");
    }

    // Sign up the user
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

    // Wait for profile creation and database updates to complete
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Now sign in the user
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      throw new Error("Account created but couldn't sign in automatically. Please try logging in manually.");
    }

    if (!signInData.user) {
      throw new Error("No user data returned after sign in");
    }

    toast({
      title: "Success!",
      description: "Account created successfully. Redirecting to dashboard...",
    });

    navigate("/dashboard");
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};