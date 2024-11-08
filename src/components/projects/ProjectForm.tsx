import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/auth/AuthProvider";
import { supabase } from "@/integrations/supabase/client";
import { GenerateTasksButton } from "./GenerateTasksButton";

export const ProjectForm = () => {
  const { session } = useAuth();
  const { toast } = useToast();
  const [projectId, setProjectId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goals: [""],
    target_audience: "",
    timeline: "",
    budget: "",
  });

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
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-2">
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Project Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your project in detail..."
          required
          className="min-h-[150px]"
        />
      </div>

      <div className="space-y-4">
        <Label>Project Goals</Label>
        {formData.goals.map((goal, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={goal}
              onChange={(e) => handleGoalChange(index, e.target.value)}
              placeholder={`Goal ${index + 1}`}
            />
            {formData.goals.length > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => removeGoal(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button type="button" variant="outline" onClick={addGoal}>
          Add Goal
        </Button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="target_audience">Target Audience</Label>
        <Input
          id="target_audience"
          value={formData.target_audience}
          onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
          placeholder="Who is this project for?"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="timeline">Timeline</Label>
        <Input
          id="timeline"
          value={formData.timeline}
          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
          placeholder="Expected timeline for the project"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="budget">Budget</Label>
        <Input
          id="budget"
          value={formData.budget}
          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
          placeholder="Project budget"
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit">Save Project</Button>
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