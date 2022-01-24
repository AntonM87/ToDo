import { useState } from "react";

function Task(props) {
  const { todos, setToDos, index, text, deletTask, complitedStatus } = props;
  const [editMode, setEditMode] = useState(true);
  const [inputValue, setInputValue] = useState(text);
  const [complited, setComplit] = useState(complitedStatus);

  const task = () => {
    const className = complited ? "complited" : "";
    return (
      <div
        onClick={() => {
          let arr = [];
          arr = todos;
          arr[index].complitedTask = !complited;
          setToDos([...arr]);
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

    const arr = todos;
    arr[index].text = inputValue;
    setToDos([...arr]);
    setEditMode(!editMode);
    e.preventDefault();
  };
  return <>{editMode ? task() : taskEdit()}</>;
}
export default Task;
