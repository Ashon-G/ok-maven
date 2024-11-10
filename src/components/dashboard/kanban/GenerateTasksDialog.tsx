import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GenerateTasksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
}

export const GenerateTasksDialog = ({
  open,
  onOpenChange,
  userId,
}: GenerateTasksDialogProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const generateTasks = async () => {
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both a title and description.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-tasks', {
        body: { 
          founderId: userId,
          title,
          description,
        },
      });

      if (error) {
        throw error;
      }

      if (!data?.tasks) {
        throw new Error('No tasks were generated');
      }

      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      
      toast({
        title: "Tasks Generated",
        description: `Successfully created ${data.tasks.length} tasks.`,
      });
      onOpenChange(false);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error('Error generating tasks:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate tasks. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Generate Tasks with AI</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project in detail..."
              className="min-h-[100px]"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Our AI will analyze your project details and generate relevant tasks to help you get started.
          </p>

          <Button 
            onClick={generateTasks} 
            disabled={isGenerating}
            className="w-full"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Wand2 className="h-4 w-4 mr-2" />
            )}
            Generate Tasks
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};