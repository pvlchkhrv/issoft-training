import {makeRequest} from "./makeRequest.js";
import {handleResponse} from "./handleResponse.js";

export const usersAPI = {
  async getUsers() {
    const response = await makeRequest({uri: '/users', method: 'GET', auth: true});
    const users = await handleResponse(response);
    return users;
  },
  async getUser(userId) {
    const response = await makeRequest({uri: `/users?_id=${userId}`, method: 'GET', auth: true});
    const user = await handleResponse(response);
    return user;
  },
  async updateUser(payload) {
    const response = await makeRequest({uri: '/users', method: 'PUT', data: JSON.stringify(payload), auth: true});
    const message = await handleResponse(response);
    return message
  },
  async deleteUser(payload) {
    const response = await makeRequest({uri: '/users', method: 'DELETE', data: JSON.stringify(payload), auth: true});
    const message = await handleResponse(response);
    return message;
  }
}
