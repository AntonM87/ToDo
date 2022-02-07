import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Task from "./layout/Task";
import Filters from "./layout/Filters";
import Counters from "./layout/Counters";
import "./App.scss";

function App() {
  const todoStorage = JSON.parse(localStorage.getItem("todos")) || [];
  const [todos, setToDos] = useState(todoStorage);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todos);
  });

  const addItem = (e) => {
    if (!validation(e.target[0].value)) {
      e.target.value = "";
      alert("Не валидное задание");
      e.preventDefault();
      return;
    }

    setToDos([
      { id: nanoid(), text: e.target[0].value, complited: false },
      ...todos,
    ]);
    e.target[0].value = "";
    e.preventDefault();
  };

  const complitHandler = (index, value) => {
    todos[index].complited = value || !todos[index].complited;
    setToDos([...todos]);
  };

  const deletItem = async (taskId) => {
    setToDos([...(await todos.filter(({ id }) => id != taskId))]);
  };

  const editItem = (idTask, text) => {
    setToDos([...(todos.find(({ id }) => id === idTask).text = text)]);
  };

  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  const unfinishedFilter = (todos) =>
    todos.filter(({ complited }) => !complited);

  const finishedFilter = (todos) => todos.filter(({ complited }) => complited);

  const filteredTodos = () => {
    let result;
    switch (filter) {
      case "unfinished":
        result = unfinishedFilter(todos);
        break;
      case "finished":
        result = finishedFilter(todos);
        break;
      default:
        result = todos;
        break;
    }
    return result;
  };

  const taskList = filteredTodos().map(({ id, text, complited }, index) => (
    <Task
      id={id}
      key={id}
      text={text}
      index={index}
      complitedStatus={complited}
      deletItem={deletItem}
      editItem={editItem}
      complitHandler={complitHandler}
    />
  ));

  return (
    <div className="main-container">
      <h1>Какие планы на сегодня?</h1>
      <form action="#" onSubmit={addItem}>
        <input name="todo-input" type="text" placeholder="Чем займемся?" />
        <button type="submit">Добавить</button>
      </form>
      <Filters filterHandler={filterHandler} />
      <Counters todos={todos} />
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
