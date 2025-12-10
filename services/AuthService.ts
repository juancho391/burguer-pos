import api from "@/lib/api";

export const AuthService = {
  login: async (data: { username: string; password: string }) => {
    const response = await api.post("/auth/jwt/create/", data);
    return response.data;
  },

  verify: async (token: string) => {
    const response = await api.post("/auth/jwt/verify/", { token: token });
    return response;
  },
};
