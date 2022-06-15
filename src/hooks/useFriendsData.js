import { useQuery } from "react-query";
import { fetchFriends } from "./../api/friendsAPI";

export const useFriendsData = (onSuccess, onError) => {
  return useQuery("friends", fetchFriends, { onSuccess, onError });
};
