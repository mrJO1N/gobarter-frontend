import { wrapUseFetch } from "./hook";
import { authApi } from "./routes/auth";
import { offerApi } from "./routes/offer";
import { userApi } from "./routes/user";

export const api = {
  auth: {
    login: wrapUseFetch(authApi.login),
    register: wrapUseFetch(authApi.register),
    verify: wrapUseFetch(authApi.verify),
  },
  offer: {
    create: wrapUseFetch(offerApi.create),
    getOne: wrapUseFetch(offerApi.getOne),
    search: wrapUseFetch(offerApi.search),
  },
  user: {
    getMe: wrapUseFetch(userApi.getMe),
  },
};
