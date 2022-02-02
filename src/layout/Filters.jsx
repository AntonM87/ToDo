import "../Styles/Filters.scss";
function Filters({ filterHandler }) {
  return (
    <>
      <div className="filters">
        <form action="#" onChange={filterHandler}>
          <label>
            <input
              defaultChecked={true}
              type="radio"
              name="filter"
              value="all"
            />
            Все
          </label>
          <label>
            <input type="radio" name="filter" value="unfinished" />
            Незаконченные
          </label>
          <label>
            <input type="radio" name="filter" value="finished" />
            Законченные
          </label>
        </form>
      </div>
    </>
  );
}

export default Filters;
