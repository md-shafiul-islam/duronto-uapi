import { GET_SELECTED_AIR_PRICE } from "../actions/types";

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
  
      default:
        return state;
    }
  }