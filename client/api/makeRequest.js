import config from "./config.js";
import {storage} from "../storage/Storage.js";

const headers = {
  "Accept": "*/*",
  "Content-Type": "application/json",
};

export const makeRequest = ({uri, method, data = null, auth = false}) => {
  const token = storage.getItem('token');
  if (auth && token) {
    headers["Authorization"] = `bearer ${token}`;
  }
  return fetch(config.baseUrl + uri, {
    method,
    body: data,
    headers
  });
};
