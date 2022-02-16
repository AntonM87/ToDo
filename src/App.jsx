import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Task from "./layout/Task";
import Filters from "./layout/Filters";
import Counters from "./layout/Counters";
import "./App.scss";

function App() {
  const todoStorage = JSON.parse(localStorage.getItem('todos')) || [];
  const [todos, setToDos] = useState(todoStorage);
  const [filter, setFilter] = useState('all');
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  });

  const addItem = (e) => {
    if (validation(e.target[0].value)) {
      setToDos([
        { id: nanoid(), text: e.target[0].value, completed: false },
        ...todos,
      ]);
    } else {
      alert('Не валидное задание');
    }

    e.target[0].value = '';
    e.preventDefault();
  };

  const completedHandler = (idTask) => {
    const task = todos.find(({ id }) => id === idTask);
    task.completed = !task.completed;
    setToDos([...todos]);
  };

  const deleteItem = (taskId) => {
    setToDos([...( todos.filter(({ id }) => id !== taskId))]);
  };

  const editItem = (idTask, text) => {
    setToDos([...(todos.find(({ id }) => id === idTask).text = text)]);
  };

  const filterHandler = (e) => {
    setFilter(e.target.value);
  };

  const unfinishedFilter = (todos) =>
    todos.filter(({ completed }) => !completed);

  const finishedFilter = (todos) => todos.filter(({ completed }) => completed);

  const filteredTodos = () => {
    let result;
    switch (filter) {
      case 'unfinished':
        result = unfinishedFilter(todos);
        break;
      case 'finished':
        result = finishedFilter(todos);
        break;
      default:
        result = todos;
        break;
    }
    return result;
  };

  const dragStartHandler = (e, index) => {
    e.target.classList.add('drop-start');
    setCurrentTask(index);
  };
  const dragEndHandler = (e) => {
    e.target.classList.add('drop-start');
  };
  const dragOverHandler = (e) => {
    e.target.classList.add('drop-end');
    e.preventDefault();
  };
  const dropHandler = (e, index) => {
    e.target.classList.add('drop-start');

    todos.forEach((todo, i) => {
      if (index === i) {
        const startTodo = todos[currentTask];
        const endTodo = todos[i];
        todos[currentTask] = endTodo;
        todos[i] = startTodo;
        setToDos([...todos]);
      }
      return todo;
    });
    e.preventDefault();
  };

  const taskList = filteredTodos().map(({ id, text, completed }, index) => (
    <Task
      id={id}
      key={id}
      text={text}
      todos={todos}
      index={index}
      completedStatus={completed}
      deleteItem={deleteItem}
      editItem={editItem}
      completedHandler={completedHandler}
      dragStartHandler={dragStartHandler}
      dragEndHandler={dragEndHandler}
      dragOverHandler={dragOverHandler}
      dropHandler={dropHandler}
      currentTask={currentTask}
      setCurrentTask={setCurrentTask}
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
  if (typeof(text) === 'string' && text.length > 3) {
    return text;
  }
  return false;
};
