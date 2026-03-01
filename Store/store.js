import { configureStore } from '@reduxjs/toolkit'
import { shopApi } from "../Services/shopService";
import shopReducer from './features/Shop/shopSlice'
import cartReducer from './features/Cart/cartSlice'

export const store = configureStore({
    reducer: {
        shop: shopReducer,
        cart: cartReducer,
        [shopApi.reducerPath]: shopApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware),
})