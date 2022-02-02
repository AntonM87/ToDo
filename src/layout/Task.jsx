import { useState } from "react";

function Task({ id, text, complitedStatus, index, deletItem, editItem }) {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(text);
  const [complited, setComplit] = useState(complitedStatus);

  const className = complited ? "complited" : null;

  const editTask = () => {
    return (
      <form
        onSubmit={(e) => {
          editItem(index, e.target[0].value);
          setEditMode(!editMode);
          setComplit(false);
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
        onClick={() => {
          setComplit(!complited);
        }}
        className={`todo ${className}`}
      >
        <div>
          <p>{text}</p>
        </div>
        <div>
          <i onClick={() => deletItem(id)} className="far fa-trash-alt" />
          <i
            onClick={() => {
              setEditMode(!editMode);
              console.log(editMode);
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
