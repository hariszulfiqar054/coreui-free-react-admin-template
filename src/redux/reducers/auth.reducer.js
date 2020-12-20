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
    case Types.UPDATE_USER_PIC: {
      return {
        ...state,
        user: { ...state.user, img: action?.payload },
      };
    }
    case Types.UPDATE_USER_INFO: {
      return {
        ...state,
        user: { ...state.user, ...action?.payload },
      };
    }
    default:
      return state;
  }
};

export default AuthReducer;
