import config from "./config.js";
import {storage} from "../storage/Storage.js";
let headers = {};

export const makeRequest = ({uri, method, data = null, auth = false, formData = false}) => {
  const token = storage.getItem('token');
  if (auth && token) {
    headers["Content-Type"] = "application/json";
    headers["Authorization"] = `bearer ${token}`;
  }
  if (formData) {
    return fetch(config.baseUrl + uri, {
      method,
      body: data,
    });
  }
  return fetch(config.baseUrl + uri, {
    method,
    body: data,
    headers
  });
};
