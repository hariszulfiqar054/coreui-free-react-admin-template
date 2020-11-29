import { createStore, combineReducers, applyMiddleware } from "redux";
import AuthReducer from "./redux/reducers/auth.reducer";
import thunk from "redux-thunk";
import ENV from "./env/env";
import axios from "axios";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ChangeState from "./redux/reducers/sideBar.reducer";
import StockReducer from "./redux/reducers/stock.reducer";

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth", "stock"], // which reducer want to store
};

const Reducer = combineReducers({
  auth: AuthReducer,
  ui: ChangeState,
  stock: StockReducer,
});
const pReducer = persistReducer(persistConfig, Reducer);
const store = createStore(pReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

axios.defaults.baseURL = ENV.BASE_URL;
axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = store.getState()?.auth?.token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { persistor, store };
