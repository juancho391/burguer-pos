import { Product } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";

interface ProductState {
  products: Product[];
}

const initialState: ProductState = {
  products: [],
};

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts } = ProductSlice.actions;
export default ProductSlice.reducer;
