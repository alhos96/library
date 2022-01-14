import { createSlice } from "@reduxjs/toolkit";
import { apiRequestStarted } from "./actions";

const slice = createSlice({
  name: "users",

  initialState: {
    loggedIn: false,
    loggedOut: false,
    registered: false,
    user: {
      name: "",
      username: "",
      role: "",
    },
    error: "",
    message: "",
  },

  reducers: {
    userLoggedIn: (users, { payload }) => {
      let { token, name, username, role } = payload.data;

      //set user info in redux
      users.loggedIn = true;
      users.loggedOut = false;
      users.user = {
        name,
        username,
        role,
      };

      //set user info in session storage
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("name", name);
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("isAdmin", role === "admin" ? "admin" : "");

      //reset possible previous info
      users.error = "";
      users.message = "";
    },

    userLoggedOut: (users, { payload }) => {
      //reset user info in redux
      users.loggedIn = false;
      users.loggedOut = true;
      users.user = {
        name: "",
        username: "",
        role: "",
      };

      //clear session storage
      sessionStorage.clear();
    },

    //Resets all error messages left behind. Dispatch on onmount.
    messageReset: (users, { payload }) => {
      users.message = "";
      users.error = "";
    },

    gotError: (users, { payload }) => {
      users.error = payload;
    },
  },
});

export const userLogin = (url, values, method) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      url,
      values,
      method,
      onSuccess: userLoggedIn.type,
      onError: gotError.type,
    })
  );
};

export const { userLoggedIn, userLoggedOut, gotError, messageReset } = slice.actions;
export default slice.reducer;
