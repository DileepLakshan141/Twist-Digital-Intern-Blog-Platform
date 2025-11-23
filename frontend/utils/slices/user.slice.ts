"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
  email: string | null;
  user_id: string | null;
  profile_pic: string;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  username: null,
  email: null,
  user_id: null,
  profile_pic: "sample",
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin_user: (
      state,
      action: PayloadAction<{
        username: string;
        email: string;
        user_id: string;
        profile_pic: string;
        isAuthenticated: boolean;
      }>
    ) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.user_id = action.payload.user_id;
      state.profile_pic = action.payload.profile_pic;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    signout_user: (state) => {
      state.username = null;
      state.email = null;
      state.user_id = null;
      state.profile_pic = "sample";
      state.isAuthenticated = false;
    },
  },
});

export const { signin_user, signout_user } = userSlice.actions;
export default userSlice.reducer;
