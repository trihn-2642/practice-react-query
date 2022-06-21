import { request } from "./../utils/axios-utils";

export const fetchColors = (_limit, _page) => {
  return request({ url: "/colors", params: { _limit, _page } });
};
