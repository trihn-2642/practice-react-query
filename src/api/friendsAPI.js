import { request } from "./../utils/axios-utils";

export const fetchFriends = () => {
  return request({ url: "/friends" });
};
