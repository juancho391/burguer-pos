import api from "@/lib/api";

export const OrderService = {
  getAll: async () => {
    const response = await api.get("/api/orders/");
    return response.data;
  },

  addProduct: async (
    order_id: number,
    product_id: number,
    quantity: number
  ) => {
    const response = await api.post(`/api/orders/${order_id}/add-product/`, {
      product_id: product_id,
      quantity: quantity,
    });
    return response.data;
  },

  closeOrder: async (order_id: number, include_service: boolean) => {
    const response = await api.post(`/api/orders/${order_id}/close/`, {
      include_service: include_service,
    });

    return response.data;
  },

  deleteORder: async (order_id: number) => {
    const response = await api.delete(`/api/orders/${order_id}/delete/`);
    return response.data;
  },
};
