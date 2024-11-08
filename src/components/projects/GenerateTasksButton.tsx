import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Wand2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";

interface GenerateTasksButtonProps {
  projectId: string;
  founderId: string;
}

export const GenerateTasksButton = ({ projectId, founderId }: GenerateTasksButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const generateTasks = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-tasks', {
        body: { projectId, founderId },
      });

      if (error) throw error;

      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
      
      toast({
        title: "Tasks Generated",
        description: "AI has created new tasks for your project.",
      });
    } catch (error) {
      console.error('Error generating tasks:', error);
      toast({
        title: "Error",
        description: "Failed to generate tasks. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button 
      onClick={generateTasks} 
      disabled={isGenerating}
      className="gap-2"
    >
      {isGenerating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Wand2 className="h-4 w-4" />
      )}
      Generate Tasks with AI
    </Button>
  );
};