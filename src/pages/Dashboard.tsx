import { Outlet, NavLink } from "react-router-dom";
import { MessageSquare, ListTodo, UserCircle, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { session } = useAuth();
  const isAdmin = session?.user?.user_metadata?.user_type === 'admin' || 
                 session?.user?.app_metadata?.user_type === 'admin';

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

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
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 border-b-2 border-transparent hover:border-gray-200 ml-auto"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Dashboard;