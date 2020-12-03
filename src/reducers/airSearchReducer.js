import { GET_AIRLINES, GET_AIR_SEARCH_RESPONSE, GET_SEARCH_QUERY } from "../actions/types";

const initialState = {
  airSearchResponse: [],
  searchData: {},
  airLinesList:[],
};

export default function (state = initialState, action) {

  //console.log("action.payload, ", action.payload);
  switch (action.type) {
    case GET_AIR_SEARCH_RESPONSE:
      return {
        ...state,
        airSearchResponse: action.payload,
      };

    case GET_AIRLINES:
      return {
        ...state,
        airLinesList: action.payload,
      };

    default:
      return state;
  }
}
