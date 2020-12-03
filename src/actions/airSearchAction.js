import {
  GET_AIR_SEARCH_RESPONSE,
  GET_ERRORS,
  BASE_URL,
  REQUEST_HEADER,
  EXT_BASE_URL,
  GET_SEARCH_QUERY,
  GET_AIRLINES,
} from "./types";
import Axios from "axios";

export const getAirSearchRequest = (requestData) => async (dispatch) => {
  try {
    let url = `${EXT_BASE_URL}/api/catalogofferings`;

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
    console.log("Before Send request LOG: ");
    const { traveler, passDetails } = requestData;
    let pasengerList = [];

    if (traveler !== undefined) {
      if (traveler.ADT !== undefined) {
        if (traveler.ADT.value > 0) {
          pasengerList.push({ value: "ADT", number: traveler.ADT.value });
        }
      }

      if (traveler.ADT !== undefined) {
        if (traveler.CNN.value > 0) {
          pasengerList.push({ value: "CHD", number: traveler.CNN.value });
        }
      }

      if (traveler.INF !== undefined) {
        if (traveler.ADT.value > 0) {
          pasengerList.push({ value: "INF", number: traveler.INF.value });
        }
      }
    }

    let stDate = null;
    let fromDate = "";
    let toDate = "";
    let item = null;

    if (passDetails != undefined) {
      item = passDetails[0];
      if (item !== undefined && item !== null) {
        stDate = getProperDate(item.depTime);
        fromDate = item.from !== undefined ? item.from.code : "";
        toDate = item.to !== undefined ? item.to.code : "";
      }
    }

    let query = {
      CatalogOfferingsRequestAir: {
        offersPerPage: 5,
        PassengerCriteria: pasengerList,
        SearchCriteriaFlight: [
          {
            "@type": "SearchCriteriaFlight",
            departureDate: stDate,
            From: {
              value: fromDate,
            },
            To: {
              value: toDate,
            },
          },
        ],

        SearchModifiersAir: {},
      },
    };
    console.log("One Way Try: ", query);
    let url = `${EXT_BASE_URL}/api/catalogofferings`;

    const res = await Axios.post(url, JSON.stringify(query, null, 2), {
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
    let url = `${EXT_BASE_URL}/api/airline`;

    
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

export const setSearchQuery = (data) => async (dispatch) => {
  dispatch({
    type: GET_SEARCH_QUERY,
    payload: data,
  });
};
