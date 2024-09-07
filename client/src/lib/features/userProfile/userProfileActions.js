import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  updateUserProfileAPI,
  createUserProfileAPI,
  getAllUserProfilesAPI,
} from "./userProfileAPI";

export const getAllUserProfiles = createAsyncThunk(
  "userProfile/getAllUserProfiles",
  async () => {
    const response = await getAllUserProfilesAPI();
    return response.data;
  }
);

export const updateUserProfile = createAsyncThunk(
  "userProfile/updateUserProfile",
  async ({ userProfile, userId }) => {
    const response = await updateUserProfileAPI(userProfile, userId);
    return response.data;
  }
);

export const createUserProfile = createAsyncThunk(
  "userProfile/createUserProfile",
  async (userProfile) => {
    const response = await createUserProfileAPI(userProfile);
    return response.data;
  }
);
