import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

function RQStudentsPage() {
  const fetchStudents = () => {
    return axios.get("http://localhost:4000/students");
  };

  const onSuccess = (data) => {
    toast.success("called data success", { autoClose: 1000 });
    console.log(data);
  };

  const onError = (error) => {
    toast.error(error.message, { autoClose: 2000 });
  };

  const { isLoading, isError, data, error, isFetching, refetch } = useQuery(
    "students",
    fetchStudents,
    {
      onSuccess,
      onError,
    }
  );

  if (isLoading || isFetching) return <div>Loading...</div>;
  if (isError) {
    toast.error(error.message, { autoClose: 2000 });
    return;
  }

  return (
    <>
      <h4>RQ Students Page</h4>
      {data?.data.map((student) => (
        <div key={student.id}>{student.alterEgo}</div>
      ))}
      <button onClick={refetch}>Refetch Data</button>
    </>
  );
}

export default RQStudentsPage;
