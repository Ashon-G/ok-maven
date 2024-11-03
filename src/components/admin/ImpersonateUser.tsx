import { useState, useEffect } from "react";
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
  const [isImpersonating, setIsImpersonating] = useState(false);
  const [originalAdminId, setOriginalAdminId] = useState<string | null>(null);
  const { toast } = useToast();

  // Check if we're impersonating on component mount
  useEffect(() => {
    const storedAdminId = localStorage.getItem("originalAdminId");
    if (storedAdminId) {
      setIsImpersonating(true);
      setOriginalAdminId(storedAdminId);
    }
  }, []);

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

      // Store the original admin's ID before impersonating
      localStorage.setItem("originalAdminId", session.user.id);

      const { data, error } = await supabase.functions.invoke<ImpersonateResponse>('impersonate_user', {
        body: {
          impersonator_id: session.user.id,
          target_user_id: targetUserId
        }
      });

      if (error) throw error;
      if (!data) throw new Error("No data returned from impersonation");

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.user_metadata
      });

      if (signInError) throw signInError;

      return data;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Successfully impersonating user",
      });
      setIsImpersonating(true);
      window.location.reload();
    },
    onError: (error) => {
      console.error("Impersonation error:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const revertToAdmin = async () => {
    if (!originalAdminId) return;

    try {
      const { data, error } = await supabase.functions.invoke<ImpersonateResponse>('impersonate_user', {
        body: {
          impersonator_id: originalAdminId,
          target_user_id: originalAdminId
        }
      });

      if (error) throw error;
      if (!data) throw new Error("No data returned from impersonation");

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.user_metadata
      });

      if (signInError) throw signInError;

      localStorage.removeItem("originalAdminId");
      setIsImpersonating(false);
      setOriginalAdminId(null);
      
      toast({
        title: "Success",
        description: "Successfully reverted to admin account",
      });
      
      window.location.reload();
    } catch (error: any) {
      console.error("Revert error:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (isImpersonating) {
    return (
      <Button
        onClick={revertToAdmin}
        className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
      >
        Return to Admin Account
      </Button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Select
        value={selectedUser}
        onValueChange={setSelectedUser}
        disabled={isLoading || impersonateMutation.isPending}
      >
        <SelectTrigger className="w-full sm:w-[200px] bg-white">
          <SelectValue placeholder="Select user to impersonate" />
        </SelectTrigger>
        <SelectContent className="bg-white">
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
        className="w-full sm:w-auto"
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