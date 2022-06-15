import { useQuery, useQueries } from "react-query";
import { useUserByEmail } from "./../hooks/useUsersData";
import { fetchStudent } from "./../api/studentAPI";
import { fetchCourse } from "./../api/courseAPI";

export default function DependentQueriesPage() {
  const email = "tri123456789@gmail.com";
  const { data } = useUserByEmail(email);

  const studentId = data?.data.student_id;
  const coursesIds = data?.data.course_ids || [];

  const { data: student } = useQuery(
    ["students", studentId],
    () => fetchStudent(studentId),
    {
      enabled: !!studentId,
    }
  );
  const courses = useQueries(
    coursesIds?.map((courseId) => ({
      queryKey: ["coursers", courseId],
      queryFn: () => fetchCourse(courseId),
      enabled: !!coursesIds,
    }))
  );

  return (
    <div>
      <h4>Dependent Queries Page</h4>
      <h5>email: {data?.data.id}</h5>
      <p>name: {student?.data.name}</p>
      <ul>
        {courses.map(({ data }, index) => (
          <li key={index}>
            name: {data?.data.name} - coin: {data?.data.coin}
          </li>
        ))}
        <li>
          sum coin:{" "}
          {courses.reduce((prev, current) => prev + current.data?.data.coin, 0)}
        </li>
      </ul>
    </div>
  );
}
