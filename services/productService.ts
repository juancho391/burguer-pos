import api from "@/lib/api";

export const ProductService = {
  getAll: async () => {
    const response = await api.get("/api/products/");
    return response.data;
  },
};
