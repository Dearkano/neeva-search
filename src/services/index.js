import request from "../utils/request";

export function query(searchTerm) {
  return request(`/api/search?q=${searchTerm}`);
}
