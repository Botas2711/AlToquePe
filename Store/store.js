import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './features/Shop/shopSlice'
import cartReducer from './features/Cart/cartSlice'

export const store = configureStore({
    reducer: {
        shop: shopReducer,
        cart: cartReducer,
    }
})