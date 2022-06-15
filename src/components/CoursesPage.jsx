import { toast } from "react-toastify";
import { useCoursesData } from "./../hooks/useCoursesData";

function CoursesPage() {
  const onSuccess = (data) => {
    toast.success("called data course success", { autoClose: 1000 });
    console.log(data); //data cũng thay đổi theo select
  };

  const onError = (error) => {
    toast.error(error.message, { autoClose: 2000 });
  };

  const { isLoading, data } = useCoursesData(onSuccess, onError);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h4>Courses Page</h4>
      {data.map((course, index) => (
        <div key={index}>{course}</div>
      ))}
    </>
  );
}

export default CoursesPage;
