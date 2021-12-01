const requestUrl = "http://localhost:5000";
const headers = {
  'Accept': '*/*'
}
export const makeRequest = (method, uri, formData) => {
  return fetch(requestUrl + uri, {
    headers,
    method,
    body: formData,
  });
};
