import { helperIsEmpty } from "./helperAction";

class LocalDataStore {
  constructor() {
    this.localStore = window.localStorage;
    this.rndPriceFlights = {};
    this.preSetPriceOptions = {};
  }

  setPriceRoundTripFlights = (rndPriceFlights) => {
    if (!helperIsEmpty(rndPriceFlights)) {
      this.localStore.setItem(
        "rndPriceOptions",
        JSON.stringify(rndPriceFlights)
      );
    }
  };

  getPriceRoundTripFlights = () => {
    if (this.hasRndPriceOptions()) {
      return this.rndPriceFlights;
    }

    return null;
  };

  hasRndPriceOptions = () => {
    let rndPriceFlightsStr = this.localStore.getItem("rndPriceOptions");

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
}

export const localDataStore = new LocalDataStore();
