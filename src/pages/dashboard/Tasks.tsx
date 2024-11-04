import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { moveList } from "@/store/boardSlice";
import { moveCard } from "@/store/listsSlice";
import KanbanList from "@/components/dashboard/kanban/KanbanList";
import AddList from "@/components/dashboard/kanban/AddList";
import { useState } from "react";

const Tasks = () => {
  const [addingList, setAddingList] = useState(false);
  const board = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

  const handleDragEnd = (result: any) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "COLUMN") {
      if (source.index !== destination.index) {
        dispatch(moveList({
          oldListIndex: source.index,
          newListIndex: destination.index
        }));
      }
      return;
    }

    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      dispatch(moveCard({
        sourceListId: source.droppableId,
        destListId: destination.droppableId,
        oldCardIndex: source.index,
        newCardIndex: destination.index
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#4BBF6B] p-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div 
              ref={provided.innerRef}
              className="flex overflow-x-auto"
            >
              {board.lists.map((listId, index) => (
                <KanbanList key={listId} listId={listId} index={index} />
              ))}
              {provided.placeholder}

              <div className="flex-shrink-0 w-72 mx-2">
                {addingList ? (
                  <AddList onCancel={() => setAddingList(false)} />
                ) : (
                  <button
                    onClick={() => setAddingList(true)}
                    className="w-full bg-white/20 hover:bg-white/30 text-white rounded-lg p-2 flex items-center justify-center transition-colors"
                  >
                    <span className="mr-1">+</span> Add a list
                  </button>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Tasks;