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

export const updatePic = (payload) => {
  return {
    type: Types.UPDATE_USER_PIC,
    payload,
  };
};

export const updateInfo = (payload) => {
  return {
    type: Types.UPDATE_USER_INFO,
    payload,
  };
};
