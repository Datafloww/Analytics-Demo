
import { useState } from "react";
import { Button } from "./ui/button";
import { Trash2, Edit, Check, X } from "lucide-react";
import { track } from "../utils/analytics";

const TodoItem = ({ id, text, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
    track('todo_edit_start', { todo_id: id });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(text);
    track('todo_edit_cancel', { todo_id: id });
  };

  const handleSave = () => {
    if (editedText.trim()) {
      onEdit(id, editedText);
      setIsEditing(false);
      track('todo_edit_save', { 
        todo_id: id,
        character_count: editedText.length
      });
    }
  };

  const handleDeleteClick = () => {
    onDelete(id);
    track('todo_delete', { todo_id: id });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-3">
      {isEditing ? (
        <div className="flex flex-1 items-center">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-2 border rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleSave}
            className="mr-1 text-green-600 hover:text-green-800 hover:bg-green-100"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleCancel}
            className="text-red-600 hover:text-red-800 hover:bg-red-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <>
          <p className="flex-1 text-gray-800">{text}</p>
          <div className="flex space-x-2">
            <Button 
              size="sm"
              variant="ghost" 
              onClick={handleEdit}
              className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="sm"
              variant="ghost" 
              onClick={handleDeleteClick}
              className="text-red-600 hover:text-red-800 hover:bg-red-100"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
