import { useState, useEffect } from "react";
import Task from "./layout/Task";
import "./App.scss";

function App() {
  const todoStorage = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setToDos] = useState(todoStorage);
  // const [todos, setToDos] = useState([]);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  });

  const addItem = (e) => {
    if (!validation(e.target[0].value)) {
      e.target.value = "";
      alert("Не валидное задание");
      e.preventDefault();
      return;
    }

    setToDos([
      { id: Date.now(), text: e.target[0].value, complited: false },
      ...todos,
    ]);
    e.target[0].value = "";
    e.preventDefault();
  };

  const deletItem = (taskId) => {
    setToDos([...todos.filter(({ id }) => id != taskId)]);
  };

  const editItem = (index, text) => {
    todos[index].text = text;
    setToDos([...todos]);
  };

  const taskList = todos.map(({ id, text, complited }, index) => (
    <Task
      id={id}
      key={id}
      text={text}
      index={index}
      complitedStatus={complited}
      deletItem={deletItem}
      editItem={editItem}
    />
  ));

  return (
    <div className="main-container">
      <h1>Какие планы на сегодня?</h1>
      <form action="#" onSubmit={addItem}>
        <input name="todo-input" type="text" placeholder="Чем займемся?" />
        <button type="submit">Добавить</button>
      </form>
      <div className="todo-container">{taskList}</div>
    </div>
  );
}
export default App;

const validation = (text) => {
  if (text !== "" && text.length > 3) {
    return text;
  }
  return false;
};
