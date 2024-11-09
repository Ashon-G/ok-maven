import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { GenerateTasksButton } from "./GenerateTasksButton";
import { Loader2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { ProjectBasicFields } from "./form/ProjectBasicFields";
import { ProjectGoals } from "./form/ProjectGoals";

const STORAGE_KEY = "project_form_data";

export const ProjectForm = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [projectId, setProjectId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goals: [""],
    target_audience: "",
    timeline: "",
  });

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGoalChange = (index: number, value: string) => {
    const newGoals = [...formData.goals];
    newGoals[index] = value;
    setFormData({ ...formData, goals: newGoals });
  };

  const addGoal = () => {
    setFormData({ ...formData, goals: [...formData.goals, ""] });
  };

  const removeGoal = (index: number) => {
    const newGoals = formData.goals.filter((_, i) => i !== index);
    setFormData({ ...formData, goals: newGoals });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from("founder_projects")
        .insert({
          ...formData,
          founder_id: session?.user.id,
        })
        .select()
        .single();

      if (error) throw error;

      setProjectId(data.id);
      localStorage.removeItem(STORAGE_KEY);
      setFormData({
        title: "",
        description: "",
        goals: [""],
        target_audience: "",
        timeline: "",
      });

      queryClient.invalidateQueries({ queryKey: ["projects"] });

      toast({
        title: "Project Created",
        description: "Your project has been saved successfully.",
      });
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto mb-8">
      <ProjectBasicFields
        title={formData.title}
        description={formData.description}
        targetAudience={formData.target_audience}
        timeline={formData.timeline}
        onChange={handleFieldChange}
      />

      <ProjectGoals
        goals={formData.goals}
        onGoalChange={handleGoalChange}
        onAddGoal={addGoal}
        onRemoveGoal={removeGoal}
      />

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Project
        </Button>
        {projectId && session?.user.id && (
          <GenerateTasksButton
            projectId={projectId}
            founderId={session.user.id}
          />
        )}
      </div>
    </form>
  );
};