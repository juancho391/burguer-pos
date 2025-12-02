import { Order } from "@/types/order";
import { createSlice } from "@reduxjs/toolkit";

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrders } = OrderSlice.actions;
export default OrderSlice.reducer;
