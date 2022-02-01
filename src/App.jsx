import { useState, useEffect } from "react";
import Task from "./layout/Task";
import Modal from "./layout/Modal";
import "./App.scss";

function App() {
  const todoStorage = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setToDos] = useState(todoStorage);
  const [modal, setModal] = useState(false);

  const deleteTask = async (taskId) => {
    const filteredTodos = await todos.filter(({ id }) => id !== taskId);
    setToDos(filteredTodos);
  };

  const validation = (value) => {
    value === "" ? setModal(true) : setModal(false);
    return value;
  };

  const submit = (e) => {
    e.preventDefault();

    // if (console.log(findCopy(todos, e.target[0].value))) {
    //   setModal(true);
    //   e.stopPropagation();
    // }

    setToDos([
      {
        id: Date.now(),
        text: validation(e.target[0].value),
        complitedTask: false,
      },
      ...todos,
    ]);
    e.target[0].value = "";
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  const createList = todos.map(({ id, text, complitedTask }, index) => {
    return (
      <Task
        todos={todos}
        setToDos={setToDos}
        saveChange={saveChange}
        deleteTask={deleteTask}
        index={index}
        id={Date.now()}
        text={text}
        complitedStatus={complitedTask}
        key={id}
      />
    );
  });

  function saveChange(index, text) {
    todos[index] = text;
    setToDos([...todos]);
  }

  return (
    <div className="main-container">
      {modal ? <Modal /> : null}
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
      <div className="todo-container">{createList}</div>
    </div>
  );
}
export default App;

const findCopy = (arr, value) => {
  return arr.find(
    ({ id, text, complitedTask }) => value.toLowerCase() === text.toLowerCase()
  );
};
