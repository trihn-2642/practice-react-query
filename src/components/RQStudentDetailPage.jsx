import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useStudentDetailData,
  useStudentDataByInitialQuery,
} from "./../hooks/useStudentDetailData";

export default function RQStudentsDetailPage() {
  const { studentId } = useParams();
  const { data, error, isLoading, isError, isFetching } =
    useStudentDetailData(studentId);
  const { data: student } = useStudentDataByInitialQuery(studentId);

  if (isLoading || isFetching) return <div>Loading...</div>;
  if (isError) {
    toast.error(error.message, { autoClose: 2000 });
    return;
  }

  return (
    <>
      <h4> Rq Student Detail</h4>
      <div>{data}</div>
      <h5>Use Initial Query</h5>
      <div>
        {student?.data.name} - {student?.data.alterEgo}
      </div>
    </>
  );
}
