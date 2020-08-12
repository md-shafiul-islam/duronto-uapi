import { GET_AIR_SEARCH_RESPONSE } from "../actions/types";

const initialState = {
  airSearchResponse: [],
  searchData: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_AIR_SEARCH_RESPONSE:
      return {
        ...state,
        airSearchResponse: action.payload,
      };

    default:
      return state;
  }
}
