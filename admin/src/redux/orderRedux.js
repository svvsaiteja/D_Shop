import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
  },
  reducers: {
    getOrders: (state, action) => {
      console.log(action.payload);
      state.orders = action.payload;
    },
    deleteOrder: (state, action) => {
      state.orders.splice(
        state.orders.findIndex((item) => item._id === action.payload),
        1
      );
    },
  },
});
export const { getOrders, deleteOrder } = orderSlice.actions;

export default orderSlice.reducer;
