"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import ingredientReducer from "./ingredientSlice";
import orderReduce from "./orderSlice";
import productReducer from "./productsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ingredients: ingredientReducer,
    orders: orderReduce,
    products: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
