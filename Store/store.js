import { configureStore } from '@reduxjs/toolkit'
import shopReducer from './features/Shop/shopSlice'

export const store = configureStore({
    reducer: {
        shop: shopReducer,
    }
})