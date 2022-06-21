import { useColorsData } from "./../hooks/useColorsData";
import { toast } from "react-toastify";
import { useState } from "react";

export default function PaginatedQueriesPage() {
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);

  const totalPage = Math.ceil(10 / limit);

  const { data, isLoading, isFetching, isError, error } = useColorsData(
    limit,
    page
  );

  const onSelectLimit = (event) => {
    const { value } = event.target;
    if (value) {
      setLimit(parseInt(value));
      setPage(1);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    toast.error(error.message, { autoClose: 2000 });
    return;
  }

  return (
    <div>
      <h4>Paginated Queries Page</h4>
      <select onChange={(event) => onSelectLimit(event)}>
        <option value="">Select limit</option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="6">6</option>
        <option value="8">8</option>
        <option value="10">10</option>
      </select>
      <ul>
        {data.data.map((color) => (
          <li key={color.id}>{color.label}</li>
        ))}
      </ul>
      <div>
        <span>
          Current Page: {page} / {totalPage}
        </span>
        <button onClick={() => setPage((old) => old - 1)} disabled={page === 1}>
          Previous Page
        </button>{" "}
        <button
          onClick={() => {
            setPage((old) => old + 1);
          }}
          disabled={page === totalPage}
        >
          Next Page
        </button>
        {isFetching ? <span> Loading...</span> : null}{" "}
      </div>
    </div>
  );
}
