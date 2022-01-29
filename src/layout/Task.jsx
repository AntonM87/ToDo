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

  // const moveEnd = async (todos, index) => {
  //   const target = await todos[index];
  //   await todos.splice(index, 1);
  //   await todos.push(target);
  //   setToDos([...todos]);
  // };

  console.log("inputValue",inputValue);

  const task = () => {
    const className = complited ? "complited" : "";
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
              deleteTask(id);
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
  };
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

  const submit = (e) => {
    setInputValue(e.target[0].value);
    // todos[index].text = inputValue;
    // setToDos([...todos]);
    saveChange(index, inputValue);
    setEditMode(!editMode);
    e.preventDefault();
  };

  return <>{editMode ? task() : taskEdit()}</>;
}
export default Task;
