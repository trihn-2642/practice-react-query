import { useQuery } from "react-query";
import axios from "axios";
import { toast } from "react-toastify";

function CoursesPage() {
  const fetchCourses = () => {
    return axios.get("http://localhost:4000/courses");
  };

  const onSuccess = (data) => {
    toast.success("called data success", { autoClose: 1000 });
    console.log(data); //data cũng thay đổi theo select
  };

  const onError = (error) => {
    toast.error(error.message, { autoClose: 2000 });
  };

  const { isLoading, data } = useQuery(
    "courses",
    fetchCourses,
    {
      onSuccess,
      onError,
      select: (data) => {
          return data?.data.map(d => `${d.name} - ${d.coin}`)
      }
    }
  );

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
