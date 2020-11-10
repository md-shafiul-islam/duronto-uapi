import Axios from "axios";
import { EXT_PRICE_URL, GET_AIR_PRICE_RESPONSE, GET_ERRORS, REQUEST_HEADER } from "./types";

export const getPriceRequest = (priceQuery)=>async(dispatch)=>{
    
    try {
        let url = `${EXT_PRICE_URL}/api/v_1_0/buildfromproducts`;
   
        const res = await Axios.post(url, priceQuery, { headers: REQUEST_HEADER });
    
        dispatch({
          type: GET_AIR_PRICE_RESPONSE,
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