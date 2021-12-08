const config = {
  baseUrl: "http://localhost:5000",
  token: null,
};

export const setToken = (token) => {
  config.token = token;
};

export default config;
