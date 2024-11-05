import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

type AvatarUploadProps = {
  fullName: string;
  onAvatarChange: (file: File) => void;
  error?: string;
};

export const AvatarUpload = ({ fullName, onAvatarChange, error }: AvatarUploadProps) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAvatarChange(file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={avatarPreview || ""} />
        <AvatarFallback>{fullName?.charAt(0) || "?"}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center">
        <Label htmlFor="avatar" className="cursor-pointer inline-flex items-center space-x-2 text-blue-600 hover:text-blue-500">
          <Upload className="h-4 w-4" />
          <span>Upload Profile Picture</span>
        </Label>
        <Input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="hidden"
          required
        />
        <p className="text-sm text-red-500 mt-1">{error}</p>
        <p className="text-sm text-gray-500 mt-1">Required</p>
      </div>
    </div>
  );
};