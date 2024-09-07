import { combineReducers } from "@reduxjs/toolkit";
import userProfileReducer from "./features/userProfile/userProfileSlice";

const rootReducer = combineReducers({
  userProfile: userProfileReducer,
});

export default rootReducer;
