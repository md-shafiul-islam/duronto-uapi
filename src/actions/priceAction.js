import Axios from "axios";
import {  GET_SELECTED_AIR_PRICE, GET_SELECTED_AIR_ROUND_TRIP_PRICE } from "./types";

export const setPriceDetails = (data) => async (dispatch) => {
  dispatch({
    type: GET_SELECTED_AIR_PRICE,
    payload: data,
  });
};


export const setPriceRoundTrip = (data) => async (dispatch) => {
  dispatch({
    type: GET_SELECTED_AIR_ROUND_TRIP_PRICE,
    payload: data,
  });
};