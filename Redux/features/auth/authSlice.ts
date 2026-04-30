// import { RootState } from "@/redux/store";
import { RootState } from "@/Redux/store";
import { createSlice } from "@reduxjs/toolkit";
// import { RootState } from "../../store";

export type TUser = {
  id: number;
  name: string;
  email: string;
  role: string;
  plan_id: null | string;
  plan_name: null | string;
};

type TAuthState = {
  user: null | TUser;
  accessToken: null | string;
};

const initialState: TAuthState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.accessToken = token;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
export const selectCurrentUser = (state: RootState) => state.auth.user;
