import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { RootState } from "@/store";
import { changeListTitle, deleteList } from "@/store/listsSlice";
import KanbanCard from "./KanbanCard";
import AddCard from "./AddCard";
import ListEditor from "./ListEditor";

interface KanbanListProps {
  listId: string;
  index: number;
}

const KanbanList = ({ listId, index }: KanbanListProps) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [addingCard, setAddingCard] = useState(false);
  const list = useSelector((state: RootState) => state.listsById[listId]);
  const dispatch = useDispatch();

  const handleTitleChange = (newTitle: string) => {
    dispatch(changeListTitle({ listId, listTitle: newTitle }));
    setEditingTitle(false);
  };

  const handleDeleteList = () => {
    dispatch(deleteList({ listId }));
  };

  return (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="w-72 mx-2 flex-shrink-0"
        >
          <div className="bg-[#DFE3E6] rounded-lg">
            <div {...provided.dragHandleProps} className="p-2">
              {editingTitle ? (
                <ListEditor
                  title={list.title}
                  onSave={handleTitleChange}
                  onCancel={() => setEditingTitle(false)}
                  onDelete={handleDeleteList}
                />
              ) : (
                <div
                  className="font-medium p-2 cursor-pointer"
                  onClick={() => setEditingTitle(true)}
                >
                  {list.title}
                </div>
              )}
            </div>

            <Droppable droppableId={listId}>
              {(provided) => (
                <div ref={provided.innerRef} className="p-2">
                  {list.cards.map((cardId, index) => (
                    <KanbanCard
                      key={cardId}
                      cardId={cardId}
                      index={index}
                      listId={listId}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            {addingCard ? (
              <AddCard
                listId={listId}
                onCancel={() => setAddingCard(false)}
              />
            ) : (
              <button
                onClick={() => setAddingCard(true)}
                className="w-full p-2 text-gray-600 hover:bg-gray-200 text-left transition-colors"
              >
                + Add a card
              </button>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanList;