import { request } from "./../utils/axios-utils";

export const fetchCourses = () => {
  return request({ url: "/courses" });
};

export const fetchCourse = (courseId) => {
  return request({ url: `/courses/${courseId}` });
};
