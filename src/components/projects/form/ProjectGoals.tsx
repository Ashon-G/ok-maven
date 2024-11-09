import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProjectGoalsProps {
  goals: string[];
  onGoalChange: (index: number, value: string) => void;
  onAddGoal: () => void;
  onRemoveGoal: (index: number) => void;
}

export const ProjectGoals = ({
  goals,
  onGoalChange,
  onAddGoal,
  onRemoveGoal,
}: ProjectGoalsProps) => {
  return (
    <div className="space-y-4">
      <Label>Project Goals</Label>
      {goals.map((goal, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={goal}
            onChange={(e) => onGoalChange(index, e.target.value)}
            placeholder={`Goal ${index + 1}`}
          />
          {goals.length > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => onRemoveGoal(index)}
            >
              Remove
            </Button>
          )}
        </div>
      ))}
      <Button type="button" variant="outline" onClick={onAddGoal}>
        Add Goal
      </Button>
    </div>
  );
};