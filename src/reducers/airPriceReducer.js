import { GET_AIR_PRICE_RESPONSE } from "../actions/types";

const initialState = {
    airPriceDetails: {},
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_AIR_PRICE_RESPONSE:
        return {
          ...state,
          airPriceDetails: action.payload,
        };
  
      default:
        return state;
    }
  }