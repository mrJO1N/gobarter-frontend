import axios from "axios";
import type { IApiOptions } from "./types";

axios.defaults.baseURL = "https://gobarter.ru";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export class Api {
  protected refreshToken: string;
  protected accessToken: string;

  constructor() {
    this.refreshToken = localStorage.getItem("refresh") || "";
    this.accessToken = localStorage.getItem("access") || "";
  }

  protected async getAuth() {}

  async get(url: string, options: IApiOptions = {}) {
    let res;
    if (options.isAuthed) {
      res = await axios
        .get(url, { headers: { Authorization: this.accessToken } })
        .catch((err) => {
          console.log(err);
        });
    }

    if (!res) throw "no res";

    return res;
  }

  async post(url: string, data?: object, options: IApiOptions = {}) {
    let res = await axios
      .get(url, { headers: { Authorization: this.accessToken } })
      .catch((err) => {
        console.log(err);
      });

    if (!res) throw "no res";

    return res;
  }

  // async put(url: string, data?: object, options: IApiOptions = {}) {
  //   return axios
  //     .get(url, { headers: { Authorization: this.accessToken } })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  // async delete(url: string, options: IApiOptions = {}) {
  //   return axios
  //     .get(url, { headers: { Authorization: this.accessToken } })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
}

export const api = new Api();
