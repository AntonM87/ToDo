import "../Styles/Counters.scss";
export default function Counters({ todos }) {
  let completedTasks = 0;
  todos.forEach(({ completed }) => (completed ? completedTasks++ : null));

  return (
    <div className="counters">
      <div>
        <p>Всего: {todos.length}</p>
      </div>
      <div>
        <p>Выполнено: {completedTasks}</p>
      </div>
    </div>
  );
}
