import { Outlet, NavLink } from "react-router-dom";
import { MessageSquare, ListTodo, UserCircle, Settings } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

const Dashboard = () => {
  const { session } = useAuth();
  const isAdmin = session?.user.user_metadata.user_type === 'admin';

  return (
    <div className="container py-8">
      <nav className="mb-8">
        <div className="flex gap-4 border-b">
          <NavLink
            to="tasks"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 border-b-2 ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent hover:border-gray-200"
              }`
            }
          >
            <ListTodo className="w-4 h-4" />
            Tasks
          </NavLink>
          <NavLink
            to="chat"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 border-b-2 ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent hover:border-gray-200"
              }`
            }
          >
            <MessageSquare className="w-4 h-4" />
            Chat
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 border-b-2 ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent hover:border-gray-200"
              }`
            }
          >
            <UserCircle className="w-4 h-4" />
            Profile
          </NavLink>
          {isAdmin && (
            <NavLink
              to="admin"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 border-b-2 ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent hover:border-gray-200"
                }`
              }
            >
              <Settings className="w-4 h-4" />
              Admin
            </NavLink>
          )}
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Dashboard;