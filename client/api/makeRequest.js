const requestUrl = "http://localhost:5000";
const headers = {
  'Accept': '*/*'
}
export const makeRequest =  (method, uri, formData= null) => {
  return fetch(requestUrl + uri, {
    headers,
    method,
    body: formData,
  });
};
