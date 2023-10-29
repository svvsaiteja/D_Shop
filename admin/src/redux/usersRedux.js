import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    AddUser: (state, action) => {
      state.users = action.payload;
    },

    UpdateUser: (state, action) => {
      console.log(action.payload);
      state.users[
        state.users.findIndex((user) => user._id === action.payload.id)
      ] = action.payload.data;
    },
  },
});

export const { AddUser, UpdateUser } = usersSlice.actions;
export default usersSlice.reducer;
