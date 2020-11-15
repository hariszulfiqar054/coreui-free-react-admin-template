import { createStore, combineReducers, applyMiddleware } from "redux";
import AuthReducer from "./redux/reducers/auth.reducer";
import thunk from "redux-thunk";

const Reducer = combineReducers({ auth: AuthReducer });

const store = createStore(Reducer, applyMiddleware(thunk));
export default store;
