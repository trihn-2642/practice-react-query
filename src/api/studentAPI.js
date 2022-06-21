import { request } from "./../utils/axios-utils";

export const fetchStudents = () => {
  return request({ url: "/students" });
};

export const fetchStudent = (id) => {
  return request({ url: `/students/${id}` });
};

export const addStudent = (student) => {
  return request({ url: "/students", method: "post", data: student });
};
