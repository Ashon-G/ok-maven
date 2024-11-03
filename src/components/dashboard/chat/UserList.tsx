import { ChatUser } from "@/types/chat";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type UserListProps = {
  users: ChatUser[];
  selectedUser: string;
  onUserSelect: (userId: string) => void;
};

export const UserList = ({ users, selectedUser, onUserSelect }: UserListProps) => {
  return (
    <div className="w-[280px] border-r">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Conversations</h2>
      </div>
      <div className="overflow-y-auto h-[calc(600px-65px)]">
        {users?.map((user) => (
          <button
            key={user.id}
            onClick={() => onUserSelect(user.id)}
            className={cn(
              "w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors",
              selectedUser === user.id && "bg-gray-50"
            )}
          >
            <Avatar>
              <AvatarFallback>
                {user.full_name?.charAt(0) || "?"}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="font-medium">{user.full_name}</p>
              <p className="text-sm text-gray-500 capitalize">{user.user_type}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};