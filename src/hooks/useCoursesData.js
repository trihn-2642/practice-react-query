import { useQuery } from "react-query";
import { fetchCourses } from "./../api/courseAPI";

export const useCoursesData = (onSuccess, onError) => {
  return useQuery("courses", fetchCourses, {
    onSuccess,
    onError,
    select: (data) => {
      return data?.data.map((d) => `${d.name} - ${d.coin}`);
    },
  });
};
