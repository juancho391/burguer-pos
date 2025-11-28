import api from "@/lib/api";

export const authService = {
  login: async (data: { username: string; password: string }) => {
    const response = await api.post("/auth/jwt/create/", data);
    return response.data;
  },
};
