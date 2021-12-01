const requestUrl = "http://localhost:5000";

export function makeRequestXHR(method, uri, formData) {
  return new Promise((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, requestUrl + uri);

    xhr.responseType = "json";
    xhr.setRequestHeader("Content-Type", "multipart/form-data");

    xhr.onload = () => {
      if (xhr.status >= 400) {
        rej(xhr.response);
      } else {
        res(xhr.response);
      }
    };

    xhr.onerror = () => {
      //network errors
      rej(xhr.onerror);
    };

    xhr.send(formData);
  });
}
