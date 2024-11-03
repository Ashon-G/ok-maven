import { Outlet, NavLink } from "react-router-dom";
import { MessageSquare, ListTodo, UserCircle, Settings, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { session } = useAuth();
  const userMetadataType = session?.user?.user_metadata?.user_type;
  const appMetadataType = session?.user?.app_metadata?.user_type;
  const isAdmin = userMetadataType === 'admin' || appMetadataType === 'admin';
  const [open, setOpen] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session?.user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

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

  const MobileNavLinks = () => (
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
      <NavLink
        to="profile"
        className={({ isActive }) =>
          `flex flex-col items-center p-2 ${
            isActive ? "text-blue-600" : "text-gray-600"
          }`
        }
      >
        <UserCircle className="h-5 w-5" />
        <span className="text-xs">Profile</span>
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

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 pb-20 md:p-8">
      <div className="mx-auto max-w-7xl">
        <nav className="mb-8 rounded-2xl border border-black/5 bg-white p-2 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between gap-2">
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
            <div className="hidden md:flex items-center gap-2">
              <NavLinks />
            </div>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url || ""} />
                  <AvatarFallback>
                    {profile?.full_name?.charAt(0) || session?.user.email?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <NavLink to="profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                </NavLink>
                <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="mt-2 px-4 text-sm text-gray-500">
            Current user type: {userMetadataType || 'none'} (user metadata) / {appMetadataType || 'none'} (app metadata)
          </div>
        </nav>
        <div className="rounded-2xl border border-black/5 bg-white p-4 md:p-8 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
          <Outlet />
        </div>
      </div>
      <MobileNavLinks />
    </div>
  );
};

export default Dashboard;