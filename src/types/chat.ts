export type Message = {
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

export type ChatUser = {
  id: string;
  full_name: string | null;
  user_type: string | null;
};