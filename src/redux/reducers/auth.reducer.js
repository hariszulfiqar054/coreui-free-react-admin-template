import * as Types from "../action.types";

const initialState = {
  user: null,
  token: null,
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
        token: null,
      };
    }
    case Types.SET_TOKEN: {
      return {
        ...state,
        token: action?.payload,
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
