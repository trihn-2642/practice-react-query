import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useStudentsData, useAddStudent } from "./../hooks/useStudentsData";

function RQStudentsPage() {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");
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
  const { mutateAsync, isSuccess, error: addError, reset } = useAddStudent();

  const redirectStudentDetail = (studentId) => {
    navigate(`${location.pathname}/${studentId}`);
  };

  const handleSubmit = async () => {
    if (!name && !alterEgo) return;

    try {
      await mutateAsync({ name, alterEgo });
      toast.success("add student success", { autoClose: 1000 });
      // refetch(); // đã dùng invalidateQueries thay thế.
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  if (isLoading || isFetching) return <div>Loading...</div>;
  if (isError) {
    toast.error(error.message, { autoClose: 2000 });
    return;
  }

  return (
    <>
      <h4>RQ Students Page</h4>
      <div>
        <h5>Add Student Form</h5>
        <p>{isSuccess ? "add student success" : ""}</p>
        <div style={{ marginBottom: "10px", display: "flex" }}>
          <label htmlFor="name" style={{ width: "80px" }}>
            Name:{" "}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px", display: "flex" }}>
          <label htmlFor="alterEgo" style={{ width: "80px" }}>
            alterEgo:{" "}
          </label>
          <input
            type="text"
            id="alterEgo"
            name="alterEgo"
            onChange={(e) => setAlterEgo(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          {addError && <h5 onClick={() => reset()}>{addError}</h5>}
          <button
            type="button"
            style={{ marginLeft: "80px" }}
            onClick={() => handleSubmit()}
          >
            Add Student
          </button>
        </div>
      </div>
      <hr />
      {data?.data.map((student) => (
        <div key={student.id} onClick={() => redirectStudentDetail(student.id)}>
          {student.name} - {student.alterEgo}
        </div>
      ))}
      <button onClick={refetch}>Refetch Data</button>
    </>
  );
}

export default RQStudentsPage;
