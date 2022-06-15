import axios from "axios";
import { URL } from "./../constant/index";

export const fetchUsers = () => {
  return axios.get(`${URL}/users`);
};

export const fetchUserByEmail = (email) => {
  return axios.get(`${URL}/users/${email}`);
};
