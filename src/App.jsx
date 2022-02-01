import { useState, useEffect } from "react";
import Task from "./layout/Task";
import "./App.scss";

function App() {
  const todoStorage = JSON.parse(localStorage.getItem("todos")) || [];
  // const [todos, setToDos] = useState(todoStorage);
  const [todos, setToDos] = useState([]);

  const submit = (e) => {
    e.preventDefault();

    const copy = findCopy(todos, e.target[0].value);
    const message = copy ? "Такое задание уже есть" : null;
    if (message) {
      e.target[0].value = "";
      alert(message);
      return;
    }

    setToDos([
      {
        id: Date.now(),
        text: e.target[0].value,
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
        id={id}
        text={text}
        complitedStatus={complitedTask}
        key={id}
      />
    );
  });

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
      <div className="todo-container">{createList}</div>
    </div>
  );
}
export default App;

const findCopy = (arr, value) => {
  return arr.find(({ text }) => value.toLowerCase() === text.toLowerCase());
};

const deleteTask = (taskId, todos, todoHandler) => {
  const filteredTodos = todos.filter(({ id }) => id !== taskId);
  console.log(filteredTodos);
  todoHandler(filteredTodos);
  console.log("deleteTask");
};

function saveChange(index, text, todos, todosHandler) {
  todos[index] = text;
  todosHandler([...todos]);
}
