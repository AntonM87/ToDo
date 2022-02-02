import "../Styles/Counters.scss";
export default function Counters({ todos }) {
  let complitedTasks = 0;
  todos.forEach(({ complited }) => (complited ? complitedTasks++ : null));

  return (
    <div className="counters">
      <div>
        <p>Всего: {todos.length}</p>
      </div>
      <div>
        <p>Выполнено: {complitedTasks}</p>
      </div>
    </div>
  );
}
