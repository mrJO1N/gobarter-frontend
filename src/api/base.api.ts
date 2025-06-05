import { config } from "@/utils/config";
import type { AxiosError, AxiosInstance } from "axios";
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
      if (accessToken && !config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config! as AxiosError["config"] & {
          _retry: boolean;
        };

        const isThisReqMustNotHappenAgain =
          originalRequest?.url?.includes("refresh") ||
          originalRequest?.url?.includes("login");

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !isThisReqMustNotHappenAgain
        ) {
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
    let isGoodResponse = true;
    if (refreshToken) {
      const response = await this.axiosInstance.post("/user/refresh", null, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      localStorage.setItem("access_token", response.data.access_token);
    }

    return isGoodResponse;
  }

  protected handleError(error: any) {
    if (error.response) {
      // not 2xx

      let errorMessage = error.response.data.detail;
      if (errorMessage === "Невалидный токен")
        errorMessage = "войдите еще раз, пожалуйста";

      return {
        status: error.response.status,
        message: errorMessage || "Server error",
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
