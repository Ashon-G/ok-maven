import { ChatUser } from "@/types/chat";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type UserSelectProps = {
  users: ChatUser[];
  selectedUser: string;
  onUserSelect: (userId: string) => void;
};

export const UserSelect = ({
  users,
  selectedUser,
  onUserSelect,
}: UserSelectProps) => {
  return (
    <div className="mb-4">
      <Select value={selectedUser} onValueChange={onUserSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a user to chat with" />
        </SelectTrigger>
        <SelectContent>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.full_name} ({user.user_type})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};