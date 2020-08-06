import axios from 'axios';
axios.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.withCredentials=true
    axios.defaults.crossDomain=true
let config = {
  baseURL: '/',
  timeout: 60 * 1000, // Timeout
};
const _axios = axios.create(config);
_axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    config.headers['Cache-Control'] = 'no-cache';
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response.data
  },
  (error) => {
    // Do something with response error
    return Promise.reject();
  }
);

export default _axios;