import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Send } from "lucide-react";

type MessageInputProps = {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
  isPending: boolean;
};

export const MessageInput = ({
  message,
  setMessage,
  onSend,
  isPending,
}: MessageInputProps) => {
  return (
    <div className="flex gap-2">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={(e) => {
          if (e.key === "Enter" && message) {
            onSend();
          }
        }}
      />
      <Button onClick={onSend} disabled={!message || isPending}>
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};