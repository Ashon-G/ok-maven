import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { Message, ChatUser } from "@/types/chat";
import { MessageList } from "./chat/MessageList";
import { MessageInput } from "./chat/MessageInput";
import { UserSelect } from "./chat/UserSelect";
import { Loader2 } from "lucide-react";

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

  const { data: availableUsers } = useQuery<ChatUser[]>({
    queryKey: ["availableUsers", session?.user.id],
    queryFn: async () => {
      if (!userProfile?.user_type) return [];

      let query;
      if (userProfile.user_type === "founder") {
        query = supabase
          .from("founder_maven_assignments")
          .select(
            `maven:profiles!founder_maven_assignments_maven_id_fkey(id, full_name, user_type)`
          )
          .eq("founder_id", session?.user.id);
      } else if (userProfile.user_type === "maven") {
        query = supabase
          .from("founder_maven_assignments")
          .select(
            `founder:profiles!founder_maven_assignments_founder_id_fkey(id, full_name, user_type)`
          )
          .eq("maven_id", session?.user.id);
      }

      const { data: admins } = await supabase
        .from("profiles")
        .select("id, full_name, user_type")
        .eq("user_type", "admin");

      const { data: assignments } = await query;
      const users = assignments?.map((a) => a.maven || a.founder) || [];
      return [...users, ...(admins || [])] as ChatUser[];
    },
    enabled: !!userProfile,
  });

  const { data: messages, isLoading } = useQuery<Message[]>({
    queryKey: ["messages", selectedUser],
    queryFn: async () => {
      if (!selectedUser) return [];

      const { data, error } = await supabase
        .from("messages")
        .select(
          `id, content, created_at, sender_id, receiver_id, sender:profiles!sender_id(full_name), receiver:profiles!receiver_id(full_name)`
        )
        .or(
          `and(sender_id.eq.${session?.user.id},receiver_id.eq.${selectedUser}),and(sender_id.eq.${selectedUser},receiver_id.eq.${session?.user.id})`
        )
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data as Message[];
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px]">
      <UserSelect
        users={availableUsers || []}
        selectedUser={selectedUser}
        onUserSelect={setSelectedUser}
      />
      <MessageList
        messages={messages || []}
        currentUserId={session?.user.id || ""}
      />
      {selectedUser && (
        <MessageInput
          message={message}
          setMessage={setMessage}
          onSend={() => sendMessage.mutate()}
          isPending={sendMessage.isPending}
        />
      )}
    </div>
  );
};