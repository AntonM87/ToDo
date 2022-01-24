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

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  return (
    <div className="main-container">
      <h1>Какие планы на сегодня?</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.target[0].value;
          e.target[0].value = "";
          const arr = todos;
          arr.push({ id: Math.random(), text: input });
          setToDos([...arr]);
        }}
        action="#"
      >
        <input name="todo-input" type="text" placeholder="Чем займемся?" />
        <button type="submit">Добавить</button>
      </form>
      <div className="todo-container">
        {console.log(todos)}
        {todos.map(({ id, text },i) => {
          return (
            <Task
              todos={todos}
              setToDos={setToDos}
              deletTask={deletTask}
              index={i}
              key={id}
              text={text}
            />
          );
        })}
      </div>
    </div>
  );
}
export default App;
