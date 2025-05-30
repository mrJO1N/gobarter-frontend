import { useFetch } from "../hooks/useFetch";

class AuthApiService {
  async login(email: string, password: string) {
    return useFetch({
      method: "post",
      url: "/auth/login",
      data: { email, password },
    });
  }

  // async register(email: string, username: string, password: string) {}

  // async verificate(email: string, code: string) {}
}

export const authService = new AuthApiService();
