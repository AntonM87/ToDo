import { useState } from "react";
import "./App.css";

function App() {
  const [editMode, setEditMode] = useState(false);
  const [initial, setInitial] = useState(false);
  const [todos, setToDos] = useState([
    { id: 1, text: "hello world" },
    { id: 2, text: "hello world" },
    { id: 3, text: "hello world" },
    { id: 4, text: "hello world" },
  ]);

  function todo() {
    return todos.map(({ id, text }) => {
      return (
        <div key={id} className="todo">
          <div>
            <p>{text}</p>
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.target[0].value;
          const arr = todos;
          arr.push({ id: todos.length + 1, text: input });
          setToDos(arr);
        }}
      >
        <input name="todo-input" type="text" placeholder="Чем займемся?" />
        <button type="submit">Добавить</button>
      </form>
      <div className="todo-container">{todo()}</div>
    </div>
  );
}
export default App;
