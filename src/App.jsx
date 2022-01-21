import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [editMode, setEditMode] = useState(false);
  const [initial, setInitial] = useState(false);
  const inputRef = useRef(null);
  const [todos, editToDos] = useState([]);

  function todo() {
    return todos.map((str, i) => {
      return (
        <div key={i} className="todo">
          <div>
            <p>{str}</p>
          </div>
          <div>
            <i className="far fa-trash-alt" />
            <i
              onClick={() => setEditMode(!editMode)}
              className="far fa-edit"
            ></i>
          </div>
        </div>
      );
    });
  }

  function editTodo() {
    return (
      <form>
        <input type="text" />
        <button>
          <i onClick={() => setEditMode(!editMode)} className="far fa-edit"></i>
        </button>
      </form>
    );
  }

  return (
    <div className="main-container">
      <h1>Какие планы на сегодня?</h1>
      {/* <i onClick={() => setInitial(true)} className="fas fa-plus-square"></i> */}
      <form>
        <input ref={inputRef} type="text" placeholder="Чем займемся?" />
        <button
          onClick={(e) => {
            let arr = todos;
            arr.push(inputRef.current.value);
            console.log(arr);
            editToDos(arr);
            e.preventDefault();
          }}
        >
          Добавить
        </button>
      </form>
      <div className="todo-container">{todo()}</div>
    </div>
  );
}
export default App;
