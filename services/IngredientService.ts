import api from "@/lib/api";
import { Ingredient } from "@/types/ingredient";

export const IngredientService = {
  getAll: async () => {
    const response = await api.get("/api/ingredients/");
    return response.data;
  },

  getOne: async (id: number) => {
    const response = await api.get(`/api/ingredients/${id}/`);
    return response.data;
  },

  updateOne: async (ingredient: Ingredient) => {
    const response = await api.patch(
      `/api/ingredients/${ingredient.id}/`,
      ingredient
    );
    return response.data;
  },

  deleteOne: async (id: number) => {
    const response = await api.delete(`/api/ingredients/${id}/`);
    return response.data;
  },
};
