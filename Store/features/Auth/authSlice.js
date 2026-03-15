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
      state.profileImage = action.payload.profileImage || null;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.profileImage = null;
    },

    setProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

export const { setUser, logout, setProfileImage } = authSlice.actions;

export default authSlice.reducer;
