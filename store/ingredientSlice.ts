"use client";
import { Ingredient } from "@/types/ingredient";

import { createSlice } from "@reduxjs/toolkit";

interface IngredientState {
  ingredients: Ingredient[];
}

const initialState: IngredientState = {
  ingredients: [],
};

const IngredientSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    setIngredients: (state, action) => {
      state.ingredients = action.payload;
    },
  },
});

export const { setIngredients } = IngredientSlice.actions;
export default IngredientSlice.reducer;
