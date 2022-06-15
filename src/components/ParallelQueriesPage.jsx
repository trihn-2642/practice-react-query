import { toast } from "react-toastify";
import { useStudentsData } from "./../hooks/useStudentsData";
import { useFriendsData } from "./../hooks/useFriendsData";

export default function ParallelQueriesPage() {
  const onSuccess = (data) => {
    const name = data?.request.responseURL.includes("students")
      ? "Students"
      : "Friends";
    toast.success(`called data ${name} success`, { onClose: 1500 });
  };

  const onError = (error) => {
    const name = error?.request.responseURL.includes("students")
      ? "Students"
      : "Friends";
    toast.error(`${name} - ${error.message}`);
  };

  const { data: students, isLoading: isLoadingStudents } = useStudentsData(
    onSuccess,
    onError
  );
  const { data: friends, isLoading: isLoadingFriends } = useFriendsData(
    onSuccess,
    onError
  );

  return (
    <div>
      <h4>Parallel Queries Page</h4>
      <div>
        <h5>Students: </h5>
        {!isLoadingStudents && (
          <ul>
            {students.data.map((student) => (
              <li key={student.id}>
                {student.name} - {student.alterEgo}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h5>Friends: </h5>
        {!isLoadingFriends && (
          <ul>
            {friends.data.map((friends) => (
              <li key={friends.id}>{friends.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
