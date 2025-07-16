import { legacy_createStore as createStore, combineReducers } from "redux";
import productReducer from "./Reducer";
import AuthReducer from "./AuthReducer";

const rootReducer = combineReducers({
  productReducer,
  AuthReducer
});

const store = createStore(rootReducer);

export default store;