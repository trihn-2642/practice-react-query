import axios from "axios";
import { URL } from "./../constant/index";

export const fetchCourses = () => {
  return axios.get(`${URL}/courses`);
};

export const fetchCourse = (courseId) => {
  return axios.get(`${URL}/courses/${courseId}`);
};
