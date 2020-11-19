import * as Types from "../action.types";

export const setUser = (user) => {
  return {
    type: Types.SET_USER,
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: Types.LOGOUT_USER,
  };
};

export const setToken = (token) => {
  return {
    type: Types.SET_TOKEN,
    payload: token,
  };
};
