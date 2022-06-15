import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {useStudentDetailData} from "./../hooks/useStudentDetailData"

export default function RQStudentsDetailPage() {
  const { studentId } = useParams();
  const {data, error, isLoading, isError, isFetching} = useStudentDetailData(studentId)

  if(isLoading || isFetching) return <div>Loading...</div>
  if(isError){
    toast.error(error.message, {autoClose: 2000})
    return;
  }

  return (
    <>
      <h4> Rq Student Detail</h4>
      <div>{data}</div>
    </>
  )
}
