import { Outlet, NavLink } from "react-router-dom";
import { MessageSquare, ListTodo, UserCircle, Settings, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Dashboard = () => {
  const { session } = useAuth();
  const userMetadataType = session?.user?.user_metadata?.user_type;
  const appMetadataType = session?.user?.app_metadata?.user_type;
  const isAdmin = userMetadataType === 'admin' || appMetadataType === 'admin';
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const NavLinks = () => (
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
      <NavLink
        to="profile"
        onClick={() => setOpen(false)}
        className={({ isActive }) =>
          `nav-link ${isActive ? "active" : ""}`
        }
      >
        <UserCircle className="h-4 w-4" />
        Profile
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
      <button
        onClick={handleSignOut}
        className="nav-link text-red-500 hover:bg-red-50"
      >
        <LogOut className="h-4 w-4" />
        Sign Out
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 rounded-2xl border border-black/5 bg-white p-2 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-2">
            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="md:hidden">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] p-4">
                <div className="flex flex-col gap-2 mt-4">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-2 w-full">
              <NavLinks />
            </div>
          </div>
          <div className="mt-2 px-4 text-sm text-gray-500">
            Current user type: {userMetadataType || 'none'} (user metadata) / {appMetadataType || 'none'} (app metadata)
          </div>
        </nav>
        <div className="rounded-2xl border border-black/5 bg-white p-4 md:p-8 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;