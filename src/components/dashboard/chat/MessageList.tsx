import { Message } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";

type MessageListProps = {
  messages: Message[];
  currentUserId: string;
};

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  return (
    <ScrollArea className="flex-1 p-4 bg-white rounded-lg border shadow-sm mb-4">
      <div className="space-y-4">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender_id === currentUserId ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.sender_id === currentUserId
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p className="text-sm font-medium mb-1">{msg.sender?.full_name}</p>
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};