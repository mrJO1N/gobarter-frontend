import { BaseApi } from "../base.api";

interface ILoginPayload {
  email: string;
  password: string;
}
interface IRegPayload extends ILoginPayload {
  name: string;
}
interface IVerifyPayload {
  email: string;
  code: string;
}
interface ITokesRes {
  refresh_token: string;
  access_token: string;
}

class AuthApi extends BaseApi {
  constructor() {
    super();
    this.handleError = this.handleError.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
    this.verify = this.verify.bind(this);
  }

  async login(payload: ILoginPayload) {
    try {
      const res = await this.axiosInstance.post<ITokesRes>(
        "/auth/login",
        payload
      );
      this.setTokens(res.data);
      return res.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(data: IRegPayload) {
    try {
      const response = await this.axiosInstance.post<ITokesRes>(
        "/auth/register",
        data
      );
      this.setTokens(response.data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async verify(data: IVerifyPayload) {
    try {
      const response = await this.axiosInstance.post("/auth/verify", data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // method GET refresh token includes in ../base.api.ts

  private setTokens(data: ITokesRes) {
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("access_token", data.access_token);
  }
}

export const authApi = new AuthApi();
