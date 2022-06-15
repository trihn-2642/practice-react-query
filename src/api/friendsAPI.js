import axios from "axios";
import { URL } from "./../constant/index";

export const fetchFriends = () => {
    return axios.get(`${URL}/friends`);
}