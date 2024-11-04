import TextareaAutosize from "react-textarea-autosize";

interface CardEditorProps {
  text: string;
  onSave: (text: string) => void;
  onCancel: () => void;
  onChange: (value: string) => void;
  onDelete?: () => void;
}

const CardEditor = ({ text, onSave, onCancel, onChange, onDelete }: CardEditorProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSave(text);
    }
  };

  return (
    <div className="p-2">
      <TextareaAutosize
        autoFocus
        value={text}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter card text..."
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onSave(text)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ✕
        </button>
        {onDelete && (
          <button
            onClick={onDelete}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default CardEditor;