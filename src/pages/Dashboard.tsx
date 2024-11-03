import { Outlet, NavLink } from "react-router-dom";
import { UserCircle, LogOut, Menu } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ImpersonateUser } from "@/components/admin/ImpersonateUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { NavLinks, MobileNavLinks } from "@/components/dashboard/Navigation";

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

  return (
    <div className="min-h-screen bg-gray-50/50">
      <nav className="fixed top-0 left-0 right-0 z-50 mb-8 bg-white p-2 border-b border-black/5 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger className="md:hidden">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] p-4">
                <div className="flex flex-col gap-2 mt-4">
                  <NavLinks isAdmin={isAdmin} setOpen={setOpen} />
                </div>
              </SheetContent>
            </Sheet>

            <div className="hidden md:flex items-center gap-2">
              <NavLinks isAdmin={isAdmin} setOpen={setOpen} />
            </div>

            {isAdmin && (
              <div className="hidden md:block">
                <ImpersonateUser />
              </div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={profile?.avatar_url || ""} />
                  <AvatarFallback>
                    {profile?.full_name?.charAt(0) || session?.user.email?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg">
                <NavLink to="profile">
                  <DropdownMenuItem className="cursor-pointer">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                </NavLink>
                {isAdmin && (
                  <div className="md:hidden p-2">
                    <ImpersonateUser />
                  </div>
                )}
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
        </div>
      </nav>

      <div className="mx-auto max-w-7xl pt-24 p-4 pb-20 md:p-8">
        <div className="rounded-2xl border border-black/5 bg-white p-4 md:p-8 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
          <Outlet />
        </div>
      </div>
      <MobileNavLinks isAdmin={isAdmin} />
    </div>
  );
};

export default Dashboard;