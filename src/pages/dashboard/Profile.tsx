import { ProfileForm } from "@/components/profile/ProfileForm";

const Profile = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <ProfileForm />
    </div>
  );
};

export default Profile;