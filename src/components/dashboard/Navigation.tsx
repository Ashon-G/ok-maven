import { NavLink } from "react-router-dom";
import { MessageSquare, ListTodo, Settings } from "lucide-react";

interface NavigationProps {
  isAdmin: boolean;
  setOpen: (value: boolean) => void;
}

export const NavLinks = ({ isAdmin, setOpen }: NavigationProps) => (
  <>
    <NavLink
      to="tasks"
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `nav-link ${isActive ? "active" : ""}`
      }
    >
      <ListTodo className="h-4 w-4" />
      Tasks
    </NavLink>
    <NavLink
      to="chat"
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `nav-link ${isActive ? "active" : ""}`
      }
    >
      <MessageSquare className="h-4 w-4" />
      Chat
    </NavLink>
    {isAdmin && (
      <NavLink
        to="admin"
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `nav-link ${isActive ? "active" : ""}`
        }
      >
        <Settings className="h-4 w-4" />
        Admin
      </NavLink>
    )}
  </>
);

export const MobileNavLinks = ({ isAdmin }: { isAdmin: boolean }) => (
  <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-around border-t border-gray-200 bg-white p-2 md:hidden">
    <NavLink
      to="tasks"
      className={({ isActive }) =>
        `flex flex-col items-center p-2 ${
          isActive ? "text-blue-600" : "text-gray-600"
        }`
      }
    >
      <ListTodo className="h-5 w-5" />
      <span className="text-xs">Tasks</span>
    </NavLink>
    <NavLink
      to="chat"
      className={({ isActive }) =>
        `flex flex-col items-center p-2 ${
          isActive ? "text-blue-600" : "text-gray-600"
        }`
      }
    >
      <MessageSquare className="h-5 w-5" />
      <span className="text-xs">Chat</span>
    </NavLink>
    {isAdmin && (
      <NavLink
        to="admin"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 ${
            isActive ? "text-blue-600" : "text-gray-600"
          }`
        }
      >
        <Settings className="h-5 w-5" />
        <span className="text-xs">Admin</span>
      </NavLink>
    )}
  </div>
);