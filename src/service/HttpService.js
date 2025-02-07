// import axios from "axios";

// import {
//   showError,
//   clearAll,
// } from "../components/ToastedMessage";
// import config from "../config";
// const { localurl } = config;

// const instance = axios.create();

// instance.interceptors.request.use((config) => {
//   const authToken = localStorage.getItem("access_token");
//   config.baseURL = localurl;

//   if (authToken) {
//     config.headers.Authorization = `Bearer ${authToken}`;
//   }
//   clearAll();
//   return config;
// });

// instance.interceptors.response.use(
//   (response) => {
//     if (response.data?.success === false) {
//       showError(response.data?.message || "Request failed.");
//       return Promise.reject(response.data);
//     }
//     return response.data;  
//   },
//   (error) => {
//     console.error("Axios Error:", error);
//     return Promise.reject(error);
//   }
// );


// const verbs = {
//   httpGet: instance.get,
//   httpPost: instance.post,
//   httpPut: instance.put,
//   httpDelete: instance.delete,
// };

// export const { httpGet, httpPost, httpPut, httpDelete } = verbs || {};
// export default verbs;


import axios from "axios";
import config from "../config";

const { localurl } = config;

const instance = axios.create();

instance.interceptors.request.use((config) => {
  const authToken = localStorage.getItem("access_token");
  config.baseURL = localurl;

  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response.data?.success === false) {
      return Promise.reject(response.data);
    }
    return response.data;
  },
  (error) => {
    console.error("Axios Error:", error);
    return Promise.reject(error);
  }
);

const verbs = {
  httpGet: instance.get,
  httpPost: instance.post,
  httpPut: instance.put,
  httpDelete: instance.delete,
};

export const { httpGet, httpPost, httpPut, httpDelete } = verbs || {};
export default verbs;
