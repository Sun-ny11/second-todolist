import { Dispatch } from "redux";
import { authAPI } from "../api/todolists-api";
import { FormikErrorType } from "../Components/features/login/Login";
import { handelNetworkError, handelServerAppError } from "../utils/error-utils";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { appActions } from "./appReducer";

const slice = createSlice({
   name: "auth",
   initialState: {
      isLoggedIn: false,
   },
   reducers: {
      setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
         state.isLoggedIn = action.payload.isLoggedIn;
      },
   },
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;

// thunks
export const loginTC = (data: FormikErrorType) => async (dispatch: Dispatch) => {
   dispatch(appActions.setAppStatus({ status: "loading" }));
   try {
      const res = await authAPI.login(data);
      if (res.data.resultCode === 0) {
         dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
         dispatch(appActions.setAppStatus({ status: "succeeded" }));
      } else {
         handelServerAppError(res.data, dispatch);
      }
   } catch (e) {
      handelNetworkError(e as { message: string }, dispatch);
   }
};
export const logOutTC = () => async (dispatch: Dispatch) => {
   dispatch(appActions.setAppStatus({ status: "loading" }));
   try {
      const res = await authAPI.logOut();
      if (res.data.resultCode === 0) {
         dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
         dispatch(appActions.setAppStatus({ status: "succeeded" }));
      } else {
         handelServerAppError(res.data, dispatch);
      }
   } catch (e) {
      handelNetworkError(e as { message: string }, dispatch);
   }
};

export const initializeAppTC = () => async (dispatch: Dispatch) => {
   dispatch(appActions.setAppStatus({ status: "loading" }));
   try {
      let res = await authAPI.me();
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      dispatch(appActions.setAppStatus({ status: "succeeded" }));

      if (res.data.resultCode === 0) {
         dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
      } else {
      }
   } catch (e) {
   } finally {
      dispatch(appActions.setIsInitialized({ status: true }));
   }
};
