
import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },

    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Delete Products
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },

    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteProductFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },

    updateProductSuccess: (state, action) => {
      state.isFetching = false;

      state.products[
        state.products.findIndex((item) => item.id === action.payload.id)
      ] = action.payload.data;
      // console.log(action.payload.data);
    },
    updateProductFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },

    addProductSuccess: (state, action) => {
      state.isFetching = false;

      state.products.push(action.payload);
    },
    addProductFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});
export const {
  getProductStart,
  getProductSuccess,
  getProductFail,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFail,
  updateProductStart,
  updateProductSuccess,
  updateProductFail,
  addProductStart,
  addProductSuccess,
  addProductFail,
} = productSlice.actions;

export default productSlice.reducer;
