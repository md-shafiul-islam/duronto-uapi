import { helperIsEmpty } from "./helperAction";

class LocalDataStore {
  constructor() {
    this.localStore = window.localStorage;
    this.rndPriceFlights = {};
    this.preSetPriceOptions = {};
    this.roundTripFareSummery = {};
    this.searchQuery = {};

  }

  setPriceRoundTripFlightsBook = (rndPriceFlights) => {
    if (!helperIsEmpty(rndPriceFlights)) {
      this.localStore.setItem(
        "rndBookPriceOptions",
        JSON.stringify(rndPriceFlights)
      );
    }
  };

  getPriceRoundTripFlightsBook = () => {
    if (this.hasRndPriceOptions()) {
      return this.rndPriceFlights;
    }

    return null;
  };

  hasRndPriceOptions = () => {
    let rndPriceFlightsStr = this.localStore.getItem("rndBookPriceOptions");

    if (rndPriceFlightsStr) {
      this.rndPriceFlights = JSON.parse(rndPriceFlightsStr);
      return true;
    }
    return false;
  };

  setPreSetRndPriceDetails = (preSetPriceOptions) => {
    if (!helperIsEmpty(preSetPriceOptions)) {
      this.localStore.setItem(
        "preSetRndPriceOptions",
        JSON.stringify(preSetPriceOptions)
      );
    }
  };

  getPreSetRndPriceDetails = () => {
    if (this.hasPreSetRndOptions()) {
      return this.preSetPriceOptions;
    }
    return null;
  };

  hasPreSetRndOptions = () => {
    let preSetOptionsStr = this.localStore.getItem("preSetRndPriceOptions");

    if (preSetOptionsStr) {
      this.preSetPriceOptions = JSON.parse(preSetOptionsStr);
      return true;
    }

    return false;
  };

  /* Flight Seach Result Start Round Trip*/
  setDeptartureFlight = (depFlights) => {
    if (depFlights) {
      this.departureFlights = depFlights;
      this.localStore.setItem("departureFlights", JSON.stringify(depFlights));
    }
  };

  setReturnFlight = (returnFlights) => {
    if (returnFlights) {
      this.returnFlights = returnFlights;
      this.localStore.setItem("returnFlights", JSON.stringify(returnFlights));
    }
  };

  getDepartureFlights = ()=>{
    if(this.hasDataInLocalStore("departureFlights")){
        return this.departureFlights;
    }
  }

  getReturnFlights = ()=>{
    if(this.hasDataInLocalStore("returnFlights")){
        return this.returnFlights;
    }
  }

  /**
   * 
   * @param {String} keyName 
   * @returns 
   */
  hasDataInLocalStore = (keyName) => {
    let dataStr = this.localStore.getItem(keyName);
    if (dataStr) {
      this[keyName] = JSON.parse(dataStr);
      return true;
    }

    return false;
  };

  /* Flight Seach Result Round Trip End*/

  /* Booking Page Repository Function Start */

  /**
   * 
   * @param {*} summery 
   */
  setRoundTripFarePriceSummery = (summery)=>{
    if(!helperIsEmpty(summery)){
      this.localStore.setItem("rndFareSummery", JSON.stringify(summery));
    }
  }

  hasRoundTripFareSummery = ()=>{
    let fareSummStr = this.localStore.getItem("rndFareSummery");
    if(fareSummStr){
      this.roundTripFareSummery = JSON.parse(fareSummStr);
      return true;
    }
    return false;
  }

  /**
   * 
   * @returns {*} roundTripFareSummery
   */
  getRoundTripFareSummery = ()=>{
    if(this.hasRoundTripFareSummery()){
      return this.roundTripFareSummery;
    }
  }

  /* Booking Page Repository Function Start */

  /** Search Query Start */
  setSearchQuery = (searchQry)=>{
    if(!helperIsEmpty(searchQry)){
      this.localStore.setItem("searchQuery", JSON.stringify(searchQry));
    }
  }

  getSearchQuery = ()=>{
    if(this.hasSearchQuery()){
      return this.searchQuery;
    }
  }

  hasSearchQuery = ()=>{

    let searchStr = this.localStore.getItem("searchQuery");

    if(searchStr){
      this.searchQuery = JSON.parse(searchStr);
      return true;
    }
    return false;
  }

  /** Search Query Start */

  /** Set Round Trip Tracid Start */

  setRountTripTraceId = (traceID)=>{
    if(traceID){
      this.localStore.setItem("rndTraceId", JSON.stringify(traceID));
    }
  }

  getroundTripTraceID = ()=>{
    let traceIdStr = this.localStore.getItem("rndTraceId");

    if(traceIdStr){
      return JSON.parse(traceIdStr);
    }
    return null;
  }

  /** Set Round Trip Tracid End */


}

export const localDataStore = new LocalDataStore();
