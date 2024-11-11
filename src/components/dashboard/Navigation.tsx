import { NavLink } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  MessageSquare,
  ListTodo,
  User,
  Settings,
  Wallet,
  Link as LinkIcon
} from "lucide-react";

export const Navigation = () => {
  const { session } = useAuth();
  const userType = session?.user?.user_metadata?.user_type;
  const isAdmin = userType === 'admin';

  return (
    <nav className="flex justify-center gap-1 fixed bottom-0 left-0 right-0 p-2 bg-white border-t border-gray-200 z-50 md:relative md:border-none">
      <NavLink
        to="tasks"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 ${
            isActive ? "text-primary" : "text-gray-600"
          }`
        }
      >
        <ListTodo className="h-5 w-5" />
        <span className="text-xs">Tasks</span>
      </NavLink>

      <NavLink
        to="chat"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 ${
            isActive ? "text-primary" : "text-gray-600"
          }`
        }
      >
        <MessageSquare className="h-5 w-5" />
        <span className="text-xs">Chat</span>
      </NavLink>

      <NavLink
        to="treasury"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 ${
            isActive ? "text-primary" : "text-gray-600"
          }`
        }
      >
        <Wallet className="h-5 w-5" />
        <span className="text-xs">Treasury</span>
      </NavLink>

      <NavLink
        to="integrations"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 ${
            isActive ? "text-primary" : "text-gray-600"
          }`
        }
      >
        <LinkIcon className="h-5 w-5" />
        <span className="text-xs">Integrations</span>
      </NavLink>

      <NavLink
        to="profile"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 ${
            isActive ? "text-primary" : "text-gray-600"
          }`
        }
      >
        <User className="h-5 w-5" />
        <span className="text-xs">Profile</span>
      </NavLink>

      {isAdmin && (
        <NavLink
          to="admin"
          className={({ isActive }) =>
            `flex flex-col items-center p-2 rounded-lg hover:bg-gray-100 ${
              isActive ? "text-primary" : "text-gray-600"
            }`
          }
        >
          <Settings className="h-5 w-5" />
          <span className="text-xs">Admin</span>
        </NavLink>
      )}
    </nav>
  );
};