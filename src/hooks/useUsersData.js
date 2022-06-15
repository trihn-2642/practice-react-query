import { useQuery } from "react-query";
import { fetchUsers, fetchUserByEmail } from "./../api/userAPI";

export const useUsersData = () => {
  return useQuery("users", fetchUsers);
};

export const useUserByEmail = (email) => {
  return useQuery(["users", email], () => fetchUserByEmail(email));
};
