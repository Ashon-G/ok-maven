import { Outlet, NavLink } from "react-router-dom";
import { MessageSquare, ListTodo } from "lucide-react";

const Dashboard = () => {
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
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Dashboard;