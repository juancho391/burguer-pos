import api from "@/lib/api";

export const OrderService = {
  getAll: async () => {
    const response = await api.get("/api/orders/");
    return response.data;
  },
};
