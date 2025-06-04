import { wrapUseFetch } from "./hook";
import { authApi } from "./routes/auth";

export const api = {
  auth: {
    login: wrapUseFetch(authApi.login),
    register: wrapUseFetch(authApi.register),
    verify: wrapUseFetch(authApi.verify),
  },
};
