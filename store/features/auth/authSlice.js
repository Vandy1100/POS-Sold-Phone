import { removeRefreshToken, secureRefreshToken } from "../../../lib/cryptography";
import { createSlice } from "@reduxjs/toolkit";
import { useRouter } from "next/navigation";

const initialState = {
  user: "",
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.accessToken = action?.payload?.accessToken;
      secureRefreshToken(action?.payload?.refreshToken);
    },
    setCurrentUser: (state, action) => {
      state.user = action?.payload;
    },
    logoutSuccess: (state) => {
      state.user = "";
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logoutSuccess, setCurrentUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state?.auth?.user;
export const selectCurrentAccessToken = (state) => state?.auth?.accessToken;
export const selectIsLoggedIn = (state) => !!state?.auth?.accessToken; // New selector
export const logout = () => async (dispatch) => {
  // Dispatch the action to remove token
  removeRefreshToken(); // assuming this function returns a promise or is synchronous
  
  // Dispatch the action to update the state after token is removed
  dispatch(logoutSuccess());
};