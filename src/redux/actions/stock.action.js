import * as Types from "../action.types";
export const setCurrentItem = (data) => {
  return {
    type: Types.SET_CURRENT_ITEM,
    payload: data,
  };
};

export const setCurrentOrder = (payload) => {
  return {
    type: Types.SET_CURRENT_ORDER,
    payload,
  };
};
