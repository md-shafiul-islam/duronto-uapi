export const GET_ERRORS = "GET_ERRORS";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRIY = "GET_COUNTRIY";
export const DELET_COUNTRIY = "DELET_COUNTRIY";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const GET_CATEGORY = "GET_CATEGORY";
export const DELET_CATEGORY = "DELET_CATEGORY";

export const REQUEST_HEADER = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
};

export const REQUEST_HEADER_GET = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Origin, Content-Type, Accept",
};

export const SET_CURRENT_USER = "SET_CURRENT_USER";

export const GET_ACCESSES = "GET_ACCESSES";
export const GET_ACCESS = "GET_ACCESS";

//Type for backlog Actions
export const GET_BACKLOG = "GET_BACKLOG";
export const SET_TOKEN = "SET_TOKEN";

console.log(process.env.REACT_APP_API_URL);

export const EXT_BASE_URL = `http://localhost:8050`; // `http://dto.durontotour.com`; //
export const BASE_URL = `${EXT_BASE_URL}/api`;

export const EXT_PRICE_URL = `http://localhost:8080`;

export const GET_PACK_CATEGORIES = "GET_PACK_CATEGORIES";
export const GET_PACK_CATEGORY = "GET_PACK_CATEGORY";
export const PACK_CAT_DELETE = "GET_PACK_DELETE";

export const GET_DESIGNATIONS = "GET_DESIGNATIONS";
export const GET_DESIGNATION = "GET_DESIGNATION";

export const GET_AIR_SEARCH_RESPONSE = "GET_AIR_SEARCH_RESPONSE";
export const GET_SEARCH_QUERY = "GET_SEARCH_QUERY";

export const GET_AIR_PRICE_RESPONSE = "GET_AIR_PRICE_RESPONSE";
export const GET_SELECTED_AIR_PRICE = "GET_SELECTED_AIR_PRICE";

export const GET_SELECTED_AIR_ROUND_TRIP_PRICE = "GET_SELECTED_AIR_ROUND_TRIP_PRICE";
export const GET_AIRLINES = "GET_AIRLINES";
export const GET_AIRPORTS = "GET_AIRPORTS";

export const GET_PASSENGER = [
  {key:"ADT", value:"Adult"},
  {key:"CHD", value:"Children"},
  {key:"INF", value:"Infant"},
  {key:"CNN", value:"Children"},
]
export const GET_DAYES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const GET_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
