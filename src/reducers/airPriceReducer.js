import { GET_SELECTED_AIR_PRICE, GET_SELECTED_AIR_ROUND_TRIP_PRICE } from "../actions/types";

const initialState = {
    selectedAir: {},
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_SELECTED_AIR_PRICE:
        return {
          ...state,
          selectedAir: action.payload,
        };
      
        case GET_SELECTED_AIR_ROUND_TRIP_PRICE:
          return {
            ...state,
            selectedRoundTripAir: action.payload,
          };
  
      default:
        return state;
    }
  }