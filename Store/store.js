import { configureStore } from "@reduxjs/toolkit";
import { shopApi } from "../Services/shopService";
import { authApi } from "../Services/authService";
import { userApi } from "../Services/userService";
import shopReducer from "./features/Shop/shopSlice";
import cartReducer from "./features/Cart/cartSlice";
import authReducer from "./features/Auth/authSlice";

export const store = configureStore({
  reducer: {
    shop: shopReducer,
    cart: cartReducer,
    auth: authReducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      shopApi.middleware,
      authApi.middleware,
      userApi.middleware,
    ),
});
