import Axios from "axios";
import {  GET_SELECTED_AIR_PRICE } from "./types";

export const setPriceDetails = (data) => async (dispatch) => {
  dispatch({
    type: GET_SELECTED_AIR_PRICE,
    payload: data,
  });
};