import { useQuery } from "react-query";
import { fetchStudents } from "./../api/studentAPI";

export const useStudentsData = (onSuccess, onError) => {
  return useQuery("students", fetchStudents, {
    onSuccess,
    onError,
  });
};
