"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  user: null,
  refresh:
    typeof window !== "undefined" ? localStorage.getItem("refresh") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.refresh = action.payload.refresh;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("refresh", action.payload.refresh);
      localStorage.setItem("user", action.payload.user);
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.refresh = null;
      localStorage.removeItem("token");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
