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
    // First check if user exists in auth
    const { data: { user: existingAuthUser }, error: checkError } = await supabase.auth.admin.getUserByEmail(email);
    
    if (existingAuthUser) {
      throw new Error("An account with this email already exists");
    }

    if (checkError && checkError.message !== "User not found") {
      throw checkError;
    }

    // Sign up the user with metadata
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
    setIsUploading(true);
    const fileExt = avatarFile.name.split('.').pop();
    const filePath = `${authData.user.id}/avatar.${fileExt}`;

    // First, try to remove any existing avatar
    try {
      await supabase.storage
        .from('avatars')
        .remove([filePath]);
    } catch (error) {
      // Ignore error if file doesn't exist
    }

    // Upload new avatar
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
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Verify profile exists before proceeding
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (profileError || !profile) {
      throw new Error("Profile creation failed. Please try again.");
    }

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

    setIsUploading(false);
    toast({
      title: "Success!",
      description: "Account created successfully. Redirecting to dashboard...",
    });

    navigate("/dashboard");
  } catch (error: any) {
    setIsUploading(false);
    console.error("Signup error:", error);
    throw error;
  }
};