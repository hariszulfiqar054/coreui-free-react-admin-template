import * as Types from "../action.types";
export const setUser = (user) => {
  return {
    type: Types.SET_USER,
    payload: user,
  };
};
