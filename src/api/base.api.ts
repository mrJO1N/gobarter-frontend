import { config } from "@/utils/config";
import type { AxiosInstance } from "axios";
import axios from "axios";

export abstract class BaseApi {
  protected axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: String(config.get("BASE_URL")) ?? "",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    this.axiosInstance.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          await this.refreshAccessToken();
          return this.axiosInstance(originalRequest);
        }
        return Promise.reject(error);
      }
    );
  }

  private async refreshAccessToken() {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) {
      const response = await this.axiosInstance.post("/auth/refresh", {
        refresh_token: refreshToken,
      });
      localStorage.setItem("access_token", response.data.access_token);
    }
  }

  protected handleError(error: any) {
    if (error.response) {
      // not 2xx
      return {
        status: error.response.status,
        message: error.response.data.message || "Server error",
      };
    } else if (error.request) {
      return {
        status: 500,
        message: "Server does not response",
      };
    } else {
      return {
        status: 500,
        message: error.message,
      };
    }
  }
}
