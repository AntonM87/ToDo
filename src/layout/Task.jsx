import { useState } from "react";

function Task({
  todos,
  setToDos,
  id,
  index,
  text,
  deleteTask,
  complitedStatus,
  saveChange,
}) {
  const [editMode, setEditMode] = useState(true);
  const [inputValue, setInputValue] = useState(text);
  const [complited, setComplit] = useState(complitedStatus);

  function task() {
    const className = complited ? "complited" : null;

    return (
      <div
        onClick={() => {
          todos[index].complitedTask = !complited;
          setToDos([...todos]);
          setComplit(!complited);
        }}
        className={`todo ${className}`}
      >
        <div>
          <p>{inputValue}</p>
        </div>
        <div>
          <i
            onClick={() => {
              deleteTask(id, todos, setToDos);
            }}
            className="far fa-trash-alt"
          />
          <i
            onClick={() => {
              setEditMode(!editMode);
              setComplit(false);
            }}
            className="far fa-edit"
          ></i>
        </div>
      </div>
    );
  }
  const taskEdit = () => {
    return (
      <form
        action="#"
        onSubmit={(e) => {
          submit(e);
        }}
      >
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button onClick={() => setComplit(false)} type="submit">
          <i className="far fa-edit"></i>
        </button>
      </form>
    );
  };

  const submit = async (e) => {
    e.preventDefault();

    setInputValue(e.target[0].value);
    console.log("inputValue", inputValue);

    // todos[index].text = inputValue;
    // setToDos([...todos]);

    saveChange(index, text, todos, setToDos);
    setEditMode(false);
  };

  return <>{editMode ? task() : taskEdit()}</>;
}
export default Task;
