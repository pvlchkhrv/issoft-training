import {makeRequest} from "./makeRequest.js";

export const usersAPI = {
  async getUsers() {
    return await makeRequest('POST', '/users');
  },
  async getUser(userId) {
    return await makeRequest('POST', `/users?id=${userId}`);
  },
  async updateUser(userId, payload) {
    return await makeRequest('PUT', '/users');
  },
  async deleteUser(userId) {
    return await makeRequest('DELETE', '/users');
  }
}
