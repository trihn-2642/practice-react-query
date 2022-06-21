import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { request } from "./../utils/axios-utils";

export default function StudentsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    request({ url: "/students" })
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (error) {
    toast.error(error);
    return;
  }

  return (
    <>
      {isLoading ? (
        <div>Loading data...</div>
      ) : (
        <>
          <h4>Students Page</h4>
          {data.map((student) => (
            <div key={student.id}>{student.name}</div>
          ))}
        </>
      )}
    </>
  );
}
