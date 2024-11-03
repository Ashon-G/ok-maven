import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface TaskDialogHeaderProps {
  title: string;
  isEditing: boolean;
  editedTitle: string;
  setEditedTitle: (title: string) => void;
}

export const TaskDialogHeader = ({
  title,
  isEditing,
  editedTitle,
  setEditedTitle,
}: TaskDialogHeaderProps) => {
  return (
    <DialogHeader>
      {isEditing ? (
        <Input
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="text-xl font-semibold"
        />
      ) : (
        <DialogTitle className="text-xl font-semibold text-[#172b4d]">
          {title}
        </DialogTitle>
      )}
    </DialogHeader>
  );
};