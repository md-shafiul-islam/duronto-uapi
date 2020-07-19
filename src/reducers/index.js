import { combineReducers } from "redux";
import airSearchReducer from "./airSearchReducer";
import errorReducer from "./errorReducer";


export default combineReducers({
    airSearch: airSearchReducer,
    errors: errorReducer,

})