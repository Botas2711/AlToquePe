import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      state.items.push({
        id: product.id,
        name: product.name,
        price: product.newPrice ? product.newPrice : product.oldPrice,
        image: product.image,
        quantity: 1,
      });
    },
    increaseQuantity: (state, action) => {
      const product = action.payload;
      const item = state.items.find((item) => item.id === product.id);
      if (item) {
        item.quantity += 1;
      }
    },
    removeFromCart: (state, action) => {
      const product = action.payload;
      state.items = state.items.filter((item) => item.id !== product.id);
    },
    decreaseQuantity: (state, action) => {
      const product = action.payload;
      const item = state.items.find((item) => item.id === product.id);
      if (!item) return;
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== product.id);
      }
    },
  },
});


export const { 
    addToCart, 
    increaseQuantity, 
    decreaseQuantity,
    removeFromCart
} = cartSlice.actions;

export default cartSlice.reducer;
