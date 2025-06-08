import { BaseApi } from "../base.api";

class UserApi extends BaseApi {
  constructor() {
    super();
    this.handleError = this.handleError.bind(this);
    this.getMe = this.getMe.bind(this);
    this.saveRole = this.saveRole.bind(this);
  }

  async getMe() {
    try {
      const response = await this.axiosInstance.get("/users/me");

      console.log(response.data);
      // this.saveRole(response.data.)
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  saveRole(role: string) {
    localStorage.setItem("role", role);
  }
}

export const userApi = new UserApi();
