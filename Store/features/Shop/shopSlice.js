import { createSlice } from "@reduxjs/toolkit";
import allProducts from "../../../Data/products";
import allCategories from "../../../Data/categories.json";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    categories: allCategories,
    products: allProducts,
    shopSelectedCategory: null,
    homeSelectedCategory: allCategories[0],
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setShopSelectedCategory: (state, action) => {
      state.shopSelectedCategory = action.payload;
    },
    setHomeSelectedCategory: (state, action) => {
      state.homeSelectedCategory = action.payload;
    },
  },
});

export const {
  setCategories,
  setProducts,
  setShopSelectedCategory,
  setHomeSelectedCategory
} = shopSlice.actions;
export default shopSlice.reducer;
