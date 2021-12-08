import {makeRequest} from "./makeRequest.js";
import {handleResponse} from "./handleResponse.js";


export const authAPI = {
  async register(data) {
    const response = await makeRequest({uri: '/auth/registration', method: 'POST', data});
    const {message} = await handleResponse(response);
    return message;
  },
  async login(data) {
    const response = await makeRequest({uri: '/auth/login', method: 'POST', data});
    const {token, user} = await handleResponse(response);
    return {token, user};
  }
};
