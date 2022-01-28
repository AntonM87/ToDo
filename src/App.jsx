import { useState, useEffect } from "react";
import Task from "./layout/Task";
import Modal from "./layout/Modal";
import "./App.css";

function App() {
  const todoStorage = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setToDos] = useState(todoStorage);
  const [modal, setModal] = useState(false);

  const deletTask = async (taskId) => {
    const filteredTodos = await todos.filter(({ id }) => id !== taskId);
    setToDos(filteredTodos);
  };

  const validation = (value) => {
    value === "" ? setModal(true) : setModal(false);
  };

  const submit = (e) => {
    e.preventDefault();
    todos.unshift({
      id: Date.now(),
      text: validation(e.target[0].value),
      complitedTask: false,
    });
    e.target[0].value = "";
    setToDos([...todos]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  const createList = () => {
    const list = todos.map(({ id, text, complitedTask }, i) => {
      return (
        <Task
          todos={todos}
          setToDos={setToDos}
          deletTask={deletTask}
          index={i}
          id={id}
          text={text}
          complitedStatus={complitedTask}
          key={id}
        />
      );
    });
    return list;
  };

  return (
    <div className="main-container">
      {modal ? <Modal/> : null}
      <h1>Какие планы на сегодня?</h1>
      <form
        onSubmit={(e) => {
          submit(e);
        }}
        action="#"
      >
        <input name="todo-input" type="text" placeholder="Чем займемся?" />
        <button type="submit">Добавить</button>
      </form>
      <div className="todo-container">{createList()}</div>
    </div>
  );
}
export default App;
