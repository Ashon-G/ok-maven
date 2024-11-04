import { useState } from "react";
import { useDispatch } from "react-redux";
import shortid from "shortid";
import { addList } from "@/store/listsSlice";
import ListEditor from "./ListEditor";

interface AddListProps {
  onCancel: () => void;
}

const AddList = ({ onCancel }: AddListProps) => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleSave = () => {
    if (title.trim()) {
      const listId = shortid.generate();
      dispatch(addList({ listId, listTitle: title }));
      onCancel();
    }
  };

  return (
    <div className="bg-[#DFE3E6] rounded-lg p-2">
      <ListEditor
        title={title}
        onSave={handleSave}
        onCancel={onCancel}
        onChange={setTitle}
      />
    </div>
  );
};

export default AddList;