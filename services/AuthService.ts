import api from "@/lib/api";

export const authService = {
  login: async (data: { email: string; password: string }) => {
    const response = await api.post("/auth/token", data);
    return response.data;
  },
};
