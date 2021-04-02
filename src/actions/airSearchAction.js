import {
  GET_AIR_SEARCH_RESPONSE,
  GET_ERRORS,
  BASE_URL,
  REQUEST_HEADER,
  EXT_BASE_URL,
  GET_SEARCH_QUERY,
  GET_AIRLINES,
  GET_AIRPORTS,
  GET_AIRPORTS_ARR,
} from "./types";
import Axios from "axios";

export const getAirSearchRequest = (requestData) => async (dispatch) => {
  try {
    let url = `${EXT_BASE_URL}/flights`;

    const res = await Axios.post(url, requestData, { headers: REQUEST_HEADER });

    dispatch({
      type: GET_AIR_SEARCH_RESPONSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res.data
            : "Error: Response  not Or Air not found  "
          : "Error: Network Connection  ",
    });
  }
};

export const getOneWayAirSearchRequest = (requestData) => async (dispatch) => {
  try {
    //http://localhost:8050/flights
    let url = `${EXT_BASE_URL}/flights`;

    const res = await Axios.post(url, JSON.stringify(requestData, null, 2), {
      headers: REQUEST_HEADER,
    });

    dispatch({
      type: GET_AIR_SEARCH_RESPONSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res.data
            : "Error: Response  not Or Air not found  "
          : "Error: Network Connection  ",
    });
  }
};

export const getSearchResult = (requestData) => async (dispatch) => {
  try {
    let url = `${EXT_BASE_URL}/api/catalogofferings`;

    const res = await Axios.post(url, JSON.stringify(requestData, null, 2), {
      headers: REQUEST_HEADER,
    });

    dispatch({
      type: GET_AIR_SEARCH_RESPONSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res.data
            : "Error: Response  not Or Air not found  "
          : "Error: Network Connection  ",
    });
  }
};

const getProperDate = (pValue) => {
  if (pValue !== undefined && pValue !== null) {
    let cDate = pValue;

    let mnt = cDate.getMonth();
    let mntString = "";

    if (mnt === undefined || mnt === "NaN" || mnt === "Na") {
      mntString = " ";
    } else {
      mnt = mnt + 1;

      mntString = mnt.toString();

      if (mntString.length < 2) {
        mntString = `0${mntString}`;
      }
    }

    console.log("Month IS: ", mntString);

    let strDate = `${cDate.getFullYear()}-${mntString}-${cDate.getDate()}`;

    if (strDate === undefined || strDate === "NaN" || strDate === "Na") {
      return "";
    } else {
      return strDate;
    }
  }
};

export const getAirLines = () => async (dispatch) => {
  try {
    let url = `${EXT_BASE_URL}/api/airline?type=1`;
  
    const res = await Axios.get(url, {headers:REQUEST_HEADER});
    
    dispatch({
      type: GET_AIRLINES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res.data
            : "Error: Response  not Or Air not found  "
          : "Error: Network Connection  ",
    });
  }
};

export const getAirports = ()=>async (dispatch)=>{
  try {
    let url = `${EXT_BASE_URL}/api/airport?type=1`;
    
    const res = await Axios.get(url, {headers:REQUEST_HEADER});
    
    dispatch({
      type: GET_AIRPORTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res.data
            : "Error: Response  not Or Air not found  "
          : "Error: Network Connection  ",
    });
  }
}

export const setSearchQuery = (data) => async (dispatch) => {
  dispatch({
    type: GET_SEARCH_QUERY,
    payload: data,
  });
};

export const airPortsArray = ()=>async (dispatch)=>{
  try {
    let url = `${EXT_BASE_URL}/api/airport?type=0`;
    
    const res = await Axios.get(url, {headers:REQUEST_HEADER});
    
    dispatch({
      type: GET_AIRPORTS_ARR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload:
        err !== undefined
          ? err.res !== undefined
            ? err.res.data
            : "Error: Response  not Or Air not found  "
          : "Error: Network Connection  ",
    });
  }
}
