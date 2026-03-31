import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistJobs: [], // array of job objects
  },
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.wishlistJobs.find(job => job._id === action.payload._id);
      if (!exists) {
        state.wishlistJobs.push(action.payload);
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistJobs = state.wishlistJobs.filter(job => job._id !== action.payload);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
