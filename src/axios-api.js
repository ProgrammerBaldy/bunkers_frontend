import axios from "axios";
import router from "./router";

const getAPI = axios.create({
  baseURL: "https://bunkers-backend.herokuapp.com",
  timeout: 60000
});

/* interceptor */
getAPI.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    if (error.response.status === 401) {
      router.push({ name: "login" });
    }

    // return Error object with Promise
    return Promise.reject(error);
  }
);

export { getAPI };
