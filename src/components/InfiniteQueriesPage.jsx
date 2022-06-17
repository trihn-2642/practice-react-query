import { Fragment } from "react";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { URL } from "./../constant/index";

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`${URL}/colors?_limit=2&_page=${pageParam}`);
};

export default function InfiniteQueriesPage() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery("colors InfiniteQuery", fetchColors, {
    getNextPageParam: (lastPage, pages) => { 
        console.log(lastPage.nextCursor)
        return lastPage.nextCursor},
  });
  console.log("data", data);
  console.log("hasNextPage", hasNextPage);
  console.log("isFetching", isFetching);
  console.log("isFetchingNextPage", isFetchingNextPage);
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
           {isFetchingNextPage
             ? 'Loading more...'
             : hasNextPage
             ? 'Load More'
             : 'Nothing more to load'}
         </button>
       </div>
       <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </div>
  );
}
