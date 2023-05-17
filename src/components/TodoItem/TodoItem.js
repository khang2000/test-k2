import { useState, useRef, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { RiEditLine } from "react-icons/ri";

export default function TodoItem({
  id,
  title,
  isDone,
  onItemChecked,
  onItemRemoved,
  onUpdateTodoItem,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [todoItemValue, setTodoItemValue] = useState(title);
  const todoInputRef = useRef(null);

  const onUpdateTitle = (e) => {
    setTodoItemValue(e.target.value);
  };

  //   Xử lý cái việc update lại todoitem
  const onUpdateTodoItemHandler = () => {
    onUpdateTodoItem(todoItemValue, id);
    setIsEditing(false);
  };

  const onChangeToEditMode = () => {
    setIsEditing(true);
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      onUpdateTodoItemHandler();
    }
  };

  useEffect(() => {
    if (isEditing && todoInputRef) {
      todoInputRef && todoInputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className="item">
      <div className="input-left">
        <div className="flex items-center h-5">
          <input
            checked={isDone}
            onChange={() => onItemChecked(id)}
            id={id}
            type="checkbox"
            className="border-gray-200 rounded-full accent-green-400 h-4 w-4"
          />
        </div>

        {isEditing ? (
          <input
            value={todoItemValue}
            name={title}
            className="ml-3.5 block w-full text-gray-600"
            onChange={onUpdateTitle}
            onBlur={onUpdateTodoItemHandler}
            onKeyPress={onKeyDownHandler}
            ref={todoInputRef}
          />
        ) : (
          <label
            htmlFor={id}
            className={`ml-3.5 block w-full text-gray-600 ${
              isDone && "line-through opacity-80"
            }`}
          >
            {title}
          </label>
        )}
      </div>
      <div className="button-right">
        <button className="item-button" onClick={onChangeToEditMode}>
          <RiEditLine fontSize={15} />
        </button>
        <button className="item-button" onClick={() => onItemRemoved(id)}>
          <FaTrashAlt fontSize={15} />
        </button>
      </div>
    </div>
  );
}
