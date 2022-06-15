import axios from "axios";
import { URL } from "./../constant/index";

export const fetchStudents = () => {
  return axios.get(`${URL}/students`);
};

export const fetchStudent = (id) => {
  return axios.get(`${URL}/students/${id}`);
};
