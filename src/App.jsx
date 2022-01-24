import { useState, useEffect } from "react";
import Task from "./layout/Task";
import "./App.css";

function App() {
  const [todos, setToDos] = useState(JSON.parse(localStorage.getItem("todos")));

  const deletTask = (task) => {
    const state = todos.filter(({ text }) => {
      return text !== task;
    });
    setToDos(state);
  };

  const submit = (e) => {
    e.preventDefault();
    const input = e.target[0].value;
    e.target[0].value = "";
    const arr = todos;
    arr.push({ id: Math.random(), text: input, complitedTask: false });
    setToDos([...arr]);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  const createList = () => {
    console.log(todos);
    const list = todos.map(({ id, text, complitedTask }, i) => {
      return (
        <Task
          todos={todos}
          setToDos={setToDos}
          deletTask={deletTask}
          index={i}
          key={id}
          text={text}
          complitedStatus={complitedTask}
        />
      );
    });
    return list;
  };

  return (
    <div className="main-container">
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
