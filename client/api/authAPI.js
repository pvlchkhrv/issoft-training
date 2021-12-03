import {makeRequest} from "./makeRequest.js";

export const authAPI = {
  async register(formData) {
    const response = await makeRequest('POST', '/auth/registration', formData);
    if (!response) {
      throw new Error('Something wrong!');
    }
    const {message} = await response.json();
    return message;
  },
  async login(formData) {
    const response = await makeRequest('POST', 'auth/login');
    if (!response) {
      throw new Error('Something wrong!');
    }
    const {message} = await response.json();
    return message;
  }
}
