import {
  GET_AIRLINES,
  GET_AIRPORTS,
  GET_AIR_SEARCH_RESPONSE,
  GET_SEARCH_QUERY,
} from "../actions/types";

const initialState = {
  airSearchResponse: [],
  searchData: {},
  airLinesList: [],
  airPortsList: [],
};

export default function (state = initialState, action) {
  
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

    case GET_AIRPORTS:
      return {
        ...state,
        airPortsList: action.payload,
      };

    default:
      return state;
  }
}
