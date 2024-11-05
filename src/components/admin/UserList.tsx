import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { MavenSkillsetBadge } from "./MavenSkillsetBadge";

export const AdminUserList = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Skillset</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar_url || ""} />
                  <AvatarFallback>
                    {user.full_name?.charAt(0) || "?"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user.full_name}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.username}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    user.user_type === "admin"
                      ? "bg-purple-100"
                      : user.user_type === "founder"
                      ? "bg-blue-100"
                      : "bg-green-100"
                  }
                >
                  {user.user_type}
                </Badge>
              </TableCell>
              <TableCell>
                {user.user_type === "maven" && (
                  <MavenSkillsetBadge skillset={user.maven_skillset} />
                )}
              </TableCell>
              <TableCell>
                {new Date(user.created_at).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};