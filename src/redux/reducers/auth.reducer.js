import * as Types from "../action.types";

const initialState = {
  user: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_USER: {
      return {
        ...state,
        user: action?.payload,
      };
    }
    case Types.LOGOUT_USER: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
