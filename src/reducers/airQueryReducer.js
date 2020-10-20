import { GET_SEARCH_QUERY } from "../actions/types";

const initialState = {
  searchQuery: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
}
