import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface TaskDialogFooterProps {
  canEdit: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onDelete: () => void;
}

export const TaskDialogFooter = ({
  canEdit,
  isEditing,
  onEdit,
  onCancel,
  onSave,
  onDelete,
}: TaskDialogFooterProps) => {
  if (!canEdit) return null;

  return (
    <DialogFooter className="mt-6">
      <div className="flex gap-2">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onSave}>Save</Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={onEdit}>
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={onDelete}
              className="gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          </>
        )}
      </div>
    </DialogFooter>
  );
};