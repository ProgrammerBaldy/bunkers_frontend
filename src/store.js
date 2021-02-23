import Vue from "vue";
import Vuex from "vuex";
import { getAPI } from "./axios-api";
import router from "./router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: null,
    refreshToken: null,
    APIData: ""
  },
  mutations: {
    updateStorage(state, { access, refresh }) {
      state.accessToken = access;
      state.refreshToken = refresh;
      localStorage.setItem("ApiKey", access);
      localStorage.setItem("ApiRefreshKey", refresh);
    },
    destroyToken(state) {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("ApiKey");
      localStorage.removeItem("ApiRefreshKey");
    },
    updateToken(state) {
      state.accessToken = localStorage.getItem("ApiKey");
      state.refreshToken = localStorage.getItem("ApiRefreshKey");
    }
  },
  getters: {
    loggedIn(state) {
      let flag = false;
      if (state.accessToken == null) {
        flag = false;
      } else {
        flag = true;
      }
      return flag;
    }
  },
  actions: {
    userLogin(context, credentials) {
      return new Promise((resolve, reject) => {
        getAPI
          .post("/api-token/", {
            username: credentials.username,
            password: credentials.password
          })
          .then(response => {
            context.commit("updateStorage", {
              access: response.data.access,
              refresh: response.data.refresh
            });
            resolve();
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    userLogout(context) {
      if (context.getters.loggedIn) {
        context.commit("destroyToken");
      }
    },
    localAuth(context) {
      if (context.state.accessToken == null) {
        context.commit("updateToken");
      }
    },
    refreshToken(context) {
      return new Promise(resolve => {
        getAPI
          .post("/api-token-refresh/", {
            refresh: localStorage.getItem("ApiRefreshKey")
          })
          .then(response => {
            context.commit("updateStorage", {
              access: response.data.access,
              refresh: localStorage.getItem("ApiRefreshKey")
            });
            resolve();
          })
          .catch(() => {
            context.commit("destroyToken");
            router.push({ name: "login" });
          });
      });
    }
  }
});
