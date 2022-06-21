import { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import { toast } from "react-toastify";
import { request } from "./../utils/axios-utils";

const fetchColors = ({ pageParam = 1 }) => {
  return request({ url: "/colors", params: { _limit: 2, _page: pageParam } });
};

export default function InfiniteQueriesPage() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery("colors InfiniteQuery", fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      return pages.length < 4 ? pages.length + 1 : undefined;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    toast.error(error.message, { autoClose: 2000 });
    return;
  }

  return (
    <div>
      <h5>Infinite Queries Page</h5>
      <ul>
        {data?.pages.map(({ data }, idx) => (
          <Fragment key={idx}>
            {data.map((color) => (
              <li key={color.id}>{color.label}</li>
            ))}
          </Fragment>
        ))}
      </ul>
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {hasNextPage ? "Load More" : "Nothing more to load"}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
}
