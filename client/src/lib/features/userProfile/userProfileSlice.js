import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUserProfiles,
  updateUserProfile,
  createUserProfile,
} from "./userProfileActions";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserProfile.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(getAllUserProfiles.fulfilled, (state, action) => {
        state.items = action.payload.data;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.data._id
        );
        if (index !== -1) {
          state.items[index] = action.payload.data;
        }
      });
  },
});

export default userProfileSlice.reducer;
