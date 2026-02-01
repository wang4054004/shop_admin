import { defineStore } from "pinia";
import type { userInfo } from "~/types/login";
import { loginapi, getinfo } from "~/api/login";
import router from "~/router";

export const useUserStore = defineStore("user", {
  state: () => ({
    // isLoggedIn: false,
    token: localStorage.getItem("token") || "",
    userInfo: {
      ...JSON.parse(localStorage.getItem("userInfo") || "{}"),
    },
    info: {},
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
    login(params: { username: string; password: string }) {
      loginapi(params.username, params.password).then((res) => {
        if (res.msg === "ok") {
          this.setToken(res.data.token);
          this.setUserInfo({
            id: Date.now().toString(),
            name: params.username,
            avatar: "",
            role: "1",
          });
          getinfo().then((res) => {
            if (res.msg === "ok") {
              this.info = res.data;
              router.push("/");
            }
          });
        }
      });
    },
  },
});
