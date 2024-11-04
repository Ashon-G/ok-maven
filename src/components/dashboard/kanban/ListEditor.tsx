import TextareaAutosize from "react-textarea-autosize";

interface ListEditorProps {
  title: string;
  onSave: (title: string) => void;
  onCancel: () => void;
  onChange: (value: string) => void;
  onDelete?: () => void;
}

const ListEditor = ({ title, onSave, onCancel, onChange, onDelete }: ListEditorProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSave(title);
    }
  };

  return (
    <div className="flex items-center">
      <TextareaAutosize
        autoFocus
        value={title}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter list title..."
      />
      <div className="flex gap-2 ml-2">
        <button
          onClick={() => onSave(title)}
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

export default ListEditor;