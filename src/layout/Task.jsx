import { useState } from "react";

function Task({
  id,
  text,
  completedStatus,
  todos,
  index,
  deleteItem,
  editItem,
  completedHandler,
  dragStartHandler,
  dragEndHandler,
  dragOverHandler,
  dropHandler,
  currentTask,
  setCurrentTask,
}) {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(text);

   console.log('completedStatus', completedStatus);

  const className = completedStatus ? "completed" : "";

  const editTask = () => {
    return (
      <form
        onSubmit={(e) => {
          editItem(id, e.target[0].value);
          setEditMode(!editMode);
          completedHandler(id);
          e.preventDefault();
        }}
      >
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">
          <i className="far fa-edit"></i>
        </button>
      </form>
    );
  };

  const showTask = () => {
    return (
      <div
        onDragStart={(e) => dragStartHandler(e, index)}
        onDragLeave={(e) => dragEndHandler(e)}
        onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, index)}
        draggable={true}
        onClick={() => {
          completedHandler(id);
        }}
        className={`todo ${className}`}
      >
        <div>
          <p>{text}</p>
        </div>
        <div>
          <i
            onClick={(e) => {
              deleteItem(id);
              e.stopPropagation();
            }}
            className="far fa-trash-alt"
          />
          <i
            onClick={() => {
              setEditMode(!editMode);
            }}
            className="far fa-edit"
          ></i>
        </div>
      </div>
    );
  };

  return <>{editMode ? editTask() : showTask()}</>;
}
export default Task;
