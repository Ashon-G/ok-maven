import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AssignmentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateAssignment: (founderId: string, mavenId: string) => void;
  isPending: boolean;
  founders: Array<{ id: string; full_name: string }>;
  mavens: Array<{ id: string; full_name: string }>;
  existingAssignments: Array<{ founder_id: string; maven_id: string }>;
}

export const AssignmentDialog = ({
  isOpen,
  onOpenChange,
  onCreateAssignment,
  isPending,
  founders,
  mavens,
  existingAssignments,
}: AssignmentDialogProps) => {
  const [selectedFounder, setSelectedFounder] = useState("");
  const [selectedMaven, setSelectedMaven] = useState("");

  const handleCreate = () => {
    onCreateAssignment(selectedFounder, selectedMaven);
  };

  // Filter out mavens that are already assigned to the selected founder
  const availableMavens = mavens?.filter(
    (maven) =>
      !existingAssignments.some(
        (assignment) =>
          assignment.founder_id === selectedFounder &&
          assignment.maven_id === maven.id
      )
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Assignment</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Founder</label>
            <Select value={selectedFounder} onValueChange={setSelectedFounder}>
              <SelectTrigger>
                <SelectValue placeholder="Select a founder" />
              </SelectTrigger>
              <SelectContent>
                {founders?.map((founder) => (
                  <SelectItem key={founder.id} value={founder.id}>
                    {founder.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium">Maven</label>
            <Select value={selectedMaven} onValueChange={setSelectedMaven}>
              <SelectTrigger>
                <SelectValue placeholder="Select a maven" />
              </SelectTrigger>
              <SelectContent>
                {availableMavens?.map((maven) => (
                  <SelectItem key={maven.id} value={maven.id}>
                    {maven.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {selectedFounder && availableMavens.length === 0 && (
            <Alert>
              <AlertDescription>
                All available mavens have already been assigned to this founder.
              </AlertDescription>
            </Alert>
          )}
          <Button
            onClick={handleCreate}
            disabled={!selectedFounder || !selectedMaven || isPending}
          >
            {isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Create Assignment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};