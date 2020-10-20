import { combineReducers } from "redux";
import airQueryReducer from "./airQueryReducer";
import airSearchReducer from "./airSearchReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  airSearch: airSearchReducer,
  errors: errorReducer,
  searchQuery: airQueryReducer,
});
