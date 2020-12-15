import { GET_SELECTED_AIR_ROUND_TRIP_PRICE_DETAILS } from "../actions/types";

const initState = {
  rndDetailsPrice: new Map(),
};

const haveData = (data) => {
  if (data !== undefined) {
    if (data instanceof Map) {
      if (data.size > 0) {
        return true;
      }
    }
  }
  return true;
};

export default function (state = initState, action) {
  switch (action.type) {
    case GET_SELECTED_AIR_ROUND_TRIP_PRICE_DETAILS:
      return {
        ...state,
        rndDetailsPrice: haveData(action.payload) ? action.payload : new Map(),
      };

      break;

    default:
      return state;
      break;
  }
}
