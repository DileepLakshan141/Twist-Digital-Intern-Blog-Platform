import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
  email: string | null;
  user_id: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  username: null,
  email: null,
  user_id: null,
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
        isAuthenticated: boolean;
      }>
    ) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.user_id = action.payload.user_id;
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    signout_user: (state) => {
      state.username = null;
      state.email = null;
      state.user_id = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signin_user, signout_user } = userSlice.actions;
export default userSlice.reducer;
