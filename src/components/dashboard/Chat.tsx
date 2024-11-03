import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/components/auth/AuthProvider";
import { Message, ChatUser } from "@/types/chat";
import { MessageList } from "./chat/MessageList";
import { MessageInput } from "./chat/MessageInput";
import { UserList } from "./chat/UserList";
import { Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [showUserList, setShowUserList] = useState(true);
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
          `
          id,
          content,
          created_at,
          sender_id,
          receiver_id,
          sender:profiles!sender_id(
            full_name
          ),
          receiver:profiles!receiver_id(
            full_name
          )
        `
        )
        .or(
          `and(sender_id.eq.${session?.user.id},receiver_id.eq.${selectedUser}),and(sender_id.eq.${selectedUser},receiver_id.eq.${session?.user.id})`
        )
        .order("created_at", { ascending: true });

      if (error) throw error;

      return (data || []).map(msg => ({
        ...msg,
        sender: Array.isArray(msg.sender) ? msg.sender[0] : msg.sender,
        receiver: Array.isArray(msg.receiver) ? msg.receiver[0] : msg.receiver,
      })) as Message[];
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

  const selectedChatUser = availableUsers?.find(user => user.id === selectedUser);

  return (
    <div className="flex h-[calc(100vh-12rem)] border rounded-lg overflow-hidden">
      <div className={`md:block ${showUserList ? 'block w-full md:w-[280px]' : 'hidden'} border-r`}>
        <UserList
          users={availableUsers || []}
          selectedUser={selectedUser}
          onUserSelect={(userId) => {
            setSelectedUser(userId);
            setShowUserList(false);
          }}
        />
      </div>
      <div className={`flex-1 flex flex-col ${!showUserList ? 'block' : 'hidden md:block'}`}>
        {selectedUser ? (
          <>
            <div className="p-4 border-b flex items-center gap-2 md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setShowUserList(true)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium">{selectedChatUser?.full_name}</span>
            </div>
            <MessageList
              messages={messages || []}
              currentUserId={session?.user.id || ""}
            />
            <MessageInput
              message={message}
              setMessage={setMessage}
              onSend={() => sendMessage.mutate()}
              isPending={sendMessage.isPending}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};