import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchStudents, addStudent } from "./../api/studentAPI";

export const useStudentsData = (onSuccess, onError) => {
  return useQuery("students", fetchStudents, {
    onSuccess,
    onError,
  });
};

export const useAddStudent = () => {
  const queryClient = useQueryClient();
  return useMutation(addStudent, {
    //Optimistic
    onMutate: async (variables) => {
      await queryClient.cancelQueries("students");
      const oldStudentData = queryClient.getQueryData("students");
      queryClient.setQueryData("students", (oldStudentData) => ({
        data: [...oldStudentData.data, variables],
      }));

      //return context
      return {
        oldStudentData,
      };
    },
    onSuccess: (data, _variables, _context) => {
      // queryClient.invalidateQueries("students")
      queryClient.setQueryData("students", (oldStudentData) => ({
        data: [...oldStudentData.data, data.data],
      }));
    },
    onError: (_error, __variables, context) => {
      queryClient.setQueryData("students", context.oldStudentData);
    },
    onSettled: () => queryClient.invalidateQueries("students"),
    retry: 3,
  });
};
