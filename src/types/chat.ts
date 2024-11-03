export type Message = {
  id: string;
  content: string;
  created_at: string;
  sender_id: string;
  receiver_id: string;
  sender: {
    full_name: string | null;
  } | null;
  receiver: {
    full_name: string | null;
  } | null;
};

export type ChatUser = {
  id: string;
  full_name: string | null;
  user_type: string | null;
  avatar_url: string | null;
};