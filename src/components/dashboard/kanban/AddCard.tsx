import { useState } from "react";
import { useDispatch } from "react-redux";
import shortid from "shortid";
import { addCard } from "@/store/cardsSlice";
import { addCardToList } from "@/store/listsSlice";
import CardEditor from "./CardEditor";

interface AddCardProps {
  listId: string;
  onCancel: () => void;
}

const AddCard = ({ listId, onCancel }: AddCardProps) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleSave = () => {
    if (text.trim()) {
      const cardId = shortid.generate();
      dispatch(addCard({ cardId, cardText: text }));
      dispatch(addCardToList({ listId, cardId }));
      onCancel();
    }
  };

  return (
    <CardEditor
      text={text}
      onSave={handleSave}
      onCancel={onCancel}
      onChange={setText}
    />
  );
};

export default AddCard;