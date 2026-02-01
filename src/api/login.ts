import axios from "~/axios";

export async function loginapi(username: string, password: string) {
  return axios
    .post("/login", { username, password })
    .then((res) => res.data)
    .catch((err) => err.response.data);
}

export async function getinfo() {
  return axios
    .post("/getinfo")
    .then((res) => res.data)
    .catch((err) => err.response.data);
}
