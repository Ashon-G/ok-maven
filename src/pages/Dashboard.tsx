import { Outlet } from "react-router-dom";
import { UserCircle, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { ImpersonateUser } from "@/components/admin/ImpersonateUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import AnimatedNavigation from "@/components/dashboard/AnimatedNavigation";
import { Button } from "@/components/ui/button";
import { JiraIntegrationDialog } from "@/components/dashboard/jira/JiraIntegrationDialog";
import { useState } from "react";

const Dashboard = () => {
  const { session } = useAuth();
  const userMetadataType = session?.user?.user_metadata?.user_type;
  const appMetadataType = session?.user?.app_metadata?.user_type;
  const isAdmin = userMetadataType === 'admin' || appMetadataType === 'admin';
  const [isJiraOpen, setIsJiraOpen] = useState(false);

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

  const { data: jiraIntegration } = useQuery({
    queryKey: ["jiraIntegration", session?.user.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("jira_integrations")
        .select("*")
        .eq("user_id", session?.user.id)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!session?.user.id,
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50/50 no-scrollbar">
      <nav className="fixed top-0 left-0 right-0 z-50 mb-8 bg-white p-2 border-b border-black/5 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={profile?.avatar_url || ""} />
                    <AvatarFallback>
                      {profile?.full_name?.charAt(0) || session?.user.email?.charAt(0) || "?"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-white border border-gray-200 shadow-lg">
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

              {isAdmin && (
                <div className="hidden md:block">
                  <ImpersonateUser />
                </div>
              )}

              {profile?.user_type === "founder" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsJiraOpen(true)}
                  className="ml-4"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {jiraIntegration ? "Update Jira Settings" : "Connect to Jira"}
                </Button>
              )}
            </div>
          </div>
          <div className="mt-2 px-4 text-sm text-gray-500">
            Current user type: {userMetadataType || 'none'} (user metadata) / {appMetadataType || 'none'} (app metadata)
          </div>
        </div>
      </nav>

      <AnimatedNavigation />

      <div className="pt-24 pb-20">
        <Outlet />
      </div>

      {profile?.user_type === "founder" && (
        <JiraIntegrationDialog
          open={isJiraOpen}
          onOpenChange={setIsJiraOpen}
        />
      )}
    </div>
  );
};

export default Dashboard;