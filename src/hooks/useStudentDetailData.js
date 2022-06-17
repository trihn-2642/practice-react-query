import { useQuery, useQueryClient } from "react-query";
import { fetchStudent } from "./../api/studentAPI";

export const useStudentDetailData = (studentId) => {
  return useQuery(["student", studentId], () => fetchStudent(studentId), {
    select: (data) => `${data?.data.name} - ${data?.data.alterEgo}`,
  });
};

// Initial Query
export const useStudentDataByInitialQuery = (studentId) => {
  const queryClient = useQueryClient();

  return useQuery(["studentByInitialQuery", studentId], () => fetchStudent(studentId), {
    initialData: () =>
      queryClient
        .getQueryData("students")
        ?.data?.find((student) => student.studentId === parseInt(studentId)) || undefined,
    initialDataUpdatedAt: () =>
      queryClient.getQueryState("students")?.dataUpdatedAt,
  });
};
