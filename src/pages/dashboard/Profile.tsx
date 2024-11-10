import { ProfileForm } from "@/components/profile/ProfileForm";
import { MavenProfileSetup } from "@/components/profile/MavenProfileSetup";
import { useAuth } from "@/components/auth/AuthProvider";

const Profile = () => {
  const { session } = useAuth();
  const isMaven = session?.user.user_metadata.user_type === 'maven';

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      {isMaven ? <MavenProfileSetup /> : <ProfileForm />}
    </div>
  );
};

export default Profile;