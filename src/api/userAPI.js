import { request } from "./../utils/axios-utils";

export const fetchUsers = () => {
  return request({ url: "/users" });
};

export const fetchUserByEmail = (email) => {
  return request({ url: `/users/${email}` });
};
