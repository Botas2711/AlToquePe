import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    profileImage: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = {
        name: action.payload.name,
        phone: action.payload.phone,
        email: action.payload.email,
        localId: action.payload.localId,
      };
      state.token = action.payload.idToken;
      state.profileImage = null;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.profileImage = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
