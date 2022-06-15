import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useStudentsData } from "./../hooks/useStudentsData";

function RQStudentsPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const onSuccess = (data) => {
    toast.success("called data students success", { autoClose: 1000 });
    console.log(data);
  };

  const onError = (error) => {
    toast.error(error.message, { autoClose: 2000 });
  };

  const { isLoading, isError, data, error, isFetching, refetch } =
    useStudentsData(onSuccess, onError);

  const redirectStudentDetail = (studentId) => {
    navigate(`${location.pathname}/${studentId}`);
  };

  if (isLoading || isFetching) return <div>Loading...</div>;
  if (isError) {
    toast.error(error.message, { autoClose: 2000 });
    return;
  }

  return (
    <>
      <h4>RQ Students Page</h4>
      {data?.data.map((student) => (
        <div key={student.id} onClick={() => redirectStudentDetail(student.id)}>
          {student.alterEgo}
        </div>
      ))}
      <button onClick={refetch}>Refetch Data</button>
    </>
  );
}

export default RQStudentsPage;
