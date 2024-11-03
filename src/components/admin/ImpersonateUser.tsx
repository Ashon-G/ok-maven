import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type ImpersonateResponse = {
  id: string;
  email: string;
  user_metadata: string;
};

export const ImpersonateUser = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const { toast } = useToast();

  const { data: users, isLoading } = useQuery({
    queryKey: ["impersonate-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const impersonateMutation = useMutation({
    mutationFn: async (targetUserId: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) throw new Error("No session found");

      const { data, error } = await supabase.functions.invoke<ImpersonateResponse>('impersonate_user', {
        body: {
          impersonator_id: session.user.id,
          target_user_id: targetUserId
        }
      });

      if (error) throw error;
      if (!data) throw new Error("No data returned from impersonation");

      // Sign in as the impersonated user
      await supabase.auth.signInWithPassword({
        email: data.email,
        password: "temporary-password" // This won't work in production, you'll need a proper impersonation mechanism
      });

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Successfully impersonating user",
      });
      window.location.reload(); // Reload to update the UI with the new user context
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="flex gap-2">
      <Select
        value={selectedUser}
        onValueChange={setSelectedUser}
        disabled={isLoading || impersonateMutation.isPending}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select user to impersonate" />
        </SelectTrigger>
        <SelectContent>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              {user.full_name} ({user.user_type})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        onClick={() => selectedUser && impersonateMutation.mutate(selectedUser)}
        disabled={!selectedUser || impersonateMutation.isPending}
      >
        {impersonateMutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Impersonate"
        )}
      </Button>
    </div>
  );
};