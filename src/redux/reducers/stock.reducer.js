import * as Types from "../action.types";

const initialState = {
  currentItem: null,
  cuurentOrder: null,
  selectedSalesman: null,
};

const StockReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_CURRENT_ITEM: {
      return {
        ...state,
        currentItem: action.payload,
      };
    }
    case Types.SET_CURRENT_ORDER: {
      return {
        ...state,
        cuurentOrder: action?.payload,
      };
    }
    case Types.SET_SELECTED_SALESMAN: {
      return {
        ...state,
        selectedSalesman: action?.payload,
      };
    }
    default:
      return { ...state };
  }
};

export default StockReducer;
