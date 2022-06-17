import axios from "axios";
import { URL } from "./../constant/index";

export const fetchColors = (limit, page) => {
  return axios.get(`${URL}/colors?_limit=${limit}&_page=${page}`);
};
