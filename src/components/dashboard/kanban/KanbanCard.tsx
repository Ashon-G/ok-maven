import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";
import { RootState } from "@/store";
import { changeCardText, deleteCard } from "@/store/cardsSlice";
import CardEditor from "./CardEditor";

interface KanbanCardProps {
  cardId: string;
  index: number;
  listId: string;
}

const KanbanCard = ({ cardId, index, listId }: KanbanCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const card = useSelector((state: RootState) => state.cardsById[cardId]);
  const dispatch = useDispatch();

  const handleSave = (text: string) => {
    dispatch(changeCardText({ cardId, cardText: text }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteCard({ cardId }));
  };

  if (isEditing) {
    return (
      <CardEditor
        text={card.text}
        onSave={handleSave}
        onCancel={() => setIsEditing(false)}
        onDelete={handleDelete}
      />
    );
  }

  return (
    <Draggable draggableId={cardId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded shadow-sm mb-2 p-2 hover:bg-gray-50 cursor-pointer relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-1 right-1 p-1 text-gray-500 hover:bg-gray-200 rounded"
            >
              ✎
            </button>
          )}
          {card.text}
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;