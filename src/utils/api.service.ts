import axios from "axios";

axios.defaults.baseURL = "https://gobarter.ru";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

export const api = axios;
