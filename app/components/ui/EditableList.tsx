import React from "react";
import { FaCheck, FaEdit, FaTimes, FaTrashAlt } from "react-icons/fa";

type EditableListProps = {
  items: string[];
  editIndex: number | null;
  editInput: string;
  setEditInput: (value: string) => void;
  handleEdit: (index: number) => void;
  handleDelete: (index: number) => void;
  handleSaveEdit: () => void;
  handleCancelEdit: () => void;
  type: "ingredients" | "steps";
};

const EditableList: React.FC<EditableListProps> = ({
  items,
  editIndex,
  editInput,
  setEditInput,
  handleEdit,
  handleDelete,
  handleSaveEdit,
  handleCancelEdit,
  type,
}) => (
  <ul className={`list-${type === "steps" ? "decimal" : "disc"} ml-5`}>
    {items.map((item, index) => (
      <li
        key={index}
        className="flex items-center justify-between mt-1 border border-gray-300 rounded-md p-2"
      >
        {editIndex === index ? (
          <>
            <input
              type="text"
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-black"
            />
            <button onClick={handleSaveEdit} className="ml-2 text-green-500">
              <FaCheck />
            </button>
            <button onClick={handleCancelEdit} className="ml-2 text-red-500">
              <FaTimes />
            </button>
          </>
        ) : (
          <>
            {item}
            <div>
              <button
                onClick={() => handleEdit(index)}
                className="ml-2 text-blue-500"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="ml-2 text-red-500"
              >
                <FaTrashAlt />
              </button>
            </div>
          </>
        )}
      </li>
    ))}
  </ul>
);

export default EditableList;
