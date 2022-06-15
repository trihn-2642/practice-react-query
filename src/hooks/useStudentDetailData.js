import { useQuery } from "react-query";
import { fetchStudent } from "./../api/studentAPI";

export const useStudentDetailData = (studentId) => {
  return useQuery(["students", studentId], () => fetchStudent(studentId), {
    select: (data) => `${data?.data.name} - ${data?.data.alterEgo}` 
  });
};
