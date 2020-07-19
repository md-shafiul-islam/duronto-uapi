import { GET_AIR_SEARCH_RESPONSE, GET_ERRORS, BASE_URL, REQUEST_HEADER, EXT_BASE_URL } from "./types"
import Axios from "axios";

export const getAirSearchRequest = (requestData) => async (dispatch) => {

    try {

        let url = `${EXT_BASE_URL}/catalogofferings`;

        const res = await Axios.post(url, requestData, { headers: REQUEST_HEADER });

        dispatch({

            type: GET_AIR_SEARCH_RESPONSE,
            payload: res.data,

        })

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