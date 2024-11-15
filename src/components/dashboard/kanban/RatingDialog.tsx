import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface RatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId: string;
  mavenId: string;
  founderId: string;
}

export const RatingDialog = ({ open, onOpenChange, taskId, mavenId, founderId }: RatingDialogProps) => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const submitRating = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("task_ratings")
        .insert({
          task_id: taskId,
          maven_id: mavenId,
          founder_id: founderId,
          rating,
          feedback,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task-ratings"] });
      toast({
        title: "Rating submitted",
        description: "Thank you for your feedback!",
      });
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rate Task Completion</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                onClick={() => setRating(value)}
                className={`p-1 rounded-full transition-colors ${
                  rating >= value ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                <Star className="h-8 w-8 fill-current" />
              </button>
            ))}
          </div>
          <Textarea
            placeholder="Provide feedback about the task completion..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="min-h-[100px]"
          />
          <Button 
            onClick={() => submitRating.mutate()}
            disabled={rating === 0 || submitRating.isPending}
            className="w-full"
          >
            Submit Rating
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};