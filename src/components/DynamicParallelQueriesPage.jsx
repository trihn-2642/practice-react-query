import { useEffect, useState } from "react";
import { useQueries } from "react-query";
import { toast } from "react-toastify";
import { useStudentsData } from "./../hooks/useStudentsData";
import { fetchStudent } from "./../api/studentAPI";

export default function DynamicParallelQueriesPage() {
  const [studentIds, setStudentIds] = useState([]);

  const onSuccess = (data) => {
    toast.success("called data students success", { autoClose: 1000 });
  };

  const onError = (error) => {
    toast.error(error.message, { autoClose: 2000 });
  };

  const { data: students } = useStudentsData(onSuccess, onError);

  // trả về 1 mảng các object.
  const queryResults = useQueries(
    studentIds.map((id) => ({
      queryKey: ["students", id],
      queryFn: () => fetchStudent(id),
    }))
  );

  useEffect(() => {
    if (students) {
      const studentIDs = students.data.map((student) => student.id);
      setStudentIds(studentIDs);
    }
  }, [students]);

  return (
    <div>
      <h4>Dynamic Parallel Queries Page</h4>
      <ul>
        {queryResults.map(({ data }) => (
          <li key={data?.data.id}>{data?.data.name}</li>
        ))}
      </ul>
    </div>
  );
}
