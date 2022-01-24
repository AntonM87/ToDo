import { useState } from "react";

function Task(props) {
  const { todos, setToDos, index, text, deletTask } = props;
  const [editMode, setEditMode] = useState(true);
  const [inputValue, setInputValue] = useState(text);
  const [complited, setComplit] = useState(false);

  function task() {
    let className = complited ? "complited" : "";
    return (
      <div
        onClick={() => setComplit(!complited)}
        className={`todo ${className}`}
      >
        <div>
          <p>{inputValue}</p>
        </div>
        <div>
          <i
            onClick={() => {
              setComplit(false);
              deletTask(inputValue);
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
  }
  function taskEdit() {
    return (
      <form
        action="#"
        onSubmit={(e) => {
          setInputValue(e.target[0].value);

          const arr = todos;
          arr[index].text = inputValue;
          setToDos([...arr]);

          setEditMode(!editMode);
          e.preventDefault();
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
  }
  return <>{editMode ? task() : taskEdit()}</>;
}
export default Task;
