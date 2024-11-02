import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Message = {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  sender: {
    full_name: string | null;
  };
  receiver: {
    full_name: string | null;
  };
};

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: userProfile } = useQuery({
    queryKey: ["userProfile"],
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

  const { data: availableUsers } = useQuery({
    queryKey: ["availableUsers", session?.user.id],
    queryFn: async () => {
      if (!userProfile?.user_type) return [];

      let query;
      if (userProfile.user_type === "founder") {
        // Founders can chat with their assigned mavens and admins
        query = supabase
          .from("founder_maven_assignments")
          .select(`
            maven:profiles!founder_maven_assignments_maven_id_fkey(
              id,
              full_name,
              user_type
            )
          `)
          .eq("founder_id", session?.user.id);
      } else if (userProfile.user_type === "maven") {
        // Mavens can chat with their assigned founders and admins
        query = supabase
          .from("founder_maven_assignments")
          .select(`
            founder:profiles!founder_maven_assignments_founder_id_fkey(
              id,
              full_name,
              user_type
            )
          `)
          .eq("maven_id", session?.user.id);
      }

      // Add admins to the available users
      const { data: admins } = await supabase
        .from("profiles")
        .select("id, full_name, user_type")
        .eq("user_type", "admin");

      const { data: assignments } = await query;
      const users = assignments?.map((a) => a.maven || a.founder) || [];
      return [...users, ...(admins || [])];
    },
    enabled: !!userProfile,
  });

  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ["messages", selectedUser],
    queryFn: async () => {
      if (!selectedUser) return [];

      const { data, error } = await supabase
        .from("messages")
        .select(`
          id,
          content,
          created_at,
          sender_id,
          receiver_id,
          sender:profiles!sender_id(full_name),
          receiver:profiles!receiver_id(full_name)
        `)
        .or(`and(sender_id.eq.${session?.user.id},receiver_id.eq.${selectedUser}),and(sender_id.eq.${selectedUser},receiver_id.eq.${session?.user.id})`)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!selectedUser,
  });

  const sendMessage = useMutation({
    mutationFn: async () => {
      if (!session?.user.id || !selectedUser) throw new Error("No user selected");

      const { error } = await supabase.from("messages").insert({
        content: message,
        sender_id: session.user.id,
        receiver_id: selectedUser,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      setMessage("");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    const channel = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => {
          queryClient.invalidateQueries({ queryKey: ["messages"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px]">
      <div className="mb-4">
        <Select value={selectedUser} onValueChange={setSelectedUser}>
          <SelectTrigger>
            <SelectValue placeholder="Select a user to chat with" />
          </SelectTrigger>
          <SelectContent>
            {availableUsers?.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.full_name} ({user.user_type})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="flex-1 p-4 bg-white rounded-lg border shadow-sm mb-4">
        <div className="space-y-4">
          {messages?.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender_id === session?.user.id
                  ? "items-end"
                  : "items-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.sender_id === session?.user.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm font-medium mb-1">
                  {msg.sender?.full_name}
                </p>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      {selectedUser && (
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && message) {
                sendMessage.mutate();
              }
            }}
          />
          <Button
            onClick={() => sendMessage.mutate()}
            disabled={!message || sendMessage.isPending}
          >
            {sendMessage.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
    </div>
  );
};