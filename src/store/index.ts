import { defineStore } from "pinia";
import type { userInfo } from "~/types/login";

export const useUserStore = defineStore("user", {
  state: () => ({
    // isLoggedIn: false,
    token: localStorage.getItem("token") || "",
    userInfo: {
      ...JSON.parse(localStorage.getItem("userInfo") || "{}"),
    },
  }),
  getters: {
    isLoggedIn: (state) => state.userInfo.id !== "",
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem("token", token);
    },
    setUserInfo(userInfo: userInfo) {
      this.userInfo = userInfo;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    logout() {
      this.token = "";
      this.userInfo = {
        id: "",
        name: "",
        avatar: "",
        role: "",
      };
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    },
  },
});
