import {makeRequest} from "./makeRequest.js";
import {handleResponse} from "./handleResponse.js";

export const postsAPI = {
  async getPosts(userId) {
    const response = await makeRequest({uri: `/posts?_id=${userId}`, method: 'GET', auth: true});
    const posts = await handleResponse(response);
    return posts;
  },
  async deletePost(payload) {
    const response = await makeRequest({uri: '/posts', method: 'DELETE', data: JSON.stringify(payload), auth: true});
    const message = await handleResponse(response);
    return message;
  },
  async create(formData) {
    const response = await makeRequest({uri: '/posts', method: 'POST', data: formData, formData: true, auth: true});
    const message = await handleResponse(response);
    return message;
  }
}
