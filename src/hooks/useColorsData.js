import { useQuery } from "react-query";
import { fetchColors } from "./../api/colorAPI";

export const useColorsData = (limit, page) => {
  return useQuery(["colors", limit, page], () => fetchColors(limit, page), {
    keepPreviousData: true,
    cacheTime: 60000,
  });
};
